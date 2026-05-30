"use client"

import Link from "next/link"
import { Navigation, Send } from "lucide-react"

const columns = [
  { title: "Product", links: ["Features", "How it works", "Pricing", "Updates"] },
  { title: "Company", links: ["About us", "Blog", "Careers", "Contact"] },
  { title: "Support", links: ["Help Center", "Privacy Policy", "Terms of Service", "Refund Policy"] },
]

const socials = ["ig", "x", "yt"]

export default function Footer() {
  return (
    <footer className="rounded-t-[2rem] bg-[var(--velora-footer)] py-12 text-white sm:py-14">
      <div className="velora-container px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_2fr_1.35fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-full bg-[var(--velora-primary)]">
                <Navigation className="size-4 -rotate-45 fill-white text-white" />
              </span>
              <span className="text-2xl font-black tracking-[-0.04em]">Velora</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm font-medium leading-7 text-white/60">
              Your intelligent AI travel companion for unforgettable, personalized journeys in seconds.
            </p>
            <div className="mt-5 flex gap-3">
              {socials.map((social) => (
                <a key={social} href="#" className="grid size-9 place-items-center rounded-full bg-white/10 text-[11px] font-black uppercase text-white/70 transition hover:bg-white/15 hover:text-white" aria-label={`Velora ${social} link`}>
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white">{column.title}</h3>
                <ul className="mt-5 space-y-3 text-sm font-medium text-white/60">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="transition hover:text-white">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white">Stay in the loop</h3>
            <p className="mt-5 text-sm font-medium leading-7 text-white/60">
              Get travel inspiration, exclusive deals, and smart travel tips.
            </p>
            <form className="mt-5 flex rounded-2xl bg-white/10 p-1.5 ring-1 ring-white/10 transition focus-within:ring-[var(--velora-primary)]">
              <input
                type="email"
                required
                aria-label="Email address"
                placeholder="Enter your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm font-semibold text-white outline-none placeholder:text-white/40"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-[var(--velora-primary)] text-white transition hover:bg-[var(--velora-primary-deep)]"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 text-xs font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Velora. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-white">Privacy Policy</a>
            <a href="#" className="transition hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
