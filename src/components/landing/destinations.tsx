"use client"

import { ArrowRight, ChevronRight, MapPin } from "lucide-react"
import { motion, Variants } from "framer-motion"

const destinations = [
  {
    name: "Goa",
    meta: "Beaches • Nightlife • Relaxation",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Bali",
    meta: "Temples • Nature • Adventure",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Switzerland",
    meta: "Mountains • Snow • Adventure",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Jaipur",
    meta: "Heritage • Culture • Shopping",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=700&q=85",
  },
  {
    name: "Dubai",
    meta: "Luxury • Shopping • Adventure",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=85",
  },
]

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
}

export default function Destinations() {
  return (
    <section id="destinations" className="velora-section bg-[var(--velora-shell)]">
      <div className="velora-container">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="velora-eyebrow inline-flex items-center gap-2"
            >
              <MapPin className="size-4 fill-[var(--velora-primary-soft)]" />
              Popular Destinations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-black tracking-[-0.05em] text-[var(--velora-ink)] sm:text-5xl"
            >
              Explore places loved by travelers
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ x: 3 }}
            className="inline-flex w-fit items-center gap-3 rounded-full px-2 py-2 text-sm font-black text-[var(--velora-ink)] transition hover:text-[var(--velora-primary)]"
            type="button"
          >
            View all destinations
            <ArrowRight className="size-4" />
          </motion.button>
        </div>

        <div className="relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5"
          >
            {destinations.map((destination) => (
              <motion.article
                key={destination.name}
                variants={itemVariants}
                whileHover={{ y: -7 }}
                className="group relative h-72 overflow-hidden rounded-2xl shadow-[var(--velora-shadow)] ring-1 ring-white/80"
              >
                <img
                  src={destination.image}
                  alt={`${destination.name} destination`}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-xl font-black tracking-[-0.03em] text-white">{destination.name}</h3>
                  <p className="mt-2 text-xs font-semibold leading-normal text-white/80">{destination.meta}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <button
            type="button"
            aria-label="Next destinations"
            className="absolute -right-5 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white text-[var(--velora-primary)] shadow-[var(--velora-shadow)] ring-1 ring-[var(--velora-line)] transition hover:scale-105 lg:grid"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
