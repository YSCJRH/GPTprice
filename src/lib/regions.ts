import type { Language, PriceRecord } from '../types/price'

const zhRegionDisplayNames =
  typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['zh-Hans'], { type: 'region' })
    : null

const zhRegionFallbacks: Record<string, string> = {
  GLOBAL: '全球',
  US2: '美国 (US2)',
}

export function localizedRegionName(record: PriceRecord, language: Language): string {
  if (language !== 'zh') return record.countryOrRegionName
  return zhRegionName(record.regionCode, record.countryOrRegionName)
}

export function zhRegionName(regionCode: string, fallback: string): string {
  const normalizedCode = regionCode.toUpperCase()

  if (zhRegionFallbacks[normalizedCode]) {
    return zhRegionFallbacks[normalizedCode]
  }

  try {
    return zhRegionDisplayNames?.of(normalizedCode) ?? fallback
  } catch {
    return fallback
  }
}
