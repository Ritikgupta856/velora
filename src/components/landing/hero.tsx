"use client"

import { useEffect, useState } from "react"
import { ArrowRight, CalendarDays, MapPin, Sparkles, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import GenerateForm, { GenerateFormData } from "@/components/generate/GenerateForm"
import { motion, Variants } from "framer-motion"
import { useRouter } from "next/navigation"

const travelers = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=96&q=80",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80",
]

const prompts = [
  "Plan a 4-day Goa trip under ₹25k",
  "Build a Bali honeymoon in 5 days",
  "Find hidden cafes in Jaipur",
  "Plan a Swiss train adventure",
]

const dayCards = [
  ["Day 1", "North Goa Vibes"],
  ["Day 2", "Island Adventure"],
  ["Day 3", "Culture & Cafes"],
  ["Day 4", "Beach & Relax"],
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 92, damping: 15 },
  },
}

export default function Hero() {
  const router = useRouter()
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [placeholderText, setPlaceholderText] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [pendingForm, setPendingForm] = useState<GenerateFormData | null>(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 60
    let timer: NodeJS.Timeout

    const type = () => {
      const currentPrompt = prompts[currentPromptIndex]

      if (!isDeleting) {
        setPlaceholderText(currentPrompt.substring(0, charIndex + 1))
        charIndex += 1
        typingSpeed = charIndex === currentPrompt.length ? 2100 : 55
        if (charIndex === currentPrompt.length) isDeleting = true
      } else {
        setPlaceholderText(currentPrompt.substring(0, charIndex - 1))
        charIndex -= 1
        typingSpeed = charIndex === 0 ? 500 : 28
        if (charIndex === 0) {
          isDeleting = false
          setCurrentPromptIndex((prev) => (prev + 1) % prompts.length)
        }
      }

      timer = setTimeout(type, typingSpeed)
    }

    timer = setTimeout(type, typingSpeed)
    return () => clearTimeout(timer)
  }, [currentPromptIndex])

  const handleGenerateRequest = (data: GenerateFormData) => {
    setPendingForm(data)
    setShowConfirm(true)
  }

  const confirmGenerate = () => {
    if (!pendingForm) return
    setShowConfirm(false)
    setShowForm(false)

    const id =
      typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

    try {
      window.sessionStorage.setItem(
        `velora-trip:${id}`,
        JSON.stringify({ request: pendingForm, createdAt: Date.now() })
      )
    } catch (error) {
      console.error("Failed to persist trip request", error)
    }

    router.push(`/trips/${id}`)
  }

  return (
    <section id="hero" className="relative overflow-hidden pb-24 pt-28 sm:pt-32 lg:pb-32">
      <div
        className="absolute inset-0 min-h-[760px] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg.png')" }}
      />
      {/* <div className="absolute inset-0 min-h-[760px] bg-[linear-gradient(90deg,rgb(255_255_255_/_96%)_0%,rgb(255_255_255_/_80%)_34%,rgb(255_255_255_/_28%)_66%,rgb(255_255_255_/_5%)_100%)]" /> */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-transparent via-[var(--velora-shell)]/80 to-[var(--velora-shell)]" />

      <div className="velora-container relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl pt-12 lg:pt-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--velora-primary)] shadow-sm ring-1 ring-[var(--velora-line)] backdrop-blur-xl">
            <Sparkles className="size-3.5" />
            AI Powered Travel Planner
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-7 text-5xl font-black leading-[0.98] tracking-[-0.02em] text-[var(--velora-ink)] sm:text-6xl lg:text-7xl"
          >
            Plan unforgettable journeys{" "}
            <span className="velora-gradient-text">with AI</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-lg font-medium leading-8 text-[var(--velora-ink-soft)]"
          >
            AI-powered itineraries, budgets, and hidden gems for your next adventure.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex max-w-xl flex-col gap-3 rounded-3xl bg-white p-3 shadow-[var(--velora-shadow-strong)] ring-1 ring-[var(--velora-line)] sm:h-16 sm:flex-row sm:items-center sm:rounded-2xl sm:p-2"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3 px-2 sm:px-3">
              <MapPin className="size-5 shrink-0 text-[var(--velora-primary)]" />
              <span className="truncate text-sm font-semibold text-[var(--velora-ink-soft)] sm:text-base">
                {placeholderText || prompts[0]}
              </span>
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[var(--velora-primary)] px-6 text-sm font-black text-white shadow-[0_18px_34px_rgb(109_53_255_/_24%)] transition hover:bg-[var(--velora-primary-deep)] active:scale-[0.98]"
              type="button"
            >
              Plan My Trip
              <ArrowRight className="size-4" />
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-2.5">
              {travelers.map((src, index) => (
                <Avatar key={src} className="size-9 border-2 border-white shadow-sm">
                  <AvatarImage src={src} alt={`Traveler ${index + 1}`} />
                  <AvatarFallback className="bg-[var(--velora-primary-soft)] text-[var(--velora-primary)]">T</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-sm font-semibold text-[var(--velora-ink-soft)]">
              <span className="font-black text-[var(--velora-ink)]">10,000+</span> travelers exploring smarter
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 70, damping: 17 }}
          className="velora-card relative z-20 mx-auto mt-14 grid max-w-5xl gap-6 rounded-[2rem] p-5 sm:p-6 lg:-mb-28 lg:grid-cols-[250px_1fr]"
        >
          <div className="flex flex-col justify-between rounded-[1.5rem] bg-white/55 p-2">
            <div>
              <h2 className="text-2xl font-black tracking-[-0.04em] text-[var(--velora-ink)]">
                Goa Getaway <span aria-hidden="true">🌴</span>
              </h2>
              <p className="mt-1 text-sm font-bold text-[var(--velora-muted)]">4 Days • 3 Nights</p>
            </div>

            <div className="mt-8 space-y-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--velora-muted)]">Budget</span>
                <span className="font-black text-[var(--velora-ink)]">₹24,800</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-[var(--velora-muted)]">Travel Dates</span>
                <span className="font-black text-[var(--velora-ink)]">Nov - Feb</span>
              </div>
              <div className="flex items-center justify-end gap-1 font-black text-[var(--velora-ink)]">
                <Star className="size-4 fill-[#ffb545] text-[#ffb545]" />
                4.8
              </div>
            </div>

            <button className="mt-8 rounded-2xl border border-[var(--velora-line)] bg-white px-5 py-3 text-sm font-black text-[var(--velora-primary)] transition hover:border-[var(--velora-primary)]" type="button">
              View Itinerary
            </button>
          </div>

          <div className="relative min-h-[260px] overflow-hidden rounded-[1.45rem]">
            <img
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=85"
              alt="Golden beach itinerary preview"
              className="h-full min-h-[260px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-4">
              {dayCards.map(([day, title]) => (
                <div key={day} className="rounded-2xl bg-black/58 p-4 text-white backdrop-blur-md">
                  <p className="text-[11px] font-black uppercase tracking-[0.12em] text-white/80">{day}</p>
                  <p className="mt-1 text-sm font-black">{title}</p>
                </div>
              ))}
            </div>
            <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-2 text-xs font-black text-[var(--velora-ink)] shadow-lg backdrop-blur-md">
              <CalendarDays className="size-4 text-[var(--velora-primary)]" />
              Smart route
            </div>
          </div>
        </motion.div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-[var(--velora-ink)]/45" onClick={() => setShowForm(false)} aria-label="Close form" type="button" />
          <div className="relative z-10 w-full max-w-lg">
            <GenerateForm onConfirmRequest={handleGenerateRequest} />
          </div>
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button className="absolute inset-0 bg-[var(--velora-ink)]/45" onClick={() => setShowConfirm(false)} aria-label="Close confirmation" type="button" />
          <div className="velora-card relative z-10 w-full max-w-sm rounded-3xl p-6">
            <h3 className="text-xl font-black text-[var(--velora-ink)]">Please confirm</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--velora-muted)]">
              Check your choices before Velora builds the itinerary. Proceed?
            </p>
            <div className="mt-5 flex gap-3">
              <Button onClick={() => setShowConfirm(false)} className="flex-1 border border-[var(--velora-line)] bg-white text-[var(--velora-ink)] hover:bg-[var(--velora-primary-soft)]">
                Cancel
              </Button>
              <Button onClick={confirmGenerate} className="flex-1 bg-[var(--velora-primary)] text-white hover:bg-[var(--velora-primary-deep)]">
                Build trip
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
