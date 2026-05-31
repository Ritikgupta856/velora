import { StoredTrip } from "./types"
import { parseSafeJson } from "./helpers"

export function readStoredTrip(tripId: string) {
  const stored = parseSafeJson<StoredTrip>(window.sessionStorage.getItem(`velora-trip:${tripId}`))
  if (!stored) return null
  return { request: stored.request, trip: stored.trip || stored.result || stored.raw || null }
}
