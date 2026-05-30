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

    const prompt = `Create a highly tailored travel itinerary for ${parsedInput.destination}.
    - Duration: ${parsedInput.duration} Days
    - Budget Class: ${parsedInput.budget}
    - Traveler Interests: ${parsedInput.interests.join(", ") || "General Sightseeing"}
    - Travel Style: ${parsedInput.style}
    - Special Notes or Requests: ${parsedInput.notes || "None"}`

    const responseStream = await ai.models.generateContentStream({
      model: MODEL,
      contents: prompt,
      config: {
        systemInstruction: `You are an elite travel planner. Return valid JSON only.
Build rich, realistic itineraries with concise day titles, useful pacing, and practical budgets.
For the "img" field, you MUST use the Unsplash Source API with 2-3 relevant keywords describing the activity.
Format it STRICTLY as: https://source.unsplash.com/600x400/?keyword1,keyword2
Examples:
  - Beach activity   → https://source.unsplash.com/600x400/?beach,ocean,tropical
  - Museum/culture   → https://source.unsplash.com/600x400/?museum,art,gallery
  - Food/restaurant  → https://source.unsplash.com/600x400/?food,restaurant,dining
  - Nightlife/club   → https://source.unsplash.com/600x400/?nightclub,nightlife,city
  - Hiking/nature    → https://source.unsplash.com/600x400/?hiking,mountain,nature
  - Market/shopping  → https://source.unsplash.com/600x400/?market,shopping,bazaar
  - Hotel/check-in   → https://source.unsplash.com/600x400/?hotel,lobby,travel
  - Airport/travel   → https://source.unsplash.com/600x400/?airport,travel,departure
NEVER use https://images.unsplash.com/photo-[id] format — those URLs break with 404 errors.`,
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
                        time: { type: Type.STRING },
                        title: { type: Type.STRING },
                        tag: { type: Type.STRING },
                        tagColor: {
                          type: Type.STRING,
                          description: "MUST be exactly one of these strings: 'violet', 'teal', 'green', or 'amber'"
                        },
                        desc: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        cost: { type: Type.STRING },
                        img: {
                          type: Type.STRING,
                          description: "MUST use format: https://source.unsplash.com/600x400/?keyword1,keyword2"
                        }
                      },
                      required: ["time", "title", "tag", "tagColor", "desc", "duration", "cost", "img"]
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
                  label: { type: Type.STRING },
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