import React from "react"

export default function Destinations() {
  const sample = ["Paris", "Tokyo", "Reykjavik", "Marrakesh"]
  return (
    <section id="destinations" className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Destinations</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sample.map((d) => (
            <li key={d} className="rounded-lg p-4 bg-white shadow-sm text-center">{d}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
