import type { PriceRecord } from '../types/price'

export type Freshness = 'fresh' | 'review_soon' | 'stale' | 'deprecated' | 'needs_review' | 'conflict'

export function getFreshness(record: PriceRecord, now = new Date()): Freshness {
  if (record.status === 'needs_review') return 'needs_review'
  if (record.status === 'conflict') return 'conflict'

  const verified = new Date(record.verifiedAt)
  if (Number.isNaN(verified.getTime())) return 'deprecated'

  const ageMs = now.getTime() - verified.getTime()
  const ageDays = ageMs / (1000 * 60 * 60 * 24)

  if (ageDays <= 30) return 'fresh'
  if (ageDays <= 60) return 'review_soon'
  if (ageDays <= 90) return 'stale'
  return 'deprecated'
}
