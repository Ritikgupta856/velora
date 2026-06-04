"use client"

import React, { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
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
  LogOut,
  ChevronsUpDown,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
import { useSession, signOut } from "@/lib/auth-client"

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
  const [isGenerating, setIsGenerating] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

  // Listen for generating state changes
  useEffect(() => {
    const checkGenerating = () => {
      const isGen = window.sessionStorage.getItem("velora-is-generating") === "true"
      setIsGenerating(isGen)
    }
    
    checkGenerating()
    
    // Listen to storage changes
    const interval = setInterval(checkGenerating, 100)
    return () => clearInterval(interval)
  }, [])

  // Don't show sidebar while generating
  if (isGenerating) return null

  const user = session?.user
  const displayName = user?.name || "Guest"
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

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

      <SidebarFooter className="px-3 pb-2.5 space-y-2">
        {/* Promo card */}
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

        {/* User Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-full text-left rounded-2xl border border-gray-100 bg-gray-50 p-3 hover:bg-gray-100/80 transition-colors focus:outline-hidden"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Avatar */}
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={displayName}
                    width={36}
                    height={36}
                    className="rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-black shrink-0">
                    {initials}
                  </div>
                )}

                {/* Name & email */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-gray-900 truncate leading-none mb-0.5">
                    {displayName}
                  </p>
                  {user?.email && (
                    <p className="text-[11px] text-gray-400 truncate leading-none">
                      {user.email}
                    </p>
                  )}
                </div>

                <ChevronsUpDown className="shrink-0 size-4 text-gray-400" />
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="top"
            align="end"
            className="w-[240px] p-2 bg-white border border-gray-100 shadow-lg rounded-2xl"
          >
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <User size={16} className="text-gray-400" />
              <span>Profile</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem
              onClick={() => router.push("/settings")}
              className="gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <Settings size={16} className="text-gray-400" />
              <span>Settings</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-1 border-gray-100" />

            <DropdownMenuItem
              onClick={() => signOut({ fetchOptions: { onSuccess: () => router.push("/") } })}
              className="gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  )
}