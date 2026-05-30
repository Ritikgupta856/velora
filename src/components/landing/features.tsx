"use client"

import React from "react"
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

export default function Features() {
  return (
    <section id="features" className="relative bg-background py-24 text-white overflow-hidden">


      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
          >
            Why Velora?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl"
          >
            AI meets travel magic
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group relative min-h-56 overflow-hidden rounded-2xl border border-white/5 bg-background p-7 transition-colors duration-300 hover:border-violet-500/35 hover:bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(139,92,246,0.1),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-8 top-6 h-px rotate-[-18deg] bg-gradient-to-r from-transparent via-violet-300/20 to-transparent" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-6 grid size-12 place-items-center rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 text-violet-300  group-hover:shadow-[0_8px_30px_rgba(124,58,237,0.3)] transition-shadow duration-300">
                      <Icon className="size-6 text-violet-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-300">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
