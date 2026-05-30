import React from "react"

export default function Testimonials() {
  const sample = [
    {name: "Asha", quote: "Best trip of my life."},
    {name: "Liam", quote: "Seamless booking and great guides."},
  ]
  return (
    <section id="testimonials" className="py-16">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">What travelers say</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {sample.map((s) => (
            <blockquote key={s.name} className="p-4 bg-white rounded shadow-sm">
              <p className="text-gray-800">“{s.quote}”</p>
              <footer className="mt-2 text-sm text-gray-600">— {s.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
