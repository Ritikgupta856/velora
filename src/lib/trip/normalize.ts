import { TripResponse, Day } from "./types"
import { getImageForActivity, getBudgetIcon, getTagColor } from "./helpers"
import { Sun, Waves, Camera, Sunrise } from "lucide-react"

export function normalizeTripResponse(payload?: TripResponse | null) {
  if (!payload?.days?.length) return null
  return {
    title: payload.title || "Your AI Trip",
    days: payload.days.map((day, index): Day => ({
      day: day.day || index + 1,
      title: day.title || `Day ${index + 1}`,
      subtitle: day.subtitle || "Curated places and experiences for the day",
      icon: [Sun, Waves, Camera, Sunrise][index % 4],
      activities: (day.activities || []).map((a) => {
        const tag = (a as any).tag || "Experience"
        return {
          time: (a as any).time || "Flexible",
          title: (a as any).title || "Recommended stop",
          tag,
          tagColor: (a as any).tagColor || getTagColor(tag),
          desc: (a as any).desc || (a as any).description || "A personalized recommendation for your trip.",
          duration: (a as any).duration || "1 hr",
          cost: (a as any).cost || "Varies",
          img: getImageForActivity(a as any),
        }
      }),
    })),
    budget: (payload.budget_breakdown || []).map((item) => ({
      label: item.label,
      amount: item.amount,
      icon: getBudgetIcon(item.label),
    })),
    totalCost: payload.total_estimated_cost || "",
  }
}
