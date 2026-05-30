import React from "react"

export default function Features() {
  const items = [
    {title: "Curated Trips", desc: "Unique experiences picked by experts."},
    {title: "Flexible Booking", desc: "Easy changes and cancellations."},
    {title: "24/7 Support", desc: "We're here whenever you need us."},
  ]

  return (
    <section id="features" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Why Velora</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((it) => (
            <div key={it.title} className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-gray-600">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
