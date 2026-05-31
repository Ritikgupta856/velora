import { Activity, BudgetItem, TagColor } from "./types"
import { Hotel, Utensils, Navigation, Camera, Waves, Music, Coffee, Sun } from "lucide-react"
import { BUDGET_COLORS } from "./constants"

export function getTagColor(tag = ""): TagColor {
  const v = tag.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner|market|shopping/.test(v)) return "amber"
  if (/beach|water|sea|island/.test(v)) return "teal"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(v)) return "green"
  return "violet"
}

export function getImageForActivity(activity: Partial<Activity>) {
  if (activity.img) return activity.img
  const v = `${activity.tag || ""} ${activity.title || ""}`.toLowerCase()
  if (/food|cafe|coffee|lunch|dinner/.test(v)) return "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=120&h=80&fit=crop"
  if (/nature|hike|trail|park|garden|forest|mountain/.test(v)) return "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=120&h=80&fit=crop"
  if (/night|music|club|party/.test(v)) return "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=120&h=80&fit=crop"
  if (/shopping|market/.test(v)) return "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=120&h=80&fit=crop"
  return "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=120&h=80&fit=crop"
}

export function getBudgetIcon(label = "") {
  const v = label.toLowerCase()
  if (/stay|hotel|room|accommodation/.test(v)) return Hotel
  if (/food|meal|restaurant/.test(v)) return Utensils
  if (/transport|route|taxi|cab|flight/.test(v)) return Navigation
  if (/activity|ticket|tour/.test(v)) return Camera
  return Navigation
}

export function highlightIcon(label = "") {
  const v = label.toLowerCase()
  if (/beach|water|sea|island/.test(v)) return Waves
  if (/night|music|club|party/.test(v)) return Music
  if (/food|cafe|coffee/.test(v)) return Coffee
  if (/culture|heritage|museum|fort|photo/.test(v)) return Camera
  return Sun
}

export function parseSafeJson<T>(value: string | null): T | null {
  if (!value) return null
  try { return JSON.parse(value) as T } catch { return null }
}

export function createSSEReader(onEvent: (event: string, data: string) => void) {
  let buffer = ""
  const decoder = new TextDecoder()
  const parseBlock = (block: string) => {
    if (!block.trim()) return
    const lines = block.split(/\r?\n/)
    let event = "message"
    const dataParts: string[] = []
    for (const line of lines) {
      if (line.startsWith("event:")) event = line.slice(6).trim()
      if (line.startsWith("data:")) dataParts.push(line.slice(5).trimStart())
    }
    onEvent(event, dataParts.join("\n"))
  }
  return {
    append(chunk: Uint8Array) {
      buffer += decoder.decode(chunk, { stream: true })
      let boundary = buffer.indexOf("\n\n")
      while (boundary !== -1) {
        parseBlock(buffer.slice(0, boundary))
        buffer = buffer.slice(boundary + 2)
        boundary = buffer.indexOf("\n\n")
      }
    },
    flush() {
      buffer += decoder.decode()
      parseBlock(buffer)
      buffer = ""
    },
  }
}
