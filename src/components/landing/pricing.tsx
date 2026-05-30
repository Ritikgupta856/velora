"use client"

import React from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"

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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants: Variants = {
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
    <section
      id="pricing"
      className="relative overflow-hidden bg-white py-24 text-black"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.12),transparent_55%)]" />

      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f4f4f5_1px,transparent_1px),linear-gradient(to_bottom,#f4f4f5_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-600"
          >
            Pricing
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-4xl font-bold tracking-tight text-black sm:text-5xl"
          >
            Choose the plan that fits you
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-2xl text-base text-zinc-600"
          >
            Simple, transparent pricing for every kind of traveler.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-4xl gap-8 lg:grid-cols-2"
        >
          {tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 bg-white ${tier.popular
                  ? "border-violet-500 shadow-2xl shadow-violet-100 z-10"
                  : "border-zinc-200 hover:border-violet-200 hover:shadow-xl"
                }`}
            >
              {/* Popular Badge */}
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-lg">
                  Most Popular
                </div>
              )}

              <div>
                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-black">
                  {tier.name}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-normal text-zinc-600">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1 text-black">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price}
                  </span>

                  <span className="text-sm font-medium text-zinc-500">
                    {tier.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="mt-8 space-y-4">
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                        <Check className="size-3" />
                      </div>

                      <span className="text-sm text-zinc-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <div className="mt-8">
                <Button
                  className={`w-full rounded-xl py-6 font-semibold transition-all duration-300 ${tier.popular
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-200 hover:bg-violet-500"
                      : "border border-zinc-200 bg-zinc-100 text-black hover:bg-zinc-200"
                    }`}
                >
                  {tier.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600"
        >
          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-500" />
            7-day free trial
          </div>

          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-500" />
            Cancel anytime
          </div>

          <div className="flex items-center gap-2">
            <Check className="size-4 text-violet-500" />
            No hidden charges
          </div>
        </motion.div>
      </div>
    </section>
  )
}