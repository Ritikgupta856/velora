"use client"

import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  MapPin, Calendar, Wallet, Clock, Star, Navigation,
  Utensils, Camera, Moon, Sunrise, Map, Share2, Bookmark,
  ChevronLeft, Sparkles, Edit, RefreshCw, Lock, ZoomIn, ZoomOut,
  Crosshair, Coffee, Waves, Hotel, ShoppingBag, Music, Sun,
  Compass, List, Search, MessageSquare, User, Settings,
  Bell, Plus, Bot, ArrowRight, TrendingUp, DollarSign,
  Heart, Users, ChevronRight, BarChart3,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

type TagColor = "violet" | "teal" | "green" | "amber"

type Activity = {
  time: string
  title: string
  tag: string
  tagColor: TagColor
  desc: string
  duration: string
  cost: string
  img?: string | null
  fetched?: boolean
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

// ─── Static Fallback Data ─────────────────────────────────────────────────────

const DAYS_FALLBACK: Day[] = [
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

const BUDGET_FALLBACK: BudgetItem[] = [
  { label: "Stay (3 Nights)", amount: "₹9,000", icon: Hotel },
  { label: "Food", amount: "₹6,000", icon: Utensils },
  { label: "Transport", amount: "₹4,000", icon: Navigation },
  { label: "Activities", amount: "₹3,000", icon: Camera },
  { label: "Miscellaneous", amount: "₹2,800", icon: ShoppingBag },
]

const BUDGET_COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#a78bfa"]

const MAP_PINS_FALLBACK = [
  { label: "Baga Beach", top: "18%", left: "26%" },
  { label: "Anjuna Beach", top: "36%", left: "50%" },
  { label: "Fontainhas", top: "55%", left: "42%" },
  { label: "Tito's Lane", top: "72%", left: "58%" },
]


// ─── Tag Styles ───────────────────────────────────────────────────────────────

const TAG_STYLES: Record<TagColor, string> = {
  violet: "bg-violet-100 text-violet-700 border border-violet-200",
  teal:   "bg-teal-100 text-teal-700 border border-teal-200",
  green:  "bg-green-100 text-green-700 border border-green-200",
  amber:  "bg-amber-100 text-amber-700 border border-amber-200",
}

// ─── Helper Functions ─────────────────────────────────────────────────────────

function getTagColor(tag = ""): TagColor {
  const v = tag.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner|market|shopping/.test(v)) return "amber"
  if (/beach|water|sea|island/.test(v)) return "teal"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(v)) return "green"
  return "violet"
}

function getImageForActivity(activity: Partial<Activity>) {
  if (activity.img) return activity.img
  const v = `${activity.tag || ""} ${activity.title || ""}`.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner/.test(v)) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=80&fit=crop"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(v)) return "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=120&h=80&fit=crop"
  if (/night|music|club|party/.test(v)) return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=80&fit=crop"
  if (/shopping|market/.test(v)) return "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=80&fit=crop"
  return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&fit=crop"
}

function getBudgetIcon(label = ""): React.ElementType {
  const v = label.toLowerCase()
  if (/stay|hotel|room|accommodation/.test(v)) return Hotel
  if (/food|meal|restaurant/.test(v)) return Utensils
  if (/transport|route|taxi|cab|flight/.test(v)) return Navigation
  if (/activity|ticket|tour/.test(v)) return Camera
  return ShoppingBag
}

