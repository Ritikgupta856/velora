"use client"
import React from "react"
import { Navigation } from "lucide-react"
import { StreamStatus } from "@/lib/trip/types"

export default function StreamingScreen({ status }: { status: StreamStatus }) {
  const progress = Math.min(Math.round(status.progress || 0), 100)
  const steps = [
    "Understanding destination",
    "Balancing route and budget",
    "Writing day-by-day plan",
    "Preparing itinerary view",
  ]
  const activeStep = Math.min(Math.floor(progress / 25), steps.length - 1)

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      <div className="flex items-center px-6 h-16 border-b border-gray-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center">
            <Navigation size={14} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900 leading-none">Velora</p>
          </div>
        </div>
      </div>
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-lg rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-600">Generating itinerary</p>
              <h1 className="mt-3 text-2xl font-black tracking-tight text-gray-900">{status.title || "Building your trip"}</h1>
              <p className="mt-2 text-sm leading-6 text-gray-500">{status.message || "Crafting a personalized day-by-day plan."}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-right shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400">Progress</p>
              <p className="mt-1 text-2xl font-black text-gray-900">{progress}%</p>
            </div>
          </div>
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-teal-500 transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-6 space-y-3">
            {steps.map((step, index) => {
              const done = index < activeStep
              const active = index === activeStep
              return (
                <div key={step} className="flex items-center gap-3">
                  <div className={[
                    "flex h-7 w-7 items-center justify-center rounded-full border text-xs font-black",
                    done ? "border-teal-200 bg-teal-50 text-teal-700"
                      : active ? "border-gray-900 bg-gray-900 text-white"
                        : "border-gray-200 bg-white text-gray-400"
                  ].join(" ")}>
                    {done ? "✓" : index + 1}
                  </div>
                  <span className={["text-sm font-semibold",
                    active ? "text-gray-900" : done ? "text-teal-700" : "text-gray-400"
                  ].join(" ")}>{step}</span>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
