"use client"
import React from "react"
import { Heart, Star } from "lucide-react"
import { Activity } from "@/lib/trip/types"

export default function RecommendedPlaces({ activities }: { activities: Activity[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-black text-gray-900">Recommended Places</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {activities.slice(0, 6).map((act, i) => (
          <div key={i} className="relative shrink-0 w-36 h-28 rounded-xl overflow-hidden cursor-pointer">
            <img src={act.img || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=280&h=220&fit=crop"} alt={act.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-xl" />
            <button className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
              <Heart size={10} className="text-red-500" />
            </button>
            <div className="absolute bottom-2 left-2 right-2">
              <p className="text-[10px] font-bold text-white leading-tight">{act.title}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={8} className="text-amber-400 fill-amber-400" />
                <span className="text-[9px] text-white/80 font-semibold">4.8</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
