"use client"
import React from "react"
import { MessageSquare, Bot } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AITravelAssistant() {
  return (
    <div className="px-4 py-4 border rounded-2xl border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <h3 className="text-[13px] font-black text-violet-600 mb-1.5">AI Travel Assistant</h3>
          <p className="text-[12px] text-gray-500 leading-snug">Ask anything about your trip, I'm here to help!</p>
          <Button size="sm" variant="outline" className="mt-2.5 text-[12px] gap-1.5 h-8"><MessageSquare size={12} /> Chat Now</Button>
        </div>
        <div className="w-14 h-14 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center shrink-0">
          <Bot size={26} className="text-violet-500" />
        </div>
      </div>
    </div>
  )
}
