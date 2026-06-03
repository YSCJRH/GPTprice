import { confidenceLabel } from '../lib/format'
import type { Confidence, Language } from '../types/price'

interface ConfidenceBadgeProps {
  confidence: Confidence
  language: Language
}

const toneByConfidence: Record<Confidence, string> = {
  high: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  medium: 'bg-blue-50 text-blue-700 ring-blue-200',
  low: 'bg-amber-50 text-amber-800 ring-amber-200',
  stale: 'bg-orange-50 text-orange-700 ring-orange-200',
  conflict: 'bg-rose-50 text-rose-700 ring-rose-200',
  needs_review: 'bg-slate-100 text-slate-700 ring-slate-200',
}

export function ConfidenceBadge({ confidence, language }: ConfidenceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${toneByConfidence[confidence]}`}
    >
      {confidenceLabel(confidence, language)}
    </span>
  )
}
