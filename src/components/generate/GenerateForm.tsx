"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Wallet, Compass, Heart, MessageSquare, Sparkles } from "lucide-react"

const INTEREST_OPTIONS = ["Beaches", "Nightlife", "Cafes", "Adventure", "Shopping", "Nature"]
const STYLE_OPTIONS = ["Budget", "Luxury", "Backpacking", "Family", "Romantic"]

export type GenerateFormData = {
  destination: string
  duration: string
  budget: string
  interests: string[]
  style: string
  notes: string
}

type Props = {
  initial?: Partial<GenerateFormData>
  onConfirmRequest: (data: GenerateFormData) => void
}

export default function GenerateForm({ initial = {}, onConfirmRequest }: Props) {
  const [destination, setDestination] = useState(initial.destination || "Goa, India")
  const [duration, setDuration] = useState(initial.duration || "4 Days / 3 Nights")
  const [budget, setBudget] = useState(initial.budget || "₹25,000")
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initial.interests || ["Beaches", "Nightlife", "Cafes"])
  const [selectedStyle, setSelectedStyle] = useState(initial.style || "Budget")
  const [notes, setNotes] = useState(initial.notes || "I love sunsets, beach cafes and nightlife.")

  const toggleInterest = (interest: string) =>
    setSelectedInterests(prev => (prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirmRequest({ destination, duration, budget, interests: selectedInterests, style: selectedStyle, notes })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-xl p-4">
      <div className="space-y-2">
        <h1 className="text-lg font-bold text-gray-900">Generate your trip</h1>
        <p className="text-sm text-gray-600">Tell us a few quick preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="space-y-1">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><MapPin size={12} /> Destination</label>
          <Input value={destination} onChange={e => setDestination(e.target.value)} required className="h-10 text-sm" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><Calendar size={12} /> Duration</label>
            <select value={duration} onChange={e => setDuration(e.target.value)} className="h-10 w-full rounded-md border border-gray-200 px-2 text-sm">
              <option value="3 Days / 2 Nights">3 Days / 2 Nights</option>
              <option value="4 Days / 3 Nights">4 Days / 3 Nights</option>
              <option value="5 Days / 4 Nights">5 Days / 4 Nights</option>
              <option value="7 Days / 6 Nights">7 Days / 6 Nights</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><Wallet size={12} /> Budget</label>
            <Input value={budget} onChange={e => setBudget(e.target.value)} required className="h-10 text-sm" />
          </div>
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><Compass size={12} /> Interests</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {INTEREST_OPTIONS.map(i => {
            const s = selectedInterests.includes(i)
            return (
              <button key={i} type="button" onClick={() => toggleInterest(i)} className={`px-2 py-1 rounded-md text-sm border ${s ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-white border-gray-200 text-gray-600'}`}>
                {i}
              </button>
            )
          })}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><Heart size={12} /> Travel Style</label>
        <div className="flex gap-2 mt-2">
          {STYLE_OPTIONS.map(s => (
            <button key={s} type="button" onClick={() => setSelectedStyle(s)} className={`px-2 py-1 rounded-md text-sm border ${selectedStyle === s ? 'bg-violet-600 text-white' : 'bg-white border-gray-200 text-gray-600'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-gray-600 flex items-center gap-2"><MessageSquare size={12} /> Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full rounded-md border border-gray-200 p-2 h-20 text-sm text-gray-700" />
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1 h-10 bg-violet-600 hover:bg-violet-500 text-white text-sm">Request</Button>
        <Button type="button" onClick={() => onConfirmRequest({ destination, duration, budget, interests: selectedInterests, style: selectedStyle, notes })} className="h-10 bg-white border border-gray-200 text-sm">Preview</Button>
      </div>
    </form>
  )
}
