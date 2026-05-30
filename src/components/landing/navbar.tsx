"use client"
import Link from "next/link"
import React, { useState, useEffect } from "react"
import { Plane, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 border-b border-gray-100 py-4 backdrop-blur-xl shadow-sm"
        : "bg-transparent py-4"
        }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 ">
            <Plane className="size-5 -rotate-45 fill-white" />
          </span>
          <span className="text-2xl font-black tracking-tight text-gray-900">Velora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="hidden items-center gap-10 text-sm font-semibold text-gray-600 lg:flex">
            <li><Link className="transition hover:text-gray-900" href="#features">Features</Link></li>
            <li><Link className="transition hover:text-gray-900" href="#destinations">Destinations</Link></li>
            <li><Link className="transition hover:text-gray-900" href="#how">How it works</Link></li>
            <li><Link className="transition hover:text-gray-900" href="#pricing">Pricing</Link></li>
          </ul>
        </nav>

        {/* Action Buttons & Hamburger */}
        <div className="flex items-center gap-6">
          <Link href="#hero" className="hidden text-sm font-semibold text-gray-600 transition hover:text-gray-900 md:inline-flex">
            Login
          </Link>
          <Link href="#" className="hidden rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-violet-500 md:inline-flex">Sign up</Link>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex size-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600 transition hover:bg-gray-200 hover:text-gray-900 lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-100 bg-white backdrop-blur-2xl lg:hidden"
          >
            <div className="px-4 py-6 sm:px-6">
              <nav className="flex flex-col gap-4">
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-700 transition hover:text-gray-900 py-2 border-b border-gray-100"
                  href="#features"
                >
                  Features
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-700 transition hover:text-gray-900 py-2 border-b border-gray-100"
                  href="#destinations"
                >
                  Destinations
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-700 transition hover:text-gray-900 py-2 border-b border-gray-100"
                  href="#how"
                >
                  How it works
                </Link>
                <Link
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-semibold text-gray-700 transition hover:text-gray-900 py-2 border-b border-gray-100"
                  href="#pricing"
                >
                  Pricing
                </Link>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    href="#hero"
                    className="w-full text-center py-3 text-sm font-semibold text-gray-700 border border-gray-200 rounded-xl transition hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => setIsMobileMenuOpen(false)}
                    href="#"
                    className="w-full text-center py-3 text-sm font-semibold text-primary bg-violet-600 rounded-xl transition hover:bg-violet-500"
                  >
                    Sign up
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
