"use client"

import React from "react"
import { MessageSquare, Sparkles, Sliders, Briefcase } from "lucide-react"
import { motion, Variants } from "framer-motion"

const steps = [
  {
    number: "1",
    title: "Tell us your plan",
    description: "Share your destination, dates, budget, and preferences.",
    icon: MessageSquare,
  },
  {
    number: "2",
    title: "AI builds your trip",
    description: "Our AI crafts the perfect itinerary, budget, and routes.",
    icon: Sparkles,
  },
  {
    number: "3",
    title: "Review & customize",
    description: "Tweak your plan, adjust stops, and make it yours.",
    icon: Sliders,
  },
  {
    number: "4",
    title: "Pack & go",
    description: "Save, share, and sync your trip. Adventure awaits!",
    icon: Briefcase,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
}

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24 bg-gray-50 overflow-hidden">

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600"
          >
            How it works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Plan your trip in 4 simple steps
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative rounded-3xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:border-violet-200 hover:shadow-lg shadow-sm"
              >
                {/* Step indicator */}
                <div className="absolute top-6 left-6 text-xs font-bold text-violet-400 tracking-wider">
                  STEP {step.number.padStart(2, '0')}
                </div>

                <div className="mt-4 flex justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-500 group-hover:bg-violet-100 group-hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgba(124,58,237,0.08)] group-hover:shadow-[0_8px_30px_rgba(124,58,237,0.15)]">
                    <Icon className="size-6 text-violet-500 transition-transform duration-300" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm text-gray-500 leading-relaxed transition-colors duration-300 group-hover:text-gray-600">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
