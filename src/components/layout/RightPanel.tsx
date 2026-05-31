"use client"
import React from "react"
import TripMap from "@/components/trip/TripMap"
import BudgetChart from "@/components/trip/BudgetChart"
import AITravelAssistant from "@/components/trip/AITravelAssistant"
import TripHighlights from "@/components/trip/TripHighlights"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function RightPanel({ pins, budget, totalCost, highlights, onOpenModal }: any) {
  return (
    <aside className="w-[420px] shrink-0 border-l border-gray-100 bg-white flex flex-col overflow-y-auto scrollbar-hide">
      <TripMap pins={pins} />
      <div className="px-4 py-4 border rounded-2xl border-gray-200 mb-4">
        <h3 className="text-[14px] font-black text-gray-900 mb-3">Budget Breakdown</h3>
        <BudgetChart budget={budget} totalCost={totalCost} />
      </div>
      <div className="px-4 py-4 border rounded-2xl border-gray-200 mb-4">
        <AITravelAssistant />
      </div>
      <TripHighlights highlights={highlights} />

      <div className="mt-auto border-t border-gray-100 bg-white px-4 py-3 flex items-center justify-between gap-3 sticky bottom-0">
        <div className="flex items-center gap-2">
          <Lock size={12} className="text-violet-500 shrink-0" />
          <span className="text-[11px] text-gray-500"><button onClick={() => onOpenModal(true)} className="text-violet-600 font-bold hover:text-violet-700">Login</button> to save this trip</span>
        </div>
        <Button size="sm" onClick={() => onOpenModal(true)} className="bg-gradient-to-r from-violet-600 to-purple-500 text-white text-[12px] font-bold h-8 shrink-0 hover:opacity-90">Sign up free</Button>
      </div>
    </aside>
  )
}
