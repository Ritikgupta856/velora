"use client"
import React from "react"
import { ZoomIn, ZoomOut, Crosshair } from "lucide-react"

export default function TripMap({ pins }: { pins: { label: string; top: string; left: string }[] }) {
  return (
    <div className="relative h-[200px] bg-slate-800 shrink-0 overflow-hidden mb-4">
      <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=640&h=400&fit=crop" alt="map" className="w-full h-full object-cover opacity-60" />
      <div className="absolute inset-0 bg-sky-200/30" />
      <div className="absolute top-2.5 left-2.5 bg-white rounded-lg px-2.5 py-1 text-[12px] font-bold text-gray-800 shadow-sm border border-gray-200">Trip Map</div>
      {pins.map((pin, i) => (
        <div key={i} className="absolute flex items-center gap-1.5" style={{ top: pin.top, left: pin.left }}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-600 shadow-lg" />
          </span>
          <span className="text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded whitespace-nowrap">{pin.label}</span>
        </div>
      ))}
      <div className="absolute bottom-2.5 left-2.5 flex flex-col gap-0.5">
        {[ZoomIn, ZoomOut, Crosshair].map((Icon, i) => (
          <button key={i} className="w-6 h-6 rounded border border-white/20 bg-black/50 text-white/70 flex items-center justify-center hover:text-white transition-all">
            <Icon size={11} />
          </button>
        ))}
      </div>
    </div>
  )
}
