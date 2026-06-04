import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

function parseDescription(value: string) {
  const lines = value.split("\n").map((line) => line.trim()).filter(Boolean)
  const meta = new Map<string, string>()

  for (const line of lines.slice(1)) {
    const [key, ...rest] = line.split(":")
    if (key && rest.length) meta.set(key.toLowerCase(), rest.join(":").trim())
  }

  return {
    desc: lines[0] || value,
    time: meta.get("time") || "Flexible",
    duration: meta.get("duration") || "1 hr",
    cost: meta.get("cost") || "Varies",
    tag: meta.get("tag") || "Experience",
  }
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const trip = await prisma.trip.findFirst({
      where: {
        OR: [
          { id: id },
          { slug: id },
        ],
      },
      include: {
        days: {
          orderBy: { dayNumber: "asc" },
          include: {
            items: {
              orderBy: { createdAt: "asc" },
            },
          },
        },
      },
    })

    if (!trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 })
    }

    return NextResponse.json({
      request: {
        destination: trip.destination,
        duration: `${trip.duration} Days`,
        budget: trip.budget || undefined,
        style: trip.travelStyle || undefined,
      },
      trip: {
        id: trip.id,
        status: trip.status,
        title: trip.title,
        days: trip.days.map((day) => ({
          day: day.dayNumber,
          title: day.title,
          subtitle: "Curated places and experiences for the day",
          activities: day.items.map((item) => {
            const parsed = parseDescription(item.description)

            return {
              time: parsed.time,
              title: item.title,
              placeName: item.placeName,
              tag: parsed.tag,
              tagColor: "violet",
              desc: parsed.desc,
              duration: parsed.duration,
              cost: parsed.cost,
            }
          }),
        })),
        budget_breakdown: (trip.budgetBreakdown as any) || [],
        total_estimated_cost: trip.estimatedCost || "",
      },
    })
  } catch (error) {
    console.error("/api/trips/[id] error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    )
  }
}
