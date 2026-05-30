"use client"

import React from "react"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-background py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 70, damping: 15 }}
          className="mx-auto overflow-hidden rounded-2xl border border-violet-300/35 bg-[#16072e] shadow-[0_24px_90px_rgba(124,58,237,0.18)]"
        >
          <div
            className="relative min-h-48 px-8 py-10 sm:px-12 sm:py-14"
            style={{
              backgroundImage: "url('/images/cta-bg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Ambient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(236,72,153,0.35),transparent_30%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center">
              <div>
                <h2 className="max-w-md text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                  Ready to plan your next adventure?
                </h2>

                <p className="mt-4 max-w-sm text-base leading-relaxed text-white/80">
                  Tell us where you want to go, and let AI handle the rest.
                </p>

                <Link href="/generate" className="inline-block mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex w-fit items-center gap-3 rounded-lg bg-white px-7 py-3 text-sm font-black text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur transition hover:bg-zinc-100 cursor-pointer"
                  >
                    Generate My Trip
                    <ArrowRight className="size-4" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
