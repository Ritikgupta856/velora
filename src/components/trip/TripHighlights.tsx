"use client"
import React from "react"
import { highlightIcon } from "@/lib/trip/helpers"

export default function TripHighlights({ highlights }: { highlights: { label: string; icon?: any }[] }) {
  return (
    <div className="px-4 py-4 border-b border-gray-100">
      <h3 className="text-[14px] font-black text-gray-900 mb-3">Trip Highlights</h3>
      <div className="grid grid-cols-5 gap-2">
        {highlights.map(({ label, icon: Icon }) => (
          <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl p-2">
            <div className="w-8 h-8 rounded-lg bg-violet-50 border border-violet-100 flex items-center justify-center">
              {Icon ? <Icon size={14} className="text-violet-500" /> : <span className="text-violet-500">•</span>}
            </div>
            <span className="text-[9px] font-bold text-gray-500 text-center leading-tight">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
