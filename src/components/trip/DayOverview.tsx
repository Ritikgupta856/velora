"use client"
import React from "react"
import { Day } from "@/lib/trip/types"
import { cn } from "@/lib/utils"

export default function DayOverview({ days, activeDay, onSelect }: { days: Day[]; activeDay: number; onSelect: (i: number) => void }) {
  const dayIcons = days.map(d => d.icon)
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-black text-gray-900">Itinerary Overview</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {days.map((d, i) => {
          const Icon = d.icon || dayIcons[i % dayIcons.length]
          return (
            <div key={d.day} onClick={() => onSelect(i)} className={cn("shrink-0 w-[190px] rounded-xl border bg-white overflow-hidden cursor-pointer transition-all", activeDay === i ? "border-violet-300 shadow-md shadow-violet-100" : "border-gray-200 hover:border-violet-200 hover:shadow-sm")}>
              <div className="relative h-[100px]">
                <img src={d.activities[0]?.img || `https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=380&h=200&fit=crop`} alt={d.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="text-[10px] text-white/70 font-semibold">Day {d.day}</p>
                  <p className="text-[13px] font-black text-white">{d.title}</p>
                </div>
              </div>
              <div className="p-3">
                <ul className="space-y-1 mb-3">
                  {d.activities.slice(0, 4).map((a, j) => (
                    <li key={j} className="flex items-start gap-1.5 text-[11px] text-gray-500">
                      <span className="text-violet-400 mt-0.5 shrink-0">•</span>
                      <span className="leading-snug">{a.title}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-[10px] text-gray-400">Est.</span>
                  <span className="text-[12px] font-bold text-violet-600">{d.activities.find(a => a.cost !== "—")?.cost || "—"}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
