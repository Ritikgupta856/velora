"use client"

import React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Perfect for getting started",
    features: [
      "3 trip plans per month",
      "Basic itineraries",
      "Top destinations",
      "Community support",
    ],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    description: "For frequent travelers",
    features: [
      "Unlimited trip plans",
      "AI-powered itineraries",
      "Smart budget optimization",
      "Offline access",
      "Priority support",
    ],
    buttonText: "Start Free Trial",
    popular: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 15,
    },
  },
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-[#020612] overflow-hidden text-white">
      {/* Light Radial Gradient Behind Pricing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400"
          >
            Pricing
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            Choose the plan that fits you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-zinc-400"
          >
            Simple, transparent pricing for every kind of traveler.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-8 lg:grid-cols-2 max-w-4xl mx-auto"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                tier.popular
                  ? "border-violet-500 bg-white/[0.04] shadow-[0_20px_50px_rgba(124,58,237,0.12)] z-10"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-md shadow-violet-600/20">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-normal">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-1 text-white">
                  <span className="text-4.5xl font-bold tracking-tight">{tier.price}</span>
                  <span className="text-sm font-medium text-zinc-400">{tier.period}</span>
                </div>

                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-violet-400">
                        <Check className="size-3" />
                      </div>
                      <span className="text-sm text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Button
                  className={`w-full py-6 rounded-xl font-semibold transition-all duration-300 ${
                    tier.popular
                      ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/15"
                      : "bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-white hover:text-white"
                  }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap justify-center items-center gap-6 text-xs text-zinc-500"
        >
          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-400" />
            7-day free trial
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-400" />
            Cancel anytime
          </div>
          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-400" />
            No hidden charges
          </div>
        </motion.div>
      </div>
    </section>
  )
}
