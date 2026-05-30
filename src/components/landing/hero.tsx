"use client"

import React, { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion, Variants } from "framer-motion"
import GenerateForm, { GenerateFormData } from "@/components/generate/GenerateForm"
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
  "3-day winter getaway to Manali",
  "Budget 5-day Bali itinerary",
  "Romantic 4-day Udaipur getaway",
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 90,
      damping: 14,
    },
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
    let currentPrompt = prompts[currentPromptIndex]
    let isDeleting = false
    let typingSpeed = 60
    let timer: NodeJS.Timeout

    const type = () => {
      currentPrompt = prompts[currentPromptIndex]
      if (!isDeleting) {
        setPlaceholderText(currentPrompt.substring(0, charIndex + 1))
        charIndex++

        if (charIndex === currentPrompt.length) {
          isDeleting = true
          typingSpeed = 2200 // pause at the end
        } else {
          typingSpeed = 60
        }
      } else {
        setPlaceholderText(currentPrompt.substring(0, charIndex - 1))
        charIndex--

        if (charIndex === 0) {
          isDeleting = false
          setCurrentPromptIndex((prev) => (prev + 1) % prompts.length)
          typingSpeed = 600 // pause before next prompt
        } else {
          typingSpeed = 30
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

    const id = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

    try {
      window.sessionStorage.setItem(
        `velora-trip:${id}`,
        JSON.stringify({
          request: pendingForm,
          createdAt: Date.now(),
        })
      )
    } catch (error) {
      console.error("Failed to persist trip request", error)
    }

    router.push(`/trip/${id}?processing=1`)
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pt-36 pb-20 sm:px-6 lg:px-8 lg:pt-44 lg:pb-28"
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >



      <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/55 to-white/90" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 shadow-sm backdrop-blur-sm">
              <Sparkles className="size-3.5 text-teal-500" />
              AI Powered Travel Planner
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-primary sm:text-6xl md:text-7xl"
          >
            Plan unforgettable
            <br />
            journeys{" "}
            <span className="bg-gradient-to-r from-teal-600 via-sky-600 to-rose-500 bg-clip-text text-transparent">
              with AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg sm:leading-8"
          >
            AI-powered itineraries, budgets, and hidden gems for your next adventure.
          </motion.p>

          {/* Input with typing placeholder */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-10 flex h-16 max-w-2xl items-center overflow-hidden rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] transition-all duration-300 hover:border-teal-300 focus-within:border-teal-400"
          >
            <Input
              type="text"
              placeholder={placeholderText}
              className="h-full flex-1 border-0 bg-transparent px-5 text-sm text-gray-900 shadow-none outline-none ring-0 placeholder:text-gray-500 focus-visible:ring-0 sm:text-base"
            />

            <button onClick={() => setShowForm(true)} className="h-full rounded-l-none rounded-r-2xl bg-gray-900 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 active:scale-[0.98] sm:px-8 border-l border-gray-200 shadow-none cursor-pointer">
              Generate Trip
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="flex -space-x-2.5">
              {travelers.slice(0, 4).map((src, i) => (
                <Avatar key={i} className="size-9 border-2 border-[#020612] transition-transform hover:scale-110 hover:z-20">
                  <AvatarImage src={src} alt="Traveler" />
                  <AvatarFallback className="bg-zinc-800 text-zinc-200">T</AvatarFallback>
                </Avatar>
              ))}
            </div>

            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">10,000+</span> travelers exploring smarter
            </p>
          </motion.div>
        </motion.div>

    
      </div>
      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={() => setShowForm(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative z-10 w-full max-w-lg p-4">
            <GenerateForm onConfirmRequest={handleGenerateRequest} />
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={() => setShowConfirm(false)} className="absolute inset-0 bg-black/40" />
          <div className="relative bg-white border border-gray-200 rounded-2xl p-5 z-10 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900">Please confirm</h3>
            <p className="text-sm text-gray-600 mt-2">Bro — check your choices before we build the itinerary. Proceed?</p>
            <div className="flex gap-3 mt-4">
              <Button onClick={() => setShowConfirm(false)} className="flex-1 border border-gray-200 bg-white text-gray-700">Cancel</Button>
              <Button onClick={confirmGenerate} className="flex-1 bg-gray-900 text-white hover:bg-gray-800">Yes, build itinerary</Button>
            </div>
          </div>
        </div>
      )}

      {/* AI Processing Overlay */}
      {/* Processing moved to trip page; hero no longer shows loading */}
    </section>
  )
}
