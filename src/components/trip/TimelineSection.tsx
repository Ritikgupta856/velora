"use client"
import React from "react"
import ActivityRow from "./ActivityRow"
import { Button } from "@/components/ui/button"
import { Edit, RefreshCw } from "lucide-react"
import { Day } from "@/lib/trip/types"

export default function TimelineSection({ day, loading }: { day: Day; loading: boolean }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
            {day.icon && <day.icon size={16} className="text-violet-600" />}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-500">Day {day.day}</p>
            <h3 className="text-[16px] font-black text-gray-900">{day.title}</h3>
          </div>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="text-[12px] gap-1.5 h-8"><Edit size={11} /> Edit Day</Button>
          <Button size="sm" variant="outline" className="text-[12px] gap-1.5 h-8 text-violet-600 border-violet-200 bg-violet-50 hover:bg-violet-100"><RefreshCw size={11} /> Regenerate</Button>
        </div>
      </div>
      <p className="text-[12px] text-gray-400 px-6 py-2">{day.subtitle}</p>
      <div className="px-6 py-4">
        {loading ? (
          <div className="flex items-center justify-center h-24 text-gray-400 text-sm">Loading activities…</div>
        ) : (
          day.activities.map((act, i) => (
            <ActivityRow key={i} act={act} isLast={i === day.activities.length - 1} />
          ))
        )}
      </div>
    </div>
  )
}
