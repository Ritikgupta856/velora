"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "@/components/landing/navbar"
import {
  MapPin, Calendar, Wallet, Clock, Star, Navigation,
  Utensils, Camera, Moon, Sunrise, Map, Share2, Bookmark,
  ChevronLeft, Sparkles, Edit, RefreshCw, Lock, ZoomIn, ZoomOut,
  Crosshair, Coffee, Waves, Hotel, ShoppingBag, Music, Sun,
} from "lucide-react"

const DAYS = [
  {
    day: 1, title: "North Goa Vibes", subtitle: "Beaches, nightlife and iconic spots", icon: Sun,
    activities: [
      { time: "09:00 AM", title: "Baga Beach", tag: "Beach", tagColor: "violet", desc: "Kick off your trip with fun at Baga Beach. Sun, sea and water sports await!", duration: "1.5 hrs", cost: "₹0", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&fit=crop" },
      { time: "12:00 PM", title: "Lunch at Britto's", tag: "Café", tagColor: "teal", desc: "A famous Goan café with amazing food and cozy vibes.", duration: "1 hr", cost: "₹800 for two", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=80&fit=crop" },
      { time: "04:00 PM", title: "Fontainhas Walk", tag: "Sightseeing", tagColor: "violet", desc: "Explore the charming Latin Quarter with colorful streets and art.", duration: "1.5 hrs", cost: "₹0", img: "https://images.unsplash.com/photo-1614082242765-7c98cbc067db?w=120&h=80&fit=crop" },
      { time: "08:00 PM", title: "Anjuna Beach & Night Market", tag: "Nightlife", tagColor: "violet", desc: "Enjoy sunset at Anjuna Beach and explore the vibrant night market.", duration: "3 hrs", cost: "₹1,500 for two", img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=80&fit=crop" },
      { time: "10:30 PM", title: "Club Night – Tito's Lane", tag: "Nightlife", tagColor: "violet", desc: "Experience Goa's legendary nightlife with music, drinks and dancing!", duration: "3 hrs", cost: "₹2,500 for two", img: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=120&h=80&fit=crop" },
    ],
  },
  {
    day: 2, title: "South Goa Serenity", subtitle: "Peaceful beaches and hidden gems", icon: Waves,
    activities: [
      { time: "08:00 AM", title: "Palolem Beach Morning", tag: "Beach", tagColor: "teal", desc: "South Goa's most serene beach — crystal water, kayaks.", duration: "2 hrs", cost: "₹400", img: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=120&h=80&fit=crop" },
      { time: "01:00 PM", title: "Seafood Lunch", tag: "Food", tagColor: "teal", desc: "Grilled kingfish, tiger prawns, and coconut rice at a shack.", duration: "1 hr", cost: "₹700", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=120&h=80&fit=crop" },
      { time: "04:00 PM", title: "Butterfly Beach Hike", tag: "Nature", tagColor: "green", desc: "Hidden cove accessible only by boat or jungle trail.", duration: "2 hrs", cost: "₹300", img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=120&h=80&fit=crop" },
    ],
  },
  {
    day: 3, title: "Culture & Heritage", subtitle: "Markets, forts, and Portuguese history", icon: Camera,
    activities: [
      { time: "09:00 AM", title: "Breakfast at German Bakery", tag: "Food", tagColor: "teal", desc: "Legendary breakfast spot with a hippie vibe.", duration: "1 hr", cost: "₹350", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=80&fit=crop" },
      { time: "11:00 AM", title: "Anjuna Flea Market", tag: "Shopping", tagColor: "amber", desc: "Shop for silver jewelry, boho clothes, and local handicrafts.", duration: "2 hrs", cost: "₹600", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=80&fit=crop" },
      { time: "05:30 PM", title: "Chapora Fort Sunset", tag: "Sightseeing", tagColor: "violet", desc: "Iconic hilltop fort with sweeping sunset panoramas.", duration: "1.5 hrs", cost: "Free", img: "https://images.unsplash.com/photo-1549180030-48bf079fb38a?w=120&h=80&fit=crop" },
    ],
  },
  {
    day: 4, title: "Beach Day & Goodbyes", subtitle: "Spice farm tour and departure", icon: Sunrise,
    activities: [
      { time: "09:00 AM", title: "Sahakari Spice Farm Tour", tag: "Culture", tagColor: "amber", desc: "Guided tour of a working spice plantation with elephant ride.", duration: "2 hrs", cost: "₹800", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=120&h=80&fit=crop" },
      { time: "12:00 PM", title: "Check-out & Departure", tag: "Travel", tagColor: "violet", desc: "Head to Goa airport / railway station with wonderful memories.", duration: "—", cost: "—", img: null },
    ],
  },
]

const BUDGET = [
  { label: "Stay (3 Nights)", amount: "₹9,000", icon: Hotel },
  { label: "Food", amount: "₹6,000", icon: Utensils },
  { label: "Transport", amount: "₹4,000", icon: Navigation },
  { label: "Activities", amount: "₹3,000", icon: Camera },
  { label: "Miscellaneous", amount: "₹2,800", icon: ShoppingBag },
]

const HIGHLIGHTS = [
  { label: "Beaches", icon: Waves },
  { label: "Nightlife", icon: Music },
  { label: "Cafes", icon: Coffee },
  { label: "Heritage", icon: Camera },
  { label: "Sunsets", icon: Sun },
]

const MAP_PINS = [
  { label: "Baga Beach", top: "18%", left: "26%" },
  { label: "Anjuna Beach", top: "36%", left: "50%" },
  { label: "Fontainhas", top: "55%", left: "42%" },
  { label: "Tito's Lane", top: "72%", left: "58%" },
]

const TAG_STYLES = {
  violet: "bg-violet-100 text-violet-700 border border-violet-200",
  teal: "bg-teal-100 text-teal-700 border border-teal-200",
  green: "bg-green-100 text-green-700 border border-green-200",
  amber: "bg-amber-100 text-amber-700 border border-amber-200",
}

type TagColor = keyof typeof TAG_STYLES

type Activity = {
  time: string
  title: string
  tag: string
  tagColor: TagColor
  desc: string
  duration: string
  cost: string
  img?: string | null
}

type Day = {
  day: number
  title: string
  subtitle: string
  icon?: React.ElementType
  activities: Activity[]
}

type BudgetItem = {
  label: string
  amount: string
  icon?: React.ElementType
}

type TripResponse = {
  title?: string
  days?: Array<{
    day: number
    title: string
    subtitle: string
    activities: Array<Partial<Activity> & { description?: string }>
  }>
  budget_breakdown?: BudgetItem[]
  total_estimated_cost?: string
}

type StoredTrip = {
  request?: {
    destination?: string
    duration?: string
    budget?: string
    style?: string
  }
  trip?: TripResponse
  result?: TripResponse
  raw?: TripResponse
}

type StreamStatus = {
  progress?: number
  title?: string
  message?: string
}

function getTagColor(tag = ""): TagColor {
  const value = tag.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner|market|shopping/.test(value)) return "amber"
  if (/beach|water|sea|island/.test(value)) return "teal"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(value)) return "green"
  return "violet"
}

function getImageForActivity(activity: Partial<Activity>) {
  if (activity.img) return activity.img
  const value = `${activity.tag || ""} ${activity.title || ""}`.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner/.test(value)) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=80&fit=crop"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(value)) return "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=120&h=80&fit=crop"
  if (/night|music|club|party/.test(value)) return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=80&fit=crop"
  if (/shopping|market/.test(value)) return "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=80&fit=crop"
  return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&fit=crop"
}

function getBudgetIcon(label = "") {
  const value = label.toLowerCase()
  if (/stay|hotel|room|accommodation/.test(value)) return Hotel
  if (/food|meal|restaurant/.test(value)) return Utensils
  if (/transport|route|taxi|cab|flight/.test(value)) return Navigation
  if (/activity|ticket|tour/.test(value)) return Camera
  return ShoppingBag
}

function highlightIcon(label = "") {
  const value = label.toLowerCase()
  if (/beach|water|sea|island/.test(value)) return Waves
  if (/night|music|club|party/.test(value)) return Music
  if (/food|cafe|coffee/.test(value)) return Coffee
  if (/culture|heritage|museum|fort|photo/.test(value)) return Camera
  return Sun
}

function normalizeTripResponse(payload?: TripResponse | null) {
  if (!payload?.days?.length) return null

  return {
    title: payload.title || "Your AI Trip",
    days: payload.days.map((day, index): Day => ({
      day: day.day || index + 1,
      title: day.title || `Day ${index + 1}`,
      subtitle: day.subtitle || "Curated places and experiences for the day",
      icon: [Sun, Waves, Camera, Sunrise][index % 4],
      activities: (day.activities || []).map((activity): Activity => {
        const tag = activity.tag || "Experience"
        return {
          time: activity.time || "Flexible",
          title: activity.title || "Recommended stop",
          tag,
          tagColor: activity.tagColor || getTagColor(tag),
          desc: activity.desc || activity.description || "A personalized recommendation for your trip.",
          duration: activity.duration || "1 hr",
          cost: activity.cost || "Varies",
          img: getImageForActivity(activity),
        }
      }),
    })),
    budget: (payload.budget_breakdown || []).map((item) => ({
      label: item.label,
      amount: item.amount,
      icon: getBudgetIcon(item.label),
    })),
    totalCost: payload.total_estimated_cost || "",
  }
}

function parseSafeJson<T>(value: string | null): T | null {
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return null
  }
}

function readStoredTrip(tripId: string) {
  const stored = parseSafeJson<StoredTrip>(window.sessionStorage.getItem(`velora-trip:${tripId}`))
  if (!stored) return null
  return {
    request: stored.request,
    trip: stored.trip || stored.result || stored.raw || null,
  }
}

function createSSEReader(onEvent: (event: string, data: string) => void) {
  let buffer = ""
  const decoder = new TextDecoder()

  const parseBlock = (block: string) => {
    if (!block.trim()) return
    const lines = block.split(/\r?\n/)
    let event = "message"
    const dataParts: string[] = []

    for (const line of lines) {
      if (line.startsWith("event:")) event = line.slice(6).trim()
      if (line.startsWith("data:")) dataParts.push(line.slice(5).trimStart())
    }

    onEvent(event, dataParts.join("\n"))
  }

  return {
    append(chunk: Uint8Array) {
      buffer += decoder.decode(chunk, { stream: true })
      let boundary = buffer.indexOf("\n\n")
      while (boundary !== -1) {
        parseBlock(buffer.slice(0, boundary))
        buffer = buffer.slice(boundary + 2)
        boundary = buffer.indexOf("\n\n")
      }
    },
    flush() {
      buffer += decoder.decode()
      parseBlock(buffer)
      buffer = ""
    },
  }
}

function Tag({ label, color }: { label: string; color: TagColor }) {
  return (
    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap ${TAG_STYLES[color] || TAG_STYLES.violet}`}>
      {label}
    </span>
  )
}

function ActivityRow({ act, isLast }: { act: Activity; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_0_3px_rgba(124,58,237,0.15)] mt-1 shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1.5 min-h-[20px]" />}
      </div>
      <div className={`flex-1 min-w-0 ${isLast ? "pb-0" : "pb-6"}`}>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <p className="text-[11px] text-violet-500 mb-0.5">{act.time}</p>
            <h4 className="text-[15px] font-bold text-gray-900 leading-snug">{act.title}</h4>
          </div>
          <Tag label={act.tag} color={act.tagColor} />
        </div>
        <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">{act.desc}</p>
        <div className="flex items-center gap-4">
          {act.img && (
            <img src={act.img} alt={act.title} className="w-28 h-16 object-cover rounded-lg border border-gray-200 shrink-0" />
          )}
          <div className="flex gap-4">
            {act.duration !== "—" && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={11} /> {act.duration}
              </div>
            )}
            {act.cost !== "—" && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Wallet size={11} /> {act.cost}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function StreamingScreen({ status }: { status: StreamStatus }) {
  const progress = Math.min(Math.round(status.progress || 0), 100)
  const steps = [
    "Understanding destination",
    "Balancing route and budget",
    "Writing day-by-day plan",
    "Preparing itinerary view",
  ]
  const activeStep = Math.min(Math.floor(progress / 25), steps.length - 1)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 pt-24">
        <div className="w-full rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-600">Generating itinerary</p>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-900">{status.title || "Building your trip"}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">{status.message || "Streaming Gemini response into a structured itinerary."}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-right">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Progress</p>
              <p className="mt-1 text-2xl font-black text-gray-900">{progress}%</p>
            </div>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>

          <div className="mt-6 space-y-3">
            {steps.map((step, index) => {
              const done = index < activeStep
              const active = index === activeStep
              return (
                <div key={step} className="flex items-center gap-3">
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black ${done ? "border-teal-200 bg-teal-50 text-teal-700" : active ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 bg-white text-gray-400"}`}>
                    {done ? "✓" : index + 1}
                  </div>
                  <span className={`text-sm font-semibold ${active ? "text-gray-900" : done ? "text-teal-700" : "text-gray-400"}`}>{step}</span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function VeloraTripPage({ tripId }: { tripId?: string }) {
  const [activeDay, setActiveDay] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [daysState, setDaysState] = useState<Day[]>(DAYS as Day[])
  const [budgetState, setBudgetState] = useState<BudgetItem[]>(BUDGET)
  const [highlightsState, setHighlightsState] = useState(HIGHLIGHTS)
  const [mapPinsState, setMapPinsState] = useState(MAP_PINS)
  const [titleState, setTitleState] = useState("Goa Escape")
  const [metaState, setMetaState] = useState({ duration: "4 Days / 3 Nights", destination: "Goa, India", travelers: "2 Travelers", budgetLabel: "Budget Trip" })
  const [totalCostState, setTotalCostState] = useState("₹24,800")
  const [isGenerating, setIsGenerating] = useState(false)
  const [statusState, setStatusState] = useState<StreamStatus>({ progress: 0, title: "Preparing itinerary", message: "Starting AI planner" })
  const [hasGeneratedTrip, setHasGeneratedTrip] = useState(false)

  const day = daysState[activeDay]

  const applyTrip = (payload: TripResponse, request?: StoredTrip["request"]) => {
    const normalized = normalizeTripResponse(payload)
    if (!normalized) return

    setTitleState(normalized.title)
    setDaysState(normalized.days)
    setBudgetState(normalized.budget.length ? normalized.budget : BUDGET)
    setTotalCostState(normalized.totalCost || totalCostState)
    setMetaState({
      duration: request?.duration || `${normalized.days.length} Days`,
      destination: request?.destination || metaState.destination,
      travelers: "2 Travelers",
      budgetLabel: request?.budget || normalized.totalCost || metaState.budgetLabel,
    })
    setHighlightsState(
      [...new Set(normalized.days.flatMap((d) => d.activities.map((activity) => activity.tag)).filter(Boolean))]
        .slice(0, 5)
        .map((label) => ({ label, icon: highlightIcon(label) }))
    )
    setMapPinsState(
      normalized.days[0]?.activities?.slice(0, 4).map((activity, index) => ({
        label: activity.title,
        top: `${18 + index * 18}%`,
        left: `${26 + (index % 2) * 24}%`,
      })) || MAP_PINS
    )
    setActiveDay(0)
    setHasGeneratedTrip(true)
  }

  useEffect(() => {
    if (!tripId) return
    let mounted = true

    const stored = readStoredTrip(tripId)
    if (stored?.trip) {
      applyTrip(stored.trip, stored.request)
      return
    }

    if (!stored?.request) return

    const generate = async () => {
      try {
        setIsGenerating(true)
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(stored.request),
        })

        if (!res.ok || !res.body) throw new Error("Could not start itinerary generation")

        const reader = res.body.getReader()
        const sse = createSSEReader((event, data) => {
          if (!mounted || !data) return

          if (event === "status") {
            const payload = parseSafeJson<StreamStatus>(data)
            if (payload) setStatusState(payload)
            return
          }

          if (event === "delta") {
            setStatusState((prev) => ({ ...prev, progress: Math.min((prev.progress || 20) + 2, 88) }))
            return
          }

          if (event === "done") {
            const payload = parseSafeJson<TripResponse>(data)
            if (!payload) return
            setStatusState({ progress: 100, title: "Itinerary ready", message: "Opening your trip." })
            applyTrip(payload, stored.request)
            window.sessionStorage.setItem(
              `velora-trip:${tripId}`,
              JSON.stringify({ ...stored, trip: payload, finishedAt: Date.now() })
            )
            setIsGenerating(false)
          }
        })

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (value) sse.append(value)
        }
        sse.flush()
      } catch (error) {
        console.error("generate itinerary error", error)
        setIsGenerating(false)
      }
    }

    void generate()
    return () => { mounted = false }
  }, [tripId])

  if (isGenerating && !hasGeneratedTrip) {
    return <StreamingScreen status={statusState} />
  }

  return (
    <div className="h-screen bg-white text-gray-900 font-sans flex flex-col overflow-hidden pt-[72px]">
      <Navbar />

      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-24 left-1/4 w-[600px] h-[500px] rounded-full bg-violet-200/40 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-violet-100/40 blur-[100px]" />
      </div>

      {/* ── Navbar ── */}
      {/* ── 3-col body — fills remaining height, no overflow ── */}
      <div className="flex flex-1 min-h-0 relative z-10">

        {/* ── LEFT SIDEBAR — scrolls independently ── */}
        <aside className="w-[220px] shrink-0 border-r border-gray-100 bg-gray-50 flex flex-col h-full overflow-hidden">
          {/* Fixed top: back button */}
          <div className="shrink-0 px-3 pt-3 pb-1">
            <button className="flex items-center gap-1.5 text-gray-400 text-[13px] font-medium px-2 py-1.5 rounded-lg hover:text-gray-900 hover:bg-gray-100 transition-all w-full">
              <ChevronLeft size={14} /> Back
            </button>
          </div>

          {/* Scrollable day list */}
          <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1.5 scrollbar-hide">
            {daysState.map((d, i) => {
              const Icon = d.icon || [Sun, Waves, Camera, Sunrise][i % 4]
              const active = i === activeDay
              return (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex items-center gap-2.5 w-full p-2.5 rounded-xl text-left transition-all duration-200 ${active
                    ? "bg-violet-50 border border-violet-200 text-gray-900"
                    : "border border-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                >
                  <div className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-all ${active ? "bg-gradient-to-br from-violet-600 to-purple-500" : "bg-gray-100"
                    }`}>
                    <Icon size={15} className={active ? "text-white" : "text-violet-500"} />
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-wide mb-0.5 ${active ? "text-violet-600" : "text-gray-400"}`}>Day {d.day}</p>
                    <p className="text-[13px] font-bold leading-tight">{d.title}</p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Fixed bottom: customize card */}
          <div className="shrink-0 p-3 border-t border-gray-100">
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-3.5">
              <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-violet-500" />
                <span className="text-[11px] font-bold text-violet-700">Want to customize this itinerary?</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
                You can edit days, swap activities and regenerate any day.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="w-full py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-500 text-[12px] font-bold text-white flex items-center justify-center gap-1.5 hover:opacity-90 transition-all"
              >
                <Sparkles size={11} /> Customize Trip ✦
              </button>
            </div>
          </div>
        </aside>

        {/* ── CENTER — scrolls independently ── */}
        <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden">
          {/* Fixed: trip header + tabs */}
          <div className="shrink-0 px-7 pt-5 pb-0 border-b border-gray-100 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-[26px] font-black tracking-tight mb-2 text-gray-900">{titleState}</h1>
                <div className="flex items-center gap-5 flex-wrap">
                  {[
                    { Icon: Calendar, text: metaState.duration },
                    { Icon: MapPin, text: metaState.destination },
                    { Icon: Star, text: metaState.travelers },
                    { Icon: Wallet, text: metaState.budgetLabel },
                  ].map(({ Icon, text }) => (
                    <div key={text} className="flex items-center gap-1.5 text-[13px] text-gray-500">
                      <Icon size={12} className="text-violet-500" /> {text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2.5 shrink-0">
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-white text-[13px] font-semibold text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all">
                  <Share2 size={13} /> Share
                </button>
                <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-[13px] font-bold text-white hover:opacity-90 transition-all">
                  <Bookmark size={13} /> Save Trip
                </button>
              </div>
            </div>

          </div>

          {/* Scrollable activity area */}
          <div className="flex-1 overflow-y-auto px-7 py-5 scrollbar-hide">
            {/* Day header card */}
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                    <Sun size={17} className="text-violet-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-violet-500 mb-0.5">Day {day.day}</p>
                    <h3 className="text-[17px] font-black text-gray-900">Day {day.day} – {day.title}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-200 bg-white text-[12px] font-semibold text-gray-500 hover:text-gray-900 transition-all">
                    <Edit size={11} /> Edit Day
                  </button>
                  <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-violet-200 bg-violet-50 text-[12px] font-semibold text-violet-600 hover:bg-violet-100 transition-all">
                    <RefreshCw size={11} /> Regenerate Day
                  </button>
                </div>
              </div>
              <p className="text-[13px] text-gray-400 mt-2 pl-[52px]">{day.subtitle}</p>
            </div>

            {/* Activities */}
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              {day.activities.map((act, i) => (
                <ActivityRow key={i} act={act} isLast={i === day.activities.length - 1} />
              ))}
            </div>
          </div>

          {/* Fixed bottom: login bar */}
          <div className="shrink-0 border-t border-gray-100 bg-white px-7 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Lock size={13} className="text-violet-500" />
              <span className="text-[13px] text-gray-500">
                <span className="text-violet-600 font-bold cursor-pointer hover:text-violet-700">Login / Sign up</span>
                {" "}to save this trip and access it anytime
              </span>
            </div>
            <button onClick={() => setShowModal(true)} className="px-5 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-[13px] font-bold text-white hover:opacity-90 transition-all">
              Login / Sign up
            </button>
          </div>
        </main>

        {/* ── RIGHT PANEL — scrolls independently ── */}
        <aside className="w-[360px] shrink-0 border-l border-gray-100 bg-gray-50 flex flex-col h-full overflow-hidden">
          {/* Fixed: map */}
          <div className="shrink-0 relative h-[240px] bg-gray-900 border-b border-gray-200 overflow-hidden">
            <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "radial-gradient(#1e1b3a 1px, transparent 1px)", backgroundSize: "18px 18px" }} />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#0d0a2a_0%,#060412_100%)]" />
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
              <path d="M 75 0 Q 115 55 105 115 T 125 195 T 105 260" fill="none" stroke="#1e1b4b" strokeWidth="26" opacity="0.5" />
              <path d="M 75 0 Q 115 55 105 115 T 125 195 T 105 260" fill="none" stroke="#16123a" strokeWidth="13" opacity="0.8" />
              <path d="M 58 48 Q 106 88 150 126 T 205 188 T 232 232" fill="none" stroke="url(#rg)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="8 4" opacity="0.9" />
            </svg>
            {mapPinsState.map((pin, i) => (
              <div key={i} className="absolute flex items-center gap-1.5" style={{ top: pin.top, left: pin.left }}>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-40" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
                </span>
                <span className="text-[10px] font-bold text-white bg-black/80 border border-white/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                  {pin.label}
                </span>
              </div>
            ))}
            <div className="absolute top-3 right-3 bg-black/70 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-sm">
              <p className="text-[10px] text-purple-300/50 mb-1">Total Travel Time</p>
              <div className="flex items-center gap-1.5">
                <Navigation size={12} className="text-violet-400" />
                <span className="text-[15px] font-black text-white">2h 45m</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 flex flex-col gap-1">
              {[Crosshair, ZoomIn, ZoomOut].map((Icon, i) => (
                <button key={i} className="w-7 h-7 rounded-md border border-white/10 bg-black/60 text-purple-300/50 flex items-center justify-center hover:text-white transition-all">
                  <Icon size={12} />
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable: budget + highlights */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            {/* Budget */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[15px] font-black text-gray-900">Budget Breakdown</h3>
                <span className="text-[19px] font-black text-violet-600">{totalCostState}</span>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">Total Estimated Cost</p>
              {budgetState.map(({ label, amount, icon: Icon = ShoppingBag }, i) => (
                <div key={i} className={`flex items-center justify-between py-3 ${i < budgetState.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                      <Icon size={13} className="text-violet-500" />
                    </div>
                    <span className="text-[13px] text-gray-500 font-medium">{label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">{amount}</span>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className="p-5">
              <h3 className="text-[15px] font-black text-gray-900 mb-4">Trip Highlights</h3>
              <div className="grid grid-cols-5 gap-2">
                {highlightsState.map(({ label, icon: Icon }) => (
                  <div key={label} className="flex flex-col items-center gap-2 bg-white border border-gray-100 rounded-xl p-2.5 shadow-sm">
                    <div className="w-9 h-9 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                      <Icon size={16} className="text-violet-500" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 text-center leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-5"
            >
              <div className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl p-9 text-center shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
                <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 text-gray-400 hover:text-gray-900 flex items-center justify-center transition-all text-base cursor-pointer">×</button>
                <div className="w-14 h-14 rounded-2xl mx-auto mb-5 bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.3)]">
                  <Bookmark size={24} className="text-white" />
                </div>
                <h2 className="text-xl font-black mb-2 text-gray-900">Save your trip</h2>
                <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">Sign up free to save this itinerary, access it anywhere, and share it with travel buddies.</p>
                <div className="flex flex-col gap-2.5">
                  <button className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-500 text-[14px] font-bold text-white flex items-center justify-center gap-2 hover:opacity-90 transition-all">
                    <Sparkles size={14} /> Sign up — it's free
                  </button>
                  <button className="w-full py-3 rounded-xl border border-gray-200 bg-gray-50 text-[14px] font-semibold text-gray-600 hover:text-gray-900 hover:border-gray-300 transition-all">
                    Already have an account? Log in
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-5">No credit card · Cancel anytime · Free forever</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
