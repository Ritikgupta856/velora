"use client"

import React from "react"
import { ArrowRight, MapPin } from "lucide-react"
import { motion } from "framer-motion"

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
    name: "Manali",
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 14,
    },
  },
}

export default function Destinations() {
  return (
    <section id="destinations" className="bg-[#020612] py-24 text-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400"
            >
              <MapPin className="size-4 fill-violet-500/20 text-violet-400" />
              Popular Destinations
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Explore places loved by travelers
            </motion.h2>
          </div>
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex w-fit items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-violet-500/40 hover:bg-white/10"
          >
            View all destinations
            <ArrowRight className="size-4" />
          </motion.button>
        </div>

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
              whileHover={{ y: -6 }}
              className="group relative h-80 overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] shadow-lg transition-all duration-300 hover:border-violet-500/25"
            >
              <img
                src={destination.image}
                alt={`${destination.name} destination`}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                <h3 className="text-xl font-bold tracking-tight text-white">{destination.name}</h3>
                <p className="mt-2 text-xs text-zinc-300 leading-normal">{destination.meta}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
