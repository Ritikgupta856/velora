"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, Navigation, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Destinations", href: "#destinations" },
  { label: "How it works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Blog", href: "#" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
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
          <Link
            href="#hero"
            className="hidden rounded-2xl bg-white/60 px-5 py-3 text-sm font-black text-[var(--velora-primary-deep)] shadow-sm ring-1 ring-white/80 backdrop-blur-xl transition hover:bg-white md:inline-flex"
          >
            Log in
          </Link>
          <Link
            href="#hero"
            className="hidden rounded-2xl bg-[var(--velora-primary)] px-6 py-3 text-sm font-black text-white shadow-[0_16px_36px_rgb(109_53_255_/_28%)] transition hover:bg-[var(--velora-primary-deep)] md:inline-flex"
          >
            Sign up
          </Link>

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
              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="#hero"
                  className="rounded-2xl bg-white px-4 py-3 text-center text-sm font-black text-[var(--velora-primary-deep)]"
                >
                  Log in
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  href="#hero"
                  className="rounded-2xl bg-[var(--velora-primary)] px-4 py-3 text-center text-sm font-black text-white"
                >
                  Sign up
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
