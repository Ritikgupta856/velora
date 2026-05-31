import React from "react"

export type TagColor = "violet" | "teal" | "green" | "amber"

export type Activity = {
  time: string
  title: string
  tag: string
  tagColor: TagColor
  desc: string
  duration: string
  cost: string
  img?: string | null
  fetched?: boolean
}

export type Day = {
  day: number
  title: string
  subtitle: string
  icon?: React.ElementType
  activities: Activity[]
}

export type BudgetItem = {
  label: string
  amount: string
  icon?: React.ElementType
}

export type TripResponse = {
  title?: string
  days?: Array<{
    day: number
    title: string
    subtitle: string
    activities: Array<Partial<Activity> & { description?: string }>
  }>
  budget_breakdown?: BudgetItem[]
  total_estimated_cost?: string
}

export type StoredTrip = {
  request?: {
    destination?: string
    duration?: string
    budget?: string
    style?: string
  }
  trip?: TripResponse
  result?: TripResponse
  raw?: TripResponse
}

export type StreamStatus = {
  progress?: number
  title?: string
  message?: string
}
