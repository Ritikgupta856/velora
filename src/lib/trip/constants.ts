import { Day, BudgetItem } from "./types"
import { Sun, Waves, Camera, Sunrise, Hotel, Utensils, Navigation, Camera as Cam, ShoppingBag } from "lucide-react"

export const BUDGET_COLORS = ["#6366f1", "#06b6d4", "#f59e0b", "#10b981", "#a78bfa"]

export const TAG_STYLES: Record<string, string> = {
  violet: "bg-violet-100 text-violet-700 border border-violet-200",
  teal: "bg-teal-100 text-teal-700 border border-teal-200",
  green: "bg-green-100 text-green-700 border border-green-200",
  amber: "bg-amber-100 text-amber-700 border border-amber-200",
}

export const DAYS_FALLBACK: Day[] = [
  {
    day: 1, title: "North Goa Vibes", subtitle: "Beaches, nightlife and iconic spots", icon: Sun,
    activities: [],
  },
  { day: 2, title: "South Goa Serenity", subtitle: "Peaceful beaches and hidden gems", icon: Waves, activities: [] },
  { day: 3, title: "Culture & Heritage", subtitle: "Markets, forts, and Portuguese history", icon: Camera, activities: [] },
  { day: 4, title: "Beach Day & Goodbyes", subtitle: "Spice farm tour and departure", icon: Sunrise, activities: [] },
]

export const BUDGET_FALLBACK: BudgetItem[] = [
  { label: "Stay (3 Nights)", amount: "₹9,000", icon: Hotel },
  { label: "Food", amount: "₹6,000", icon: Utensils },
  { label: "Transport", amount: "₹4,000", icon: Navigation },
  { label: "Activities", amount: "₹3,000", icon: Cam },
  { label: "Miscellaneous", amount: "₹2,800", icon: ShoppingBag },
]

export const MAP_PINS_FALLBACK = [
  { label: "Baga Beach", top: "18%", left: "26%" },
  { label: "Anjuna Beach", top: "36%", left: "50%" },
  { label: "Fontainhas", top: "55%", left: "42%" },
  { label: "Tito's Lane", top: "72%", left: "58%" },
]
