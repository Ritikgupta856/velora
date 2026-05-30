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
        systemInstruction:
          "You are an elite travel planner. Return valid JSON only. Build rich, realistic itineraries with concise day titles, useful pacing, and practical budgets. Never wrap the response in markdown.",
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
                        desc: { type: Type.STRING },
                        duration: { type: Type.STRING },
                        cost: { type: Type.STRING },
                      },
                      required: ["time", "title", "tag", "desc", "duration", "cost"]
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

          push(controller, "status", {
            phase: "analyzing",
            progress: 14,
            title: "Reading your brief",
            message: `Locking onto ${parsedInput.destination} and the preferences you shared.`,
          })

          for await (const chunk of responseStream) {
            const text = chunk.text
            if (text) {
              fullText += text
              chunkCount += 1

              if (chunkCount === 1) {
                push(controller, "status", {
                  phase: "routing",
                  progress: 34,
                  title: "Building the route",
                  message: "Sequencing days, anchors, and pacing.",
                })
              } else if (chunkCount === 4) {
                push(controller, "status", {
                  phase: "balancing",
                  progress: 62,
                  title: "Balancing the budget",
                  message: "Fine-tuning cost and activity flow.",
                })
              }

              push(controller, "delta", {
                text,
              })
            }
          }

          push(controller, "status", {
            phase: "finalizing",
            progress: 90,
            title: "Polishing itinerary",
            message: "Checking structure, costs, and day-by-day flow.",
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
        "X-Accel-Buffering": "no",
      },
    })

  } catch (err: any) {
    console.error("/api/generate error:", err)
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
