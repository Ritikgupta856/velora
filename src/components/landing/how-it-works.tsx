"use client"

import { Briefcase, MessageSquare, Sliders, Sparkles } from "lucide-react"
import { motion, Variants } from "framer-motion"

const steps = [
  {
    number: "01",
    title: "Tell us your plan",
    description: "Share your destination, dates, budget, and preferences.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "AI builds your trip",
    description: "Our AI crafts the perfect itinerary, budget, and routes.",
    icon: Sparkles,
  },
  {
    number: "03",
    title: "Review & customize",
    description: "Tweak your plan, adjust stops, and make it yours.",
    icon: Sliders,
  },
  {
    number: "04",
    title: "Pack & go",
    description: "Save, share, and sync your trip. Adventure awaits!",
    icon: Briefcase,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
}

export default function HowItWorks() {
  return (
    <section id="how" className="velora-section bg-[var(--velora-shell)] pt-28 lg:pt-40">
      <div className="absolute left-1/2 top-0 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[var(--velora-primary-soft)] blur-3xl" />

      <div className="velora-container relative z-10">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="velora-eyebrow"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--velora-ink)] sm:text-5xl"
          >
            Plan your trip in 4 simple steps
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-7 md:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.article
                key={step.number}
                variants={itemVariants}
                whileHover={{ y: -7, transition: { duration: 0.2 } }}
                className="velora-card group relative rounded-[1.75rem] p-8 text-center"
              >
                {index < steps.length - 1 && (
                  <div className="pointer-events-none absolute -right-8 top-1/2 hidden h-px w-9 border-t border-dashed border-[var(--velora-primary)]/50 lg:block" />
                )}
                <p className="absolute left-6 top-6 text-[11px] font-black uppercase tracking-[0.16em] text-[var(--velora-primary)]">
                  Step {step.number}
                </p>
                <div className="mx-auto mt-8 grid size-16 place-items-center rounded-full bg-[var(--velora-primary-soft)] text-[var(--velora-primary)] transition group-hover:scale-105">
                  <Icon className="size-7" />
                </div>
                <h3 className="mt-7 text-lg font-black text-[var(--velora-ink)]">{step.title}</h3>
                <p className="mt-3 text-sm font-medium leading-6 text-[var(--velora-muted)]">{step.description}</p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
