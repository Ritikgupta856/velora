"use client"

import VeloraTripPage from "@/components/dashboard/VeloraTripPage"
import React from "react"


export default function TripByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  return <VeloraTripPage tripId={id} />
}


