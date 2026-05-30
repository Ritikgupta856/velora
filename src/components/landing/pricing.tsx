"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, Variants } from "framer-motion"

const tiers = [
  {
    name: "Free",
    price: "₹0",
    period: "/forever",
    description: "Perfect for getting started",
    features: ["3 trip plans per month", "Basic itineraries", "Top destinations", "Community support"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    description: "For frequent travelers",
    features: ["Unlimited trip plans", "AI-powered itineraries", "Smart budget optimization", "Offline access", "Priority support"],
    buttonText: "Start Free Trial",
    popular: true,
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 15 },
  },
}

export default function Pricing() {
  return (
    <section id="pricing" className="velora-section bg-[var(--velora-shell)]">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgb(109_53_255_/_13%),transparent_58%)]" />

      <div className="velora-container relative z-10">
        <div className="mb-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="velora-eyebrow"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--velora-ink)] sm:text-5xl"
          >
            Choose the plan that fits you
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-3 max-w-2xl text-base font-medium text-[var(--velora-muted)]"
          >
            Simple, transparent pricing for every kind of traveler.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto grid max-w-3xl gap-0 overflow-hidden rounded-3xl bg-white shadow-[var(--velora-shadow)] ring-1 ring-[var(--velora-line)] md:grid-cols-2"
        >
          {tiers.map((tier) => (
            <motion.article
              key={tier.name}
              variants={cardVariants}
              className={`relative p-7 sm:p-8 ${
                tier.popular ? "border-[var(--velora-primary)] ring-2 ring-[var(--velora-primary)]" : "border-[var(--velora-line)]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-px left-1/2 -translate-x-1/2 rounded-b-full bg-[var(--velora-primary)] px-5 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-black text-[var(--velora-ink)]">{tier.name}</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--velora-muted)]">{tier.description}</p>

              <div className="mt-5 flex items-baseline gap-1 text-[var(--velora-ink)]">
                <span className="text-5xl font-black tracking-[-0.06em]">{tier.price}</span>
                <span className="text-sm font-bold text-[var(--velora-muted)]">{tier.period}</span>
              </div>

              <ul className="mt-7 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[var(--velora-primary-soft)] text-[var(--velora-primary)]">
                      <Check className="size-3.5" />
                    </span>
                    <span className="text-sm font-semibold text-[var(--velora-ink-soft)]">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`mt-8 w-full rounded-xl py-6 font-black ${
                  tier.popular
                    ? "bg-[var(--velora-primary)] text-white hover:bg-[var(--velora-primary-deep)]"
                    : "bg-[var(--velora-surface-soft)] text-[var(--velora-ink)] hover:bg-[var(--velora-primary-soft)]"
                }`}
              >
                {tier.buttonText}
              </Button>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-[var(--velora-muted)]"
        >
          {["7-day free trial", "Cancel anytime", "No hidden charges"].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="size-4 text-[var(--velora-primary)]" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
