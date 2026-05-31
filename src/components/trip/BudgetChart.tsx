"use client"
import React from "react"
import { BUDGET_COLORS } from "@/lib/trip/constants"
import { BudgetItem } from "@/lib/trip/types"

export default function BudgetChart({ budget, totalCost }: { budget: BudgetItem[]; totalCost: string }) {
  const total = budget.length
  const r = 52
  const cx = 72
  const cy = 72
  const circumference = 2 * Math.PI * r
  const pct = 100 / total
  let offset = 0
  const segments = budget.map((d, i) => {
    const len = (pct / 100) * circumference
    const seg = { ...d, offset, len, color: BUDGET_COLORS[i % BUDGET_COLORS.length] }
    offset += len
    return seg
  })

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-36 h-36 shrink-0">
        <svg width={144} height={144} viewBox="0 0 144 144">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#f1f5f9" strokeWidth={18} />
          {segments.map((s, i) => (
            <circle
              key={i}
              cx={cx} cy={cy} r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={18}
              strokeDasharray={`${s.len} ${circumference - s.len}`}
              strokeDashoffset={-s.offset}
              style={{ transform: "rotate(-90deg)", transformOrigin: `${cx}px ${cy}px` }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] text-gray-400 font-medium">Total</span>
          <span className="text-[15px] font-black text-gray-900 leading-tight">{totalCost || "—"}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-2">
        {budget.map((d, i) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: BUDGET_COLORS[i % BUDGET_COLORS.length] }} />
              <span className="text-[12px] text-gray-500">{d.label}</span>
            </div>
            <span className="text-[12px] font-semibold text-gray-800">{d.amount}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
