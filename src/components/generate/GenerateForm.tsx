"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
    setSelectedInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirmRequest({ destination, duration, budget, interests: selectedInterests, style: selectedStyle, notes })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-xl p-5 max-w-md">
      {/* Header */}
      <div>
        <h1 className="text-lg font-bold text-gray-900">Generate your trip</h1>
        <p className="text-sm text-gray-500 mt-0.5">Tell us a few quick preferences.</p>
      </div>

      {/* Destination */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
          <MapPin size={12} /> Destination
        </label>
        <Input
          value={destination}
          onChange={e => setDestination(e.target.value)}
          required
          className="h-9 text-sm"
        />
      </div>

      {/* Duration + Budget */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Calendar size={12} /> Duration
          </label>
          <Select value={duration} onValueChange={setDuration}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3 Days / 2 Nights">3 Days / 2 Nights</SelectItem>
              <SelectItem value="4 Days / 3 Nights">4 Days / 3 Nights</SelectItem>
              <SelectItem value="5 Days / 4 Nights">5 Days / 4 Nights</SelectItem>
              <SelectItem value="7 Days / 6 Nights">7 Days / 6 Nights</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
            <Wallet size={12} /> Budget
          </label>
          <Input
            value={budget}
            onChange={e => setBudget(e.target.value)}
            required
            className="h-9 text-sm"
          />
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
          <Compass size={12} /> Interests
        </label>
        <div className="flex flex-wrap gap-1.5">
          {INTEREST_OPTIONS.map(interest => {
            const active = selectedInterests.includes(interest)
            return (
              <Button
                key={interest}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toggleInterest(interest)}
                className={`h-7 px-2.5 text-xs rounded-full transition-all ${active
                    ? "bg-violet-50 border-violet-300 text-violet-700 hover:bg-violet-100 hover:text-violet-700"
                    : "text-gray-600"
                  }`}
              >
                {interest}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Travel Style */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
          <Heart size={12} /> Travel Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STYLE_OPTIONS.map(style => (
            <Button
              key={style}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSelectedStyle(style)}
              className={`h-7 px-2.5 text-xs rounded-full transition-all ${selectedStyle === style
                  ? "bg-violet-600 border-violet-600 text-white hover:bg-violet-500 hover:text-white"
                  : "text-gray-600"
                }`}
            >
              {style}
            </Button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center gap-1.5">
          <MessageSquare size={12} /> Notes
        </label>
        <Textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          className="h-20 text-sm resize-none"
        />
      </div>

      {/* Single CTA */}
      <Button type="submit" className="w-full h-10 bg-violet-600 hover:bg-violet-500 text-white text-sm gap-2">
        <Sparkles size={14} />
        Generate Itinerary
      </Button>
    </form>
  )
}