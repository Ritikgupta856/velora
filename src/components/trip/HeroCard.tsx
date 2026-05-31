"use client"
import React from "react"
import { Sparkles, Calendar, Users, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroCard({ title, meta, onSave, onView }: { title: string; meta: any; onSave: () => void; onView: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="flex min-h-[220px]">
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Sparkles size={12} className="text-amber-400" />
              <span className="text-[11px] text-gray-400 font-semibold">Your AI Generated Trip</span>
            </div>
            <h1 className="text-[28px] font-black text-gray-900 mb-3 leading-none">{title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { icon: Calendar, text: meta.duration },
                { icon: Users, text: meta.travelers },
                { icon: Wallet, text: meta.budgetLabel },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5">
                  <Icon size={12} className="text-violet-500" />
                  <span className="text-[12px] font-semibold text-gray-600">{text}</span>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-sm">A perfect blend of adventure, culture, and relaxation — curated just for you.</p>
          </div>
          <div className="flex gap-2.5 mt-4">
            <Button size="sm" className="bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-[13px] gap-2 hover:opacity-90" onClick={onView}>
              View Full Itinerary
            </Button>
            <Button size="sm" variant="outline" onClick={onSave} className="text-[13px] gap-2 font-semibold">
              Save Trip
            </Button>
          </div>
        </div>
        <div className="w-72 relative overflow-hidden rounded-r-2xl shrink-0">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=440&fit=crop" alt="trip" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent" />
        </div>
      </div>
    </div>
  )
}
