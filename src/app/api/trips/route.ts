import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const trips = await prisma.trip.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        destination: true,
        country: true,
        duration: true,
        budget: true,
        travelStyle: true,
        interests: true,
        estimatedCost: true,
        status: true,
        createdAt: true,
        days: {
          select: {
            items: {
              take: 1,
              select: {
                imageUrl: true,
              },
            },
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(trips)
  } catch (error) {
    console.error("Error fetching trips:", error)
    return NextResponse.json(
      { error: "Failed to fetch trips" },
      { status: 500 }
    )
  }
}
