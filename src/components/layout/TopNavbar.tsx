"use client"
import React from "react"
import { Sparkles, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopNavbar({ meta, onGenerate, onOpenModal }: { meta: any; onGenerate: () => void; onOpenModal: () => void }) {
  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between gap-4 px-5 shrink-0 z-10">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 h-9 min-w-0 max-w-xl w-full">
          <Sparkles size={13} className="text-violet-500 shrink-0" />
          <span className="text-[13px] text-gray-400 truncate">Plan a 4-day trip to {meta.destination} for a couple</span>
        </div>
        <Button size="sm" className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white font-bold text-[13px] gap-2 h-9 hover:opacity-90 shrink-0" onClick={onGenerate}><Sparkles size={12} /> Generate Trip ✦</Button>
      </div>
      <div className="flex items-center gap-4 shrink-0">
        <div className="relative">
          <Bell size={18} className="text-gray-500 cursor-pointer" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=56&h=56&fit=crop&crop=face" alt="user" className="w-full h-full object-cover" />
          </div>
          <span className="text-[13px] font-semibold text-gray-700 whitespace-nowrap">Hi, Arjun ▾</span>
        </div>
      </div>
    </header>
  )
}
