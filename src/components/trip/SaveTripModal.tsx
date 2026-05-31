"use client"
import React from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SaveTripModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-3xl border-gray-200 shadow-2xl">
        <DialogHeader className="items-center text-center">
          <div className="w-14 h-14 rounded-2xl mx-auto mb-2 bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200">
            <Bookmark size={24} className="text-white" />
          </div>
          <DialogTitle className="text-xl font-black text-gray-900">Save your trip</DialogTitle>
          <DialogDescription className="text-[13px] text-gray-500 leading-relaxed text-center">
            Sign up free to save this itinerary, access it anywhere, and share it with travel buddies.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2.5 mt-2">
          <Button className="w-full h-11 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold gap-2 hover:opacity-90">
            Sign up — it's free
          </Button>
          <Button variant="outline" className="w-full h-10 text-[13px] font-semibold">
            Already have an account? Log in
          </Button>
        </div>
        <p className="text-[11px] text-gray-400 text-center mt-1">No credit card · Cancel anytime · Free forever</p>
      </DialogContent>
    </Dialog>
  )
}
