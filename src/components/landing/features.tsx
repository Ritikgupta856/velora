"use client"

import { Heart, MapPin, Sparkles, WalletCards } from "lucide-react"
import { motion, Variants } from "framer-motion"

const features = [
  {
    title: "AI-Powered Itineraries",
    desc: "Personalized day-by-day plans tailored to your style and preferences.",
    icon: Sparkles,
  },
  {
    title: "Budget Optimization",
    desc: "Smart recommendations that make your trip amazing and affordable.",
    icon: WalletCards,
  },
  {
    title: "Interactive Maps",
    desc: "Visualize your entire journey with maps, routes and real-time optimizations.",
    icon: MapPin,
  },
  {
    title: "Handpicked Experiences",
    desc: "Discover hidden gems and must-visit places loved by real travelers.",
    icon: Heart,
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

export default function Features() {
  return (
    <section id="features" className="velora-section bg-[var(--velora-shell)]">
      <div className="velora-container">
        <div className="mb-14 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="velora-eyebrow"
          >
            Why Velora?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--velora-ink)] sm:text-5xl"
          >
            AI meets travel magic
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.article key={feature.title} variants={itemVariants} className="group flex gap-5">
                <div className="grid size-14 shrink-0 place-items-center rounded-full bg-[var(--velora-primary-soft)] text-[var(--velora-primary)] transition group-hover:scale-105">
                  <Icon className="size-6" />
                </div>
                <div>
                  <h3 className="text-base font-black text-[var(--velora-ink)]">{feature.title}</h3>
                  <p className="mt-2 text-sm font-medium leading-6 text-[var(--velora-muted)]">{feature.desc}</p>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
