import React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import TripSidebar from "@/components/TripSidebar"

export default function TripsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex h-screen w-full bg-gray-50 text-gray-900 font-sans overflow-hidden">
        <TripSidebar />
        <main className="flex-1 min-w-0 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
