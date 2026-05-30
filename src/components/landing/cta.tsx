"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CTA() {
  return (
    <section className="velora-section bg-[var(--velora-shell)] py-14 lg:py-16">
      <div className="velora-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="overflow-hidden rounded-3xl shadow-[var(--velora-shadow-strong)] ring-1 ring-white/20"
        >
          <div
            className="relative min-h-56 px-8 py-10 sm:px-12 sm:py-14"
            style={{
              backgroundImage: "url('/images/cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(3_11_40_/_92%),rgb(69_22_214_/_48%),rgb(3_11_40_/_16%))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgb(255_79_184_/_32%),transparent_34%)]" />

            <div className="relative z-10">
              <h2 className="max-w-md text-3xl font-black leading-tight tracking-[-0.04em] text-white sm:text-4xl">
                Ready to plan your next adventure?
              </h2>
              <p className="mt-3 max-w-md text-base font-medium leading-7 text-white/80">
                Tell us where you want to go, and let AI handle the rest.
              </p>
              <Link href="#hero" className="mt-7 inline-flex">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 rounded-xl bg-white px-7 py-3 text-sm font-black text-[var(--velora-ink)] shadow-lg transition hover:bg-[var(--velora-primary-soft)]"
                >
                  Generate My Trip
                  <ArrowRight className="size-4" />
                </motion.span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
