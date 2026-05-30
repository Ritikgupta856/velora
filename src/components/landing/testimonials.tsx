"use client"

import React from "react"
import { Star } from "lucide-react"
import { motion, Variants } from "framer-motion"

const sample = [
  {
    name: "Asha K.",
    role: "Adventure Traveler",
    quote: "Velora made planning my Goa getaway incredibly easy. The AI recommended an optimized route and a budget-friendly itinerary that fit my style perfectly!",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=33"
  },
  {
    name: "Liam M.",
    role: "Frequent Flyer",
    quote: "I've planned three trips with Velora now. The maps integration and route scheduling are exceptionally smooth. Beats any spreadsheet or generic chatbot.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Sophia R.",
    role: "Budget Backpacker",
    quote: "The budget tracking and pricing transparency are amazing. The interface is visually stunning, extremely fast, and completely simplified our travel planning.",
    rating: 5,
    avatar: "https://i.pravatar.cc/100?img=47"
  }
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

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#020612] py-24 text-white overflow-hidden border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            What travelers say
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {sample.map((s) => (
            <motion.blockquote
              key={s.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/5 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/30 hover:bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
            >
              <div>
                <div className="flex gap-1 mb-5">
                  {[...Array(s.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed italic">“{s.quote}”</p>
              </div>

              <footer className="mt-8 flex items-center gap-4 border-t border-white/5 pt-5">
                <img src={s.avatar} alt={s.name} className="size-10 rounded-full object-cover border border-white/10" />
                <div>
                  <cite className="not-italic text-sm font-bold text-white block">{s.name}</cite>
                  <span className="text-xs text-zinc-500 block mt-0.5">{s.role}</span>
                </div>
              </footer>
            </motion.blockquote>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
