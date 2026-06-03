import type { PlatformFilter, PlanFilter, PriceRecord, SourceFilter } from '../types/price'

export function isDefaultVisibleRecord(record: PriceRecord): boolean {
  return record.status === 'active' && record.confidence !== 'needs_review' && record.confidence !== 'conflict'
}

export function matchesSearch(record: PriceRecord, query: string): boolean {
  const normalized = query.trim().toLowerCase()
  if (!normalized) return true

  return [
    record.regionCode,
    record.countryOrRegionName,
    record.currency,
    record.plan,
    record.platform,
  ].some((value) => value.toLowerCase().includes(normalized))
}

export function matchesPlan(record: PriceRecord, plan: PlanFilter): boolean {
  if (plan === 'all') return true
  return record.plan === plan
}

export function matchesPlatform(record: PriceRecord, platform: PlatformFilter): boolean {
  if (platform === 'all') return true
  return record.platform === platform
}

export function matchesSource(record: PriceRecord, source: SourceFilter): boolean {
  if (source === 'all') return true

  const officialSources = new Set([
    'official_pricing_page',
    'official_help_center',
    'official_checkout',
    'app_store_listing',
    'google_play_listing',
  ])

  if (source === 'official') return officialSources.has(record.sourceType)
  if (source === 'third_party') return record.sourceType === 'third_party_index'
  return !officialSources.has(record.sourceType) && record.sourceType !== 'third_party_index'
}
