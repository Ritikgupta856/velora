"use client"
import Link from "next/link"
import React from "react"

export default function Navbar() {
  return (
    <header className="w-full py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          Velora
        </Link>
        <nav>
          <ul className="flex gap-4">
            <li><Link href="#destinations">Destinations</Link></li>
            <li><Link href="#features">Features</Link></li>
            <li><Link href="#testimonials">Testimonials</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
