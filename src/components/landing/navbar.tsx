"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Menu, Navigation, X, LogOut, LayoutDashboard, ChevronDown, User } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { useSession, signOut } from "@/lib/auth-client"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Destinations", href: "#destinations" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
]

function UserMenu() {
  const { data: session, isPending } = useSession()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  if (isPending) {
    return <div className="hidden h-10 w-28 animate-pulse rounded-2xl bg-white/40 md:flex" />
  }

  if (!session?.user) {
    return (
      <div className="hidden items-center gap-3 md:flex">
        <Link
          href="/login"
          className="rounded-lg bg-white/60 px-5 py-3 text-sm font-black text-[var(--velora-primary-deep)] shadow-sm ring-1 ring-white/80 backdrop-blur-xl transition hover:bg-white"
        >
          Log in
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-[var(--velora-primary)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_36px_rgb(109_53_255_/_28%)] transition hover:bg-[var(--velora-primary-deep)]"
        >
          Sign up
        </Link>
      </div >
    )
  }

  const user = session.user
  const displayName = user.name || "Guest"
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        id="user-menu-trigger"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2.5 rounded-2xl bg-white/70 px-3 py-2 shadow-sm ring-1 ring-white/80 backdrop-blur-xl transition hover:bg-white"
        type="button"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={displayName}
            width={30}
            height={30}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="grid size-[30px] place-items-center rounded-full bg-[var(--velora-primary)] text-[11px] font-black text-white">
            {initials}
          </span>
        )}
        <span className="max-w-[110px] truncate text-sm font-bold text-[var(--velora-ink)]">
          {displayName}
        </span>
        <ChevronDown
          className={`size-3.5 text-[var(--velora-ink-soft)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 overflow-hidden rounded-2xl border border-[var(--velora-line)] bg-white shadow-xl"
          >
            <div className="border-b border-[var(--velora-line)] px-4 py-3">
              <div className="flex items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={displayName}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="grid size-10 place-items-center rounded-full bg-[var(--velora-primary)] text-sm font-black text-white">
                    {initials}
                  </span>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[var(--velora-ink)]">{displayName}</p>
                  {user.email && (
                    <p className="truncate text-xs text-[var(--velora-ink-soft)]">{user.email}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="p-2">
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--velora-ink)] transition hover:bg-[var(--velora-primary)]/8 hover:text-[var(--velora-primary)]"
              >
                <LayoutDashboard className="size-4" />
                Dashboard
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--velora-ink)] transition hover:bg-[var(--velora-primary)]/8 hover:text-[var(--velora-primary)]"
              >
                <User className="size-4" />
                Profile
              </Link>
            </div>

            <div className="border-t border-[var(--velora-line)] p-2">
              <button
                onClick={async () => {
                  await signOut()
                  setOpen(false)
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50"
                type="button"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
        ? "border-b border-[var(--velora-line)]/80 bg-[var(--velora-shell)]/88 py-3 shadow-[0_14px_50px_rgb(48_28_112_/_8%)] backdrop-blur-2xl"
        : "bg-transparent py-5"
        }`}
    >
      <div className="velora-container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-[var(--velora-primary)] shadow-[0_14px_32px_rgb(109_53_255_/_28%)]">
            <Navigation className="size-4 -rotate-45 fill-white text-white" />
          </span>
          <span className="text-2xl font-black tracking-[-0.04em] text-[var(--velora-ink)]">Velora</span>
        </Link>

        <nav className="hidden lg:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-11 text-sm font-bold text-[var(--velora-ink-soft)]">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link className="transition hover:text-[var(--velora-primary)]" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <UserMenu />

          <button
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-2xl bg-white/80 text-[var(--velora-ink)] shadow-sm ring-1 ring-[var(--velora-line)] lg:hidden"
            aria-label="Toggle menu"
            type="button"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-[var(--velora-line)]/70 bg-[var(--velora-shell)]/96 backdrop-blur-2xl lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 sm:px-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-2xl px-4 py-3 text-base font-bold text-[var(--velora-ink-soft)] transition hover:bg-white hover:text-[var(--velora-primary)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
              {session?.user ? (
                <div className="mt-3 border-t border-[var(--velora-line)] pt-3">
                  <div className="mb-2 px-2 text-sm font-bold text-[var(--velora-ink)]">
                    {session.user.name || "Guest"}
                  </div>
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    href="/dashboard"
                    className="flex items-center gap-2 rounded-2xl bg-[var(--velora-primary)]/10 px-4 py-3 text-sm font-bold text-[var(--velora-primary)]"
                  >
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={async () => { await signOut(); setIsMobileMenuOpen(false) }}
                    className="mt-2 flex w-full items-center gap-2 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-500"
                    type="button"
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    href="/login"
                    className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-[var(--velora-primary-deep)]"
                  >
                    Log in
                  </Link>
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    href="/sign-up"
                    className="rounded-2xl bg-[var(--velora-primary)] px-4 py-3 text-center text-sm font-black text-white"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
