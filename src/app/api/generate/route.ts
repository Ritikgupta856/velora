import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI, Type } from "@google/genai"
import { z } from "zod"

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || "" })
const MODEL = "gemini-2.5-flash"

const InputSchema = z.object({
  destination: z.string().min(1),
  duration: z.string().min(1).default("3"),
  budget: z.string().optional().default("Comfort"),
  interests: z.array(z.string()).optional().default([]),
  style: z.string().optional().default("Balanced"),
  notes: z.string().optional().default(""),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsedInput = InputSchema.parse(body)

const prompt = `You are planning a trip for a real traveler, not a generic tourist.

TRIP BRIEF:
- Destination: ${parsedInput.destination}
- Duration: ${parsedInput.duration} days
- Budget Class: ${parsedInput.budget}
- Interests: ${parsedInput.interests.join(", ") || "General sightseeing"}
- Travel Style: ${parsedInput.style}
- Special Requests: ${parsedInput.notes || "None"}

ITINERARY RULES — follow all strictly:

1. DAY STRUCTURE
   - Each day must have 4–6 activities with realistic time gaps
   - Morning → Afternoon → Evening flow. Don't cluster everything in AM.
   - Day 1 always starts with check-in/arrival. Last day ends with departure or checkout.
   - Day titles must be evocative: "Temples, Spice & Sunset" not "Day 1: Sightseeing"

2. BUDGET ACCURACY
   - Use real local pricing for ${parsedInput.destination} in INR or local currency
   - Budget class "${parsedInput.budget}" means:
     * Budget → hostels, street food, public transport, free attractions
     * Comfort → 3-star hotels, sit-down restaurants, occasional taxis
     * Luxury → 4–5 star hotels, fine dining, private transfers, curated experiences
   - cost field: realistic range e.g. "₹400–600/person" — never "Varies"
   - budget_breakdown must add up close to total_estimated_cost

3. ACTIVITY QUALITY
   - Prioritize interests: ${parsedInput.interests.join(", ") || "balanced mix"}
   - Include at least one hidden gem or local tip per day
   - desc: 1–2 sentences of genuinely useful info (best time, what to order, insider tip)
   - duration: be specific — "1.5 hours" not "a few hours"
   - placeName: the exact real-world name of the place (e.g. "Amber Fort", "Café du Monde")
     This will be used to fetch real photos and map data — be precise and correct.

4. TAGS
   - tag: short action label — "Breakfast", "Cultural", "Scenic", "Adventure", "Nightlife", "Shopping", "Relaxation", "Transit"
   - tagColor must be exactly one of: "violet" (cultural/history), "teal" (nature/scenic), "green" (food/wellness), "amber" (shopping/nightlife)`

    const responseStream = await ai.models.generateContentStream({
      model: MODEL,
      contents: prompt,
      config: {
systemInstruction: `You are Velora, an elite AI travel planner trusted by seasoned travelers.
Your job is to generate highly personalized, realistic, and locally accurate travel itineraries.

PERSONA & TONE:
- You think like a well-traveled local guide, not a tourist brochure
- You know hidden gems, real pricing, and practical ground-level logistics
- You are concise, specific, and never vague

OUTPUT RULES — non-negotiable:
- Return valid JSON only. No markdown, no explanation, no preamble.
- Every field in the schema must be populated — no nulls, no empty strings
- costs must be realistic for the destination and budget class provided
- duration must be specific: "1.5 hours", "45 minutes" — never "a few hours" or "varies"
- desc must contain genuinely useful traveler info: what to order, best time to visit, what to avoid, insider tip — never generic filler like "a great place to visit"

PLACE NAMING (critical):
- placeName must be the exact, searchable real-world name of the location
- Include the city if needed for disambiguation: "Amber Fort, Jaipur" not just "Amber Fort"
- For food: use the restaurant/cafe name, not the cuisine type: "Laxmi Mishthan Bhandar, Jaipur" not "local sweet shop"
- For transit activities (check-in, departure): use the actual airport/station name: "Jaipur International Airport"
- Never invent place names — if unsure, use the most well-known real landmark nearby

DAY PLANNING RULES:
- Day 1 must begin with arrival or check-in as the first activity
- Last day must end with checkout or departure as the final activity
- Time gaps between activities must be realistic — account for travel, meals, and rest
- Never schedule two major attractions back to back with no buffer
- Each day needs a morning, afternoon, and evening segment
- At least one activity per day must be a hidden gem or off-the-beaten-path experience

BUDGET RULES:
- Budget → street food, hostels, public transport, free/low-cost attractions (under ₹3,000/day)
- Comfort → 3-star stays, casual restaurants, mix of transport (₹3,000–8,000/day)  
- Luxury → 4–5 star hotels, fine dining, private cabs, curated tours (₹8,000+/day)
- budget_breakdown categories: Accommodation, Food, Transport, Activities, Miscellaneous
- budget_breakdown amounts must sum approximately to total_estimated_cost

TAG RULES:
- tag must be one of: "Breakfast", "Lunch", "Dinner", "Cultural", "Scenic", "Adventure", "Nightlife", "Shopping", "Relaxation", "Transit", "Accommodation"
- tagColor must be exactly one of:
  * "violet" → Cultural, historical, spiritual
  * "teal"   → Nature, scenic, outdoor, adventure  
  * "green"  → Food, wellness, relaxation
  * "amber"  → Shopping, nightlife, transit, accommodation`,
        temperature: 0.3,
        responseMimeType: "application/json",
     responseSchema: {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    days: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER },
          title: { type: Type.STRING },
          subtitle: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time:      { type: Type.STRING },
                title:     { type: Type.STRING },
                placeName: { 
                  type: Type.STRING,
                  description: "Exact real-world place name for Google Places + Pexels lookup. E.g. 'Amber Fort Jaipur', 'Cafe Mondegar Mumbai'. Be specific."
                },
                tag:       { type: Type.STRING },
                tagColor:  { type: Type.STRING },
                desc:      { type: Type.STRING },
                duration:  { type: Type.STRING },
                cost:      { type: Type.STRING },
              },
              required: ["time", "title", "placeName", "tag", "tagColor", "desc", "duration", "cost"]
            }
          }
        },
        required: ["day", "title", "subtitle", "activities"]
      }
    },
    budget_breakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label:  { type: Type.STRING },
          amount: { type: Type.STRING }
        },
        required: ["label", "amount"]
      }
    },
    total_estimated_cost: { type: Type.STRING }
  },
  required: ["title", "days", "budget_breakdown", "total_estimated_cost"]
}
      }
    })

    const encoder = new TextEncoder()
    const push = (controller: ReadableStreamDefaultController<Uint8Array>, event: string, payload: unknown) => {
      controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(payload)}\n\n`))
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let fullText = ""
          let chunkCount = 0

          // Phase 1: Sent immediately when the stream initial connection opens
          push(controller, "status", {
            phase: "analyzing",
            progress: 15,
            title: "Reading your brief",
            message: `Locking onto ${parsedInput.destination} and processing preferences.`,
          })

          for await (const chunk of responseStream) {
            const text = chunk.text
            if (text) {
              fullText += text
              chunkCount += 1

              // Phase 2 & 3: Distributed naturally across string segment length thresholds
              if (chunkCount === 3) {
                push(controller, "status", {
                  phase: "routing",
                  progress: 45,
                  title: "Building the route",
                  message: "Sequencing location loops, anchors, and daily pacing.",
                })
              } else if (chunkCount === 12) {
                push(controller, "status", {
                  phase: "balancing",
                  progress: 75,
                  title: "Balancing the budget",
                  message: "Calculating localized pricing tiers and adjustments.",
                })
              }

              // Stream the real token chunk data characters immediately down the pipe
              push(controller, "delta", { text })
            }
          }

          // Phase 4: Final validation confirmation
          push(controller, "status", {
            phase: "finalizing",
            progress: 95,
            title: "Polishing itinerary",
            message: "Verifying formatting layouts, image queries, and costs.",
          })

          const parsed = JSON.parse(fullText.trim())
          push(controller, "done", parsed)
          controller.close()
        } catch (error) {
          push(controller, "error", {
            message: error instanceof Error ? error.message : String(error),
          })
          controller.error(error)
        }
      },
    })

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disables Vercel/Nginx route buffering proxies
      },
    })

  } catch (err: any) {
    console.error("/api/generate error:", err)
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}