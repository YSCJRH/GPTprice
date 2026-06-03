export type Plan =
  | 'free'
  | 'go'
  | 'plus'
  | 'pro_100'
  | 'pro_200'
  | 'business_standard'
  | 'business_non_profit'
  | 'business_codex'
  | 'enterprise'
  | 'edu'
  | 'legacy_team'
  | 'unknown'

export type Platform = 'web' | 'ios' | 'android' | 'unknown'

export type BillingCycle = 'monthly' | 'annual' | 'usage' | 'custom' | 'unknown'

export type TaxIncluded = true | false | 'varies' | 'unknown'

export type SourceType =
  | 'official_pricing_page'
  | 'official_help_center'
  | 'official_checkout'
  | 'app_store_listing'
  | 'google_play_listing'
  | 'third_party_index'
  | 'user_report'
  | 'derived'
  | 'unknown'

export type Confidence =
  | 'high'
  | 'medium'
  | 'low'
  | 'stale'
  | 'conflict'
  | 'needs_review'

export interface ConvertedPrices {
  USD?: number
  CNY?: number
  TWD?: number
  EUR?: number
  [currencyCode: string]: number | undefined
}

export interface PriceRecord {
  id: string
  regionCode: string
  countryOrRegionName: string
  currency: string
  plan: Plan
  platform: Platform
  localPrice: number | null
  localPriceDisplay?: string
  billingCycle: BillingCycle
  taxIncluded: TaxIncluded
  taxNote?: string
  convertedPrices?: ConvertedPrices
  sourceType: SourceType
  sourceUrl: string | null
  sourceNote: string
  verifiedAt: string
  staleAt?: string
  confidence: Confidence
  contributor: string
  notes: string[]
  status: 'active' | 'stale' | 'deprecated' | 'conflict' | 'needs_review'
}

export interface PriceDataset {
  schemaVersion: string
  updatedAt: string
  records: PriceRecord[]
}

export interface ExchangeRateDataset {
  schemaVersion: string
  baseCurrency: string
  updatedAt: string
  sourceType: string
  sourceUrl: string | null
  sourceNote: string
  rates: Record<string, number>
}

export interface RegionRecord {
  regionCode: string
  countryOrRegionName: string
  defaultCurrency: string
}

export interface RegionsDataset {
  schemaVersion: string
  regions: RegionRecord[]
}

export type Language = 'zh' | 'en'

export type PlanFilter =
  | 'all'
  | 'free'
  | 'go'
  | 'plus'
  | 'pro_100'
  | 'pro_200'
  | 'business_standard'
  | 'business_non_profit'
  | 'business_codex'

export type PlatformFilter = 'all' | Platform

export type SourceFilter = 'all' | 'official' | 'third_party' | 'other'

export type SortKey = 'converted_asc' | 'local_asc' | 'verified_desc' | 'confidence'