function highlightIcon(label = ""): React.ElementType {
  const v = label.toLowerCase()
  if (/beach|water|sea|island/.test(v)) return Waves
  if (/night|music|club|party/.test(v)) return Music
  if (/food|cafe|coffee/.test(v)) return Coffee
  if (/culture|heritage|museum|fort|photo/.test(v)) return Camera
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
      activities: (day.activities || []).map((a): Activity => {
        const tag = a.tag || "Experience"
        return {
          time: a.time || "Flexible",
          title: a.title || "Recommended stop",
          tag,
          tagColor: a.tagColor || getTagColor(tag),
          desc: a.desc || a.description || "A personalized recommendation for your trip.",
          duration: a.duration || "1 hr",
          cost: a.cost || "Varies",
          img: getImageForActivity(a),
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
  try { return JSON.parse(value) as T } catch { return null }
}

function readStoredTrip(tripId: string) {
  const stored = parseSafeJson<StoredTrip>(window.sessionStorage.getItem(`velora-trip:${tripId}`))
  if (!stored) return null
  return { request: stored.request, trip: stored.trip || stored.result || stored.raw || null }
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function Tag({ label, color }: { label: string; color: TagColor }) {
  return (
    <span className={cn("text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap", TAG_STYLES[color] || TAG_STYLES.violet)}>
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
      <div className={cn("flex-1 min-w-0", isLast ? "pb-0" : "pb-6")}>
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

function DonutChart({ budget, totalCost }: { budget: BudgetItem[]; totalCost: string }) {
  const total = budget.length
  const r = 52
  const cx = 72
  const cy = 72
  const circumference = 2 * Math.PI * r
  const pct = 100 / total
  let offset = 0
  const segments = budget.map((d, i) => {
    const len = (pct / 100) * circumference
    const seg = { ...d, offset, len, color: BUDGET_COLORS[i % BUDGET_COLORS.length] }
    offset += len
    return seg
  })

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-36 h-36 shrink-0">
        <svg width={144} height={144} viewBox="0 0 144 144">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={18} />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={18}
              strokeDasharray={`${s.len} ${circumference - s.len}`}
              strokeDashoffset={-s.offset}
              style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium">Total</span>
          <span className="text-[15px] font-black text-gray-900 leading-tight">{totalCost || "—"}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {budget.map((d, i) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: BUDGET_COLORS[i % BUDGET_COLORS.length] }} />
              <span className="text-[12px] text-gray-500">{d.label}</span>
            </div>
            <span className="text-[12px] font-semibold text-gray-800">{d.amount}</span>
          </div>
        ))}
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
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex items-center px-6 h-16 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
            <Navigation size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900 leading-none">Velora</p>
            
          </div>
        </div>
      </div>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-600">Generating itinerary</p>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-900">{status.title || "Building your trip"}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">{status.message || "Crafting a personalized day-by-day plan."}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-right shrink-0">
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
                  <div className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black",
                    done ? "border-teal-200 bg-teal-50 text-teal-700"
                      : active ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-400"
                  )}>
                    {done ? "✓" : index + 1}
                  </div>
                  <span className={cn("text-sm font-semibold",
                    active ? "text-gray-900" : done ? "text-teal-700" : "text-gray-400"
                  )}>{step}</span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function VeloraTripPage({ tripId }: { tripId?: string }) {
  const [activeDay, setActiveDay] = useState(0)
  const [dayLoading, setDayLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")

  const [daysState, setDaysState] = useState<Day[]>(DAYS_FALLBACK)
  const [budgetState, setBudgetState] = useState<BudgetItem[]>(BUDGET_FALLBACK)
  const [highlightsState, setHighlightsState] = useState([
    { label: "Beaches", icon: Waves },
    { label: "Nightlife", icon: Music },
    { label: "Cafes", icon: Coffee },
    { label: "Heritage", icon: Camera },
    { label: "Sunsets", icon: Sun },
  ])
  const [mapPinsState, setMapPinsState] = useState(MAP_PINS_FALLBACK)
  const [titleState, setTitleState] = useState("Goa Escape")
  const [metaState, setMetaState] = useState({
    duration: "4 Days / 3 Nights",
    destination: "Goa, India",
    travelers: "2 Travelers",
    budgetLabel: "Budget Trip",
  })
  const [totalCostState, setTotalCostState] = useState("₹24,800")
  const [isGenerating, setIsGenerating] = useState(false)
  const [statusState, setStatusState] = useState<StreamStatus>({ progress: 0, title: "Preparing itinerary", message: "Starting AI planner" })
  const [hasGeneratedTrip, setHasGeneratedTrip] = useState(false)

  const day = daysState[activeDay]

  // Fetch photos for activities in the selected day
  useEffect(() => {
    let mounted = true
    async function fetchDayDetails(dayIndex: number) {
      const d = daysState[dayIndex]
      if (!d) return
      if (!d.activities.some((a) => !a.fetched)) return
      setDayLoading(true)
      try {
        const results = await Promise.allSettled(
          d.activities.map((act) => fetch(`/api/place?q=${encodeURIComponent(act.title)}`))
        )
        if (!mounted) return
        const updatedActivities = await Promise.all(
          results.map(async (r, i) => {
            const act = d.activities[i]
            if (r.status === "fulfilled") {
              try {
                if (r.value.ok) {
                  const payload = await r.value.json()
                  return { ...act, img: payload?.photoUrl || act.img, fetched: true }
                }
              } catch {}
            }
            return { ...act, fetched: true }
          })
        )
        setDaysState((prev) => prev.map((dd, idx) => idx !== dayIndex ? dd : { ...dd, activities: updatedActivities }))
      } catch (err) {
        console.error("fetchDayDetails error", err)
      } finally {
        if (mounted) setDayLoading(false)
      }
    }
    void fetchDayDetails(activeDay)
    return () => { mounted = false }
  }, [activeDay])

  const applyTrip = (payload: TripResponse, request?: StoredTrip["request"]) => {
    const normalized = normalizeTripResponse(payload)
    if (!normalized) return
    setTitleState(normalized.title)
    setDaysState(normalized.days)
    setBudgetState(normalized.budget.length ? normalized.budget : BUDGET_FALLBACK)
    setTotalCostState(normalized.totalCost || totalCostState)
    setMetaState({
      duration: request?.duration || `${normalized.days.length} Days`,
      destination: request?.destination || metaState.destination,
      travelers: "2 Travelers",
      budgetLabel: request?.budget || normalized.totalCost || metaState.budgetLabel,
    })
    setHighlightsState(
      [...new Set(normalized.days.flatMap((d) => d.activities.map((a) => a.tag)).filter(Boolean))]
        .slice(0, 5)
        .map((label) => ({ label, icon: highlightIcon(label) }))
    )
    setMapPinsState(
      normalized.days[0]?.activities?.slice(0, 4).map((a, index) => ({
        label: a.title,
        top: `${18 + index * 18}%`,
        left: `${26 + (index % 2) * 24}%`,
      })) || MAP_PINS_FALLBACK
    )
    setActiveDay(0)
    setHasGeneratedTrip(true)
  }

  useEffect(() => {
    if (!tripId) return
    let mounted = true
    const stored = readStoredTrip(tripId)
    if (stored?.trip) { applyTrip(stored.trip, stored.request); return }
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

  const dayIcons = [Sun, Waves, Camera, Sunrise]

  return (

      <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans overflow-hidden">

        {/* ── Top Header ── */}
        <div className="flex flex-col flex-1 min-w-0">
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between gap-4 px-5 shrink-0 z-10">
  {/* Left Section */}
  <div className="flex items-center gap-3 min-w-0 flex-1">
    {/* Prompt Box */}
    <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 h-9 min-w-0 max-w-xl w-full">
      <Sparkles size={13} className="text-violet-500 shrink-0" />

      <span className="text-[13px] text-gray-400 truncate">
        Plan a 4-day trip to {metaState.destination} for a couple
      </span>
    </div>

    {/* Generate Button */}
    <Button
      size="sm"
      className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-bold text-[13px] gap-2 h-9 hover:opacity-90 shrink-0"
    >
      <Sparkles size={12} />
      Generate Trip ✦
    </Button>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-4 shrink-0">
    {/* Notification */}
    <div className="relative">
      <Bell size={18} className="text-gray-500 cursor-pointer" />
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
    </div>

    {/* User */}
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face"
          alt="user"
          className="w-full h-full object-cover"
        />
      </div>

      <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap">
        Hi, Arjun ▾
      </span>
    </div>
  </div>
</header>

          {/* ── 2-col body ── */}
          <div className="flex flex-1 min-h-0">

            {/* ── CENTER ── */}
            <main className="flex-1 min-w-0 overflow-y-auto scrollbar-hide bg-gray-50">
              <div className="p-5 space-y-5">

                {/* Hero Card */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                  <div className="flex min-h-[220px]">
                    <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 mb-3">
                          <Sparkles size={12} className="text-amber-400" />
                          <span className="text-[11px] text-gray-400 font-semibold">Your AI Generated Trip</span>
                        </div>
                        <h1 className="text-[28px] font-black text-gray-900 mb-3 leading-none">{titleState}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {[
                            { icon: Calendar, text: metaState.duration },
                            { icon: Users, text: metaState.travelers },
                            { icon: Wallet, text: metaState.budgetLabel },
                          ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                              <Icon size={12} className="text-violet-500" />
                              <span className="text-[12px] font-semibold text-gray-600">{text}</span>
                            </div>
                          ))}
                        </div>
                        <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">
                          A perfect blend of adventure, culture, and relaxation — curated just for you.
                        </p>
                      </div>
                      <div className="flex gap-2.5 mt-4">
                        <Button size="sm" className="bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-[13px] gap-2 hover:opacity-90">
                          View Full Itinerary
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowModal(true)} className="text-[13px] gap-2 font-semibold">
                          <Bookmark size={13} /> Save Trip
                        </Button>
                      </div>
                    </div>
                    <div className="w-72 relative overflow-hidden rounded-r-2xl shrink-0">
                      <img
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=440&fit=crop"
                        alt={metaState.destination}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Itinerary Overview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-black text-gray-900">Itinerary Overview</h2>
                    <button className="flex items-center gap-1 text-[13px] font-semibold text-violet-600 hover:text-violet-700">
                      View Full Itinerary <ArrowRight size={13} />
                    </button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {daysState.map((d, i) => {
                      const Icon = d.icon || dayIcons[i % 4]
                      return (
                        <div
                          key={d.day}
                          onClick={() => setActiveDay(i)}
                          className={cn(
                            "shrink-0 w-[190px] rounded-xl border bg-white overflow-hidden cursor-pointer transition-all",
                            activeDay === i ? "border-violet-300 shadow-md shadow-violet-100" : "border-gray-200 hover:border-violet-200 hover:shadow-sm"
                          )}
                        >
                          <div className="relative h-[100px]">
                            <img
                              src={d.activities[0]?.img || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=380&h=200&fit=crop`}
                              alt={d.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-2 left-3">
                              <p className="text-[10px] text-white/70 font-semibold">Day {d.day}</p>
                              <p className="text-[13px] font-black text-white">{d.title}</p>
                            </div>
                          </div>
                          <div className="p-3">
                            <ul className="space-y-1 mb-3">
                              {d.activities.slice(0, 4).map((a, j) => (
                                <li key={j} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                                  <span className="text-violet-400 mt-0.5 shrink-0">•</span>
                                  <span className="leading-snug">{a.title}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                              <span className="text-[10px] text-gray-400">Est.</span>
                              <span className="text-[12px] font-bold text-violet-600">{d.activities.find(a => a.cost !== "—")?.cost || "—"}</span>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Selected Day Activities */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
                  {/* Day header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                        {(() => { const Icon = day.icon || dayIcons[activeDay % 4]; return <Icon size={16} className="text-violet-600" /> })()}
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-violet-500">Day {day.day}</p>
                        <h3 className="text-[16px] font-black text-gray-900">{day.title}</h3>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-[12px] gap-1.5 h-8">
                        <Edit size={11} /> Edit Day
                      </Button>
                      <Button size="sm" variant="outline" className="text-[12px] gap-1.5 h-8 text-violet-600 border-violet-200 bg-violet-50 hover:bg-violet-100">
                        <RefreshCw size={11} /> Regenerate
                      </Button>
                    </div>
                  </div>
                  <p className="text-[12px] text-gray-400 px-6 py-2">{day.subtitle}</p>
                  {/* Activities timeline */}
                  <div className="px-6 py-4">
                    {dayLoading ? (
                      <div className="flex items-center justify-center h-24 text-gray-400 text-sm">Loading activities…</div>
                    ) : (
                      day.activities.map((act, i) => (
                        <ActivityRow key={i} act={act} isLast={i === day.activities.length - 1} />
                      ))
                    )}
                  </div>
                </div>

                {/* Recommended Places */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-[16px] font-black text-gray-900">Recommended Places</h2>
                    <button className="flex items-center gap-1 text-[13px] font-semibold text-violet-600 hover:text-violet-700">
                      View on Map <MapPin size={13} />
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {["All", "Attractions", "Restaurants", "Cafes", "Hotels", "Shopping"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setActiveFilter(f)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[12px] font-semibold border transition-all",
                          activeFilter === f
                            ? "bg-violet-600 text-white border-violet-600"
                            : "bg-white text-gray-500 border-gray-200 hover:border-violet-400 hover:text-violet-600"
                        )}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {daysState.flatMap(d => d.activities).slice(0, 6).map((act, i) => (
                      <div key={i} className="relative shrink-0 w-36 h-28 rounded-xl overflow-hidden cursor-pointer">
                        <img
                          src={act.img || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=280&h=220&fit=crop"}
                          alt={act.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-xl" />
                        <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
                          <Heart size={10} className="text-red-500" />
                        </button>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-[10px] font-bold text-white leading-tight">{act.title}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <Star size={8} className="text-amber-400 fill-amber-400" />
                            <span className="text-[9px] text-white/80 font-semibold">4.8</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

        
              </div>
            </main>

            {/* ── RIGHT PANEL ── */}
            <aside className="w-[420px] shrink-0 border-l border-gray-100 bg-white flex flex-col overflow-y-auto scrollbar-hide">

              {/* Trip Map */}
              <div className="relative h-[200px] bg-slate-800 shrink-0 overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=640&h=400&fit=crop"
                  alt="map"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-sky-200/30" />
                <div className="absolute top-2.5 left-2.5 bg-white rounded-lg px-2.5 py-1 text-[12px] font-bold text-gray-800 shadow-sm border border-gray-200">
                  Trip Map
                </div>
                {/* Map pins */}
                {mapPinsState.map((pin, i) => (
                  <div key={i} className="absolute flex items-center gap-1.5" style={{ top: pin.top, left: pin.left }}>
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-40" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600 shadow-lg" />
                    </span>
                    <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap">
                      {pin.label}
                    </span>
                  </div>
                ))}
                {/* Map controls */}
                <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-0.5">
                  {[ZoomIn, ZoomOut, Crosshair].map((Icon, i) => (
                    <button key={i} className="w-6 h-6 rounded border border-white/20 bg-black/50 text-white/70 flex items-center justify-center hover:text-white transition-all">
                      <Icon size={11} />
                    </button>
                  ))}
                </div>
              </div>

  


              {/* Budget Breakdown */}
              <div className="px-4 py-4 border rounded-2xl border-gray-200 mb-4">
                <h3 className="text-[14px] font-black text-gray-900 mb-3">Budget Breakdown</h3>
                <DonutChart budget={budgetState} totalCost={totalCostState} />
              </div>


              
              {/* AI Travel Assistant */}
              <div className="px-4 py-4 border rounded-2xl border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="text-[13px] font-black text-violet-600 mb-1.5">AI Travel Assistant</h3>
                    <p className="text-[12px] text-gray-500 leading-snug">Ask anything about your trip, I'm here to help!</p>
                    <Button size="sm" variant="outline" className="mt-2.5 text-[12px] gap-1.5 h-8">
                      <MessageSquare size={12} /> Chat Now
                    </Button>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
                    <Bot size={26} className="text-violet-500" />
                  </div>
                </div>
              </div>

              {/* Trip Highlights */}
              <div className="px-4 py-4 border-b border-gray-100">
                <h3 className="text-[14px] font-black text-gray-900 mb-3">Trip Highlights</h3>
                <div className="grid grid-cols-5 gap-2">
                  {highlightsState.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-2">
                      <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
                        <Icon size={14} className="text-violet-500" />
                      </div>
                      <span className="text-[9px] font-bold text-gray-500 text-center leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
              </div>



              {/* Login bar */}
              <div className="mt-auto border-t border-gray-100 bg-white px-4 py-3 flex items-center justify-between gap-3 sticky bottom-0">
                <div className="flex items-center gap-2">
                  <Lock size={12} className="text-violet-500 shrink-0" />
                  <span className="text-[11px] text-gray-500">
                    <button onClick={() => setShowModal(true)} className="text-violet-600 font-bold hover:text-violet-700">Login</button>
                    {" "}to save this trip
                  </span>
                </div>
                <Button
                  size="sm"
                  onClick={() => setShowModal(true)}
                  className="bg-gradient-to-r from-violet-600 to-purple-500 text-white text-[12px] font-bold h-8 shrink-0 hover:opacity-90"
                >
                  Sign up free
                </Button>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Save Trip Modal ── */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-sm rounded-3xl border-gray-200 shadow-2xl">
            <DialogHeader className="items-center text-center">
              <div className="w-14 h-14 rounded-2xl mx-auto mb-2 bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200">
                <Bookmark size={24} className="text-white" />
              </div>
              <DialogTitle className="text-xl font-black text-gray-900">Save your trip</DialogTitle>
              <DialogDescription className="text-[13px] text-gray-500 leading-relaxed text-center">
                Sign up free to save this itinerary, access it anywhere, and share it with travel buddies.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2.5 mt-2">
              <Button className="w-full h-11 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold gap-2 hover:opacity-90">
                <Sparkles size={14} /> Sign up — it's free
              </Button>
              <Button variant="outline" className="w-full h-10 text-[13px] font-semibold">
                Already have an account? Log in
              </Button>
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-1">No credit card · Cancel anytime · Free forever</p>
          </DialogContent>
        </Dialog>

        <style>{`
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

  )
}