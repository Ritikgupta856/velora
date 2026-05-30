"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowRight, Plane, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion, Variants } from "framer-motion"

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

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 16,
      delay: 0.3,
    },
  },
}

export default function Hero() {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [placeholderText, setPlaceholderText] = useState("")

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

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8 lg:pt-40 lg:pb-28"
      style={{
        backgroundImage: "url('/images/hero-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30" />

      {/* Subtle top glow overlay */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-violet-500 to-fuchsia-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72rem]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 backdrop-blur-sm">
              <Sparkles className="size-3.5 text-violet-400 animate-pulse" />
              AI Powered Travel Planner
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl font-bold leading-[1.1] tracking-[-0.04em] text-white sm:text-6xl md:text-7xl"
          >
            Plan unforgettable
            <br />
            journeys{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-fuchsia-500 bg-clip-text text-transparent">
              with AI
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg sm:leading-8"
          >
            AI-powered itineraries, budgets, and hidden gems for your next adventure.
          </motion.p>

          {/* Input with typing placeholder */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-10 flex h-16 max-w-2xl items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_50px_-12px_rgba(139,92,246,0.3)] transition-all duration-300 hover:border-violet-500/30 focus-within:border-violet-500/50 focus-within:shadow-[0_0_50px_-8px_rgba(139,92,246,0.4)]"
          >
            <Input
              type="text"
              placeholder={placeholderText}
              className="h-full flex-1 border-0 bg-transparent px-5 text-sm text-white shadow-none outline-none ring-0 placeholder:text-zinc-500 focus-visible:ring-0 sm:text-base"
            />

            <Button className="h-full rounded-l-none rounded-r-2xl bg-violet-600 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-violet-500 active:scale-[0.98] sm:px-8 border-l border-white/10 shadow-none">
              Generate Trip
            </Button>
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

            <p className="text-sm text-zinc-400">
              <span className="font-semibold text-white">10,000+</span> travelers exploring smarter
            </p>
          </motion.div>
        </motion.div>

        {/* Hero Card Mockup with responsive adjustments and Framer Motion */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-2xl transition duration-500 hover:border-white/15 md:p-6 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Left Info */}
            <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-black/40 p-6">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Goa Getaway 🌴
                </h3>
                <p className="mt-1 text-sm text-zinc-400">
                  4 Days • 3 Nights
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <p className="text-sm text-zinc-500">Budget</p>
                    <h4 className="text-lg font-semibold text-white">₹24,800</h4>
                  </div>

                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <p className="text-sm text-zinc-500">Best Time</p>
                    <h4 className="text-sm font-medium text-white">Nov — Feb</h4>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-sm text-zinc-500">Rating</p>
                    <h4 className="text-sm font-medium text-white">⭐ 4.8</h4>
                  </div>
                </div>
              </div>

              <Button className="mt-8 w-full rounded-xl bg-white/10 border border-white/10 py-3.5 text-sm font-semibold text-white transition hover:bg-white/20 active:scale-[0.98]">
                View itinerary
              </Button>
            </div>

            {/* Right Preview - Explicit height on mobile to prevent collapse */}
            <div className="relative h-[250px] sm:h-[350px] lg:h-auto overflow-hidden rounded-2xl border border-white/10 group">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                alt="Goa"
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                priority
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Floating Cards (Responsive) */}
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 md:bottom-6 md:left-6 md:right-6">
                {[
                  { day: "Day 1", spot: "Baga Beach" },
                  { day: "Day 2", spot: "Anjuna Beach" },
                  { day: "Day 3", spot: "Dudhsagar Falls" },
                  { day: "Day 4", spot: "Old Goa" },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="rounded-xl border border-white/10 bg-black/50 p-2.5 backdrop-blur-md transition hover:border-violet-500/30"
                  >
                    <p className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">{item.day}</p>
                    <h5 className="mt-1 text-xs font-semibold text-white truncate">
                      {item.spot}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}


