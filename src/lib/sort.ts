import { convertedPriceForRecord } from './currency'
import type { PriceRecord, SortKey } from '../types/price'

const confidenceRank: Record<PriceRecord['confidence'], number> = {
  high: 0,
  medium: 1,
  low: 2,
  needs_review: 3,
  stale: 4,
  conflict: 5,
}

export function sortPriceRecords(
  records: PriceRecord[],
  sortKey: SortKey,
  currency: string,
  rates: Record<string, number>,
): PriceRecord[] {
  return [...records].sort((a, b) => {
    if (sortKey === 'local_asc') {
      return nullableNumber(a.localPrice) - nullableNumber(b.localPrice)
    }

    if (sortKey === 'verified_desc') {
      return new Date(b.verifiedAt).getTime() - new Date(a.verifiedAt).getTime()
    }

    if (sortKey === 'confidence') {
      return confidenceRank[a.confidence] - confidenceRank[b.confidence]
    }

    const aConverted = convertedPriceForRecord(a, currency, rates)
    const bConverted = convertedPriceForRecord(b, currency, rates)
    return nullableNumber(aConverted) - nullableNumber(bConverted)
  })
}

function nullableNumber(value: number | null): number {
  return value == null ? Number.POSITIVE_INFINITY : value
}
