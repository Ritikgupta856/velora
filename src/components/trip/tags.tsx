import React from "react"
import { TAG_STYLES } from "@/lib/trip/constants"
import { cn } from "@/lib/utils"
import { TagColor } from "@/lib/trip/types"

export function Tag({ label, color }: { label: string; color: TagColor }) {
  return (
    <span className={cn("text-[11px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap", TAG_STYLES[color] || TAG_STYLES.violet)}>
      {label}
    </span>
  )
}

export default Tag
