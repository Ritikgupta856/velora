"use client"

import React from "react"
import VeloraTripPage from "../page"

export default function TripByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  return <VeloraTripPage tripId={id} />
}
