"use client"
import React from "react"
import { Clock, Wallet } from "lucide-react"
import { Tag } from "./tags"
import { Activity } from "@/lib/trip/types"
import { cn } from "@/lib/utils"

export default function ActivityRow({ act, isLast }: { act: Activity; isLast: boolean }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_0_3px_rgba(124,58,237,0.15)] mt-1 shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-gray-200 mt-1.5 min-h-[20px]" />}
      </div>
      <div className={cn("flex-1 min-w-0", isLast ? "pb-0" : "pb-6")}>
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <div>
            <p className="text-[11px] text-violet-500 mb-0.5">{act.time}</p>
            <h4 className="text-[15px] font-bold text-gray-900 leading-snug">{act.title}</h4>
          </div>
          <Tag label={act.tag} color={act.tagColor} />
        </div>
        <p className="text-[13px] text-gray-500 mb-3 leading-relaxed">{act.desc}</p>
        <div className="flex items-center gap-4">
          {act.img && (
            <img src={act.img} alt={act.title} className="w-28 h-16 object-cover rounded-lg border border-gray-200 shrink-0" />
          )}
          <div className="flex gap-4">
            {act.duration !== "—" && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock size={11} /> {act.duration}
              </div>
            )}
            {act.cost !== "—" && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Wallet size={11} /> {act.cost}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
