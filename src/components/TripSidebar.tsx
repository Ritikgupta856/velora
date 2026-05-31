"use client"

import React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Navigation,
  Plus,
  Bookmark,
  Compass,
  List,
  Map,
  Search,
  MessageSquare,
  User,
  Settings,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { icon: Compass, label: "Explore", href: "/explore" },
  { icon: List, label: "Trips", href: "/trips" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Map, label: "Itineraries", href: "/itineraries" },
  { icon: Search, label: "Discover", href: "/discover" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

export default function TripSidebar({
  onCreateNewTrip,
}: {
  onCreateNewTrip?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Sidebar className="border-r border-gray-200 bg-white shrink-0">
      <SidebarHeader className="px-3 pt-4 pb-2">
        <div className="flex items-center gap-2 px-1">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-500 flex items-center justify-center shrink-0">
            <Navigation size={14} className="text-white" />
          </div>

          <div>
            <p className="text-lg font-black text-gray-900 leading-none">
              Velora
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-3">
              {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
                const isActive = pathname === href

                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => router.push(href)}
                      className={cn(
                        "gap-3 h-10 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-violet-50 text-violet-700 font-semibold"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      <Icon size={16} />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4 space-y-3">
        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 p-4 text-white relative overflow-hidden">
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full" />

          <div className="absolute top-2 right-3 text-2xl">✈️</div>

          <p className="text-[14px] font-black leading-snug mb-1">
            Plan smarter.
            <br />
            Travel better.
          </p>

          <p className="text-[11px] text-white/70 mb-3">
            AI is your guide.
          </p>

          <Button
            size="sm"
            variant="outline"
            onClick={() => onCreateNewTrip?.()}
            className="w-full bg-white/15 border-white/30 text-white hover:bg-white/25 hover:text-white text-[11px] font-bold h-8"
          >
            <Plus size={11} />
            Create New Trip ✦
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}