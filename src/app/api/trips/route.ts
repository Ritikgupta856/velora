import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")

  return slug || "trip"
}

async function createUniqueSlug(title: string, destination: string) {
  const base = slugify(`${title}-${destination}`)

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const suffix = attempt === 0 ? "" : `-${attempt + 1}`
    const slug = `${base}${suffix}`
    const existing = await prisma.trip.findUnique({ where: { slug }, select: { id: true } })
    if (!existing) return slug
  }

  return `${base}-${Date.now().toString(36)}`
}

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

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { destination, duration, budget, style, interests, notes } = body

    const session = await auth.api.getSession({
      headers: await headers(),
    })

    const match = String(duration).match(/\d+/)
    const durationDays = match ? Number(match[0]) : 1

    const slug = await createUniqueSlug(`trip-to-${destination}`, destination)

    const trip = await prisma.trip.create({
      data: {
        title: `Trip to ${destination}`,
        slug,
        destination,
        duration: durationDays,
        budget: budget || null,
        travelStyle: style || null,
        interests: interests || [],
        notes: notes || null,
        status: "DRAFT",
        userId: session?.user?.id || null,
      },
    })

    return NextResponse.json({ id: trip.id, slug: trip.slug })
  } catch (error) {
    console.error("Error creating draft trip:", error)
    return NextResponse.json(
      { error: "Failed to create trip" },
      { status: 500 }
    )
  }
}
