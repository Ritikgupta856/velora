"use client"

import React, { useState, useEffect } from "react"
import { Plane, Send, Sun, Moon } from "lucide-react"
import Link from "next/link"

const columns = [
  { title: "Product", links: ["Features", "How it works", "Pricing", "Updates"] },
  { title: "Company", links: ["About us", "Blog", "Careers", "Contact"] },
  { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Refund Policy"] },
]

export default function Footer() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Initial check
    const isDarkClass = document.documentElement.classList.contains("dark")
    setIsDark(isDarkClass)
  }, [])

  const toggleTheme = () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      setIsDark(true)
    }
  }

  return (
    <footer className="bg-background py-16 sm:py-20 text-muted-foreground border-t border-border/40 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr_1.4fr]">
          {/* Logo Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 text-foreground">
              <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-[0_0_28px_rgba(139,92,246,0.3)]">
                <Plane className="size-5 -rotate-45 fill-white text-primary" />
              </span>
              <span className="text-2xl font-black tracking-tight text-foreground">Velora</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Your intelligent AI travel companion for crafting unforgettable, personalized journeys in seconds.
            </p>
          </div>

          {/* Links Column */}
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title} className="space-y-4">
                <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">{column.title}</h3>
                <ul className="space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition duration-200 hover:text-foreground">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground tracking-wide uppercase">Stay in the loop</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Get travel inspiration, route schedules, and exclusive updates.
            </p>
            <form className="flex rounded-xl border border-border/60 bg-muted/40 p-1 transition focus-within:border-violet-500/50">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-10 shrink-0 place-items-center rounded-lg bg-violet-600 text-primary transition hover:bg-violet-500 active:scale-95 cursor-pointer"
              >
                <Send className="size-4 fill-white text-primary" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-muted-foreground/80">
          <div className="flex items-center gap-4">
            <p>© {new Date().getFullYear()} Velora. All rights reserved.</p>
            <button
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/40 border border-border hover:text-foreground hover:bg-muted/80 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                <>
                  <Sun className="size-3 text-amber-500" />
                  <span>Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="size-3 text-violet-500" />
                  <span>Dark Mode</span>
                </>
              )}
            </button>
          </div>
          <div className="flex gap-6 font-medium">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
