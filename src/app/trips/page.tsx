"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Calendar, Wallet, ChevronRight, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

type Trip = {
  id: string
  title: string
  slug: string
  destination: string
  country?: string
  duration: number
  budget?: string
  travelStyle?: string
  interests?: string[]
  estimatedCost?: string
  status: string
  createdAt: string
  days: Array<{
    items: Array<{
      imageUrl?: string
    }>
  }>
}

export default function TripsPage() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await fetch("/api/trips")
        if (res.ok) {
          const data = await res.json()
          setTrips(data)
        }
      } catch (error) {
        console.error("Failed to fetch trips:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTrips()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-black text-gray-900">Your Trips</h1>
            <p className="mt-2 text-gray-600">
              {trips.length === 0
                ? "Start planning your next adventure"
                : `${trips.length} trip${trips.length !== 1 ? "s" : ""} saved`}
            </p>
          </div>
          <Link href="/generate">
            <Button className="bg-violet-600 hover:bg-violet-500 text-white gap-2">
              <Plus size={20} />
              New Trip
            </Button>
          </Link>
        </div>

        {/* Empty State */}
        {trips.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-violet-100 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-violet-600" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No trips yet
            </h3>
            <p className="text-gray-600 mb-6">
              Generate your first AI-powered itinerary and start exploring
            </p>
            <Link href="/generate">
              <Button className="bg-violet-600 hover:bg-violet-500 text-white">
                Generate Your First Trip
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip) => {
              const coverImage = trip.days[0]?.items[0]?.imageUrl
              const date = new Date(trip.createdAt)
              const formattedDate = date.toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })

              return (
                <Link key={trip.id} href={`/trips/${trip.slug}`}>
                  <div className="group h-full rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300 cursor-pointer">
                    {/* Image */}
                    <div className="relative h-40 bg-gradient-to-br from-violet-100 to-indigo-100 overflow-hidden">
                      {coverImage ? (
                        <img
                          src={coverImage}
                          alt={trip.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <MapPin className="w-12 h-12 text-violet-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-2">
                        {trip.title}
                      </h3>

                      {/* Destination */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin size={16} className="text-violet-600 flex-shrink-0" />
                        <span className="line-clamp-1">
                          {trip.destination}
                          {trip.country && `, ${trip.country}`}
                        </span>
                      </div>

                      {/* Meta */}
                      <div className="flex gap-3 text-xs text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          {trip.duration} days
                        </div>
                        {trip.estimatedCost && (
                          <div className="flex items-center gap-1">
                            <Wallet size={14} />
                            {trip.estimatedCost}
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {trip.interests && trip.interests.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {trip.interests.slice(0, 2).map((interest) => (
                            <span
                              key={interest}
                              className="inline-block px-2 py-1 bg-violet-50 text-violet-700 text-xs rounded-md font-medium"
                            >
                              {interest}
                            </span>
                          ))}
                          {trip.interests.length > 2 && (
                            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-medium">
                              +{trip.interests.length - 2}
                            </span>
                          )}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <span className="text-xs text-gray-400">{formattedDate}</span>
                        <ChevronRight
                          size={16}
                          className="text-gray-400 group-hover:text-violet-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
