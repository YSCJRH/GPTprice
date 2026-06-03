import type {
  BillingCycle,
  Confidence,
  Language,
  Platform,
  Plan,
  SourceType,
  TaxIncluded,
} from '../types/price'

const zeroDecimalCurrencies = new Set(['JPY', 'KRW'])

export function formatMoney(value: number | null, currency: string): string {
  if (value == null) return 'Conversion unavailable'

  const digits = zeroDecimalCurrencies.has(currency) ? 0 : 2
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    }).format(value)
  } catch {
    return `${currency} ${value.toFixed(digits)}`
  }
}

export function formatDate(value: string): string {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toISOString().slice(0, 10)
}

export function planLabel(plan: Plan, language: Language): string {
  const zh: Record<Plan, string> = {
    free: '免费',
    go: 'Go',
    plus: 'Plus',
    pro_100: 'Pro 5x',
    pro_200: 'Pro 20x',
    business_standard: '团队版',
    business_non_profit: '非营利团队版',
    business_codex: 'Codex',
    enterprise: 'Enterprise',
    edu: 'Edu',
    legacy_team: 'Legacy Team',
    unknown: 'Unknown',
  }

  const en: Record<Plan, string> = {
    free: 'Free',
    go: 'Go',
    plus: 'Plus',
    pro_100: 'Pro 5x',
    pro_200: 'Pro 20x',
    business_standard: 'Team',
    business_non_profit: 'Nonprofit Business',
    business_codex: 'Codex',
    enterprise: 'Enterprise',
    edu: 'Edu',
    legacy_team: 'Legacy Team',
    unknown: 'Unknown',
  }

  return language === 'zh' ? zh[plan] : en[plan]
}

export function platformLabel(platform: Platform, language: Language): string {
  if (platform === 'unknown') return language === 'zh' ? '未知' : 'Unknown'
  if (platform === 'web') return 'Web'
  if (platform === 'ios') return 'iOS'
  if (platform === 'android') return 'Android'
  return platform
}

export function sourceTypeLabel(sourceType: SourceType, language: Language): string {
  const zh: Record<SourceType, string> = {
    official_pricing_page: '官方定价页',
    official_help_center: '官方帮助中心',
    official_checkout: '官方结账页',
    app_store_listing: 'App Store',
    google_play_listing: 'Google Play',
    third_party_index: '第三方索引',
    user_report: '用户报告',
    derived: '推导',
    unknown: '未知来源',
  }

  const en: Record<SourceType, string> = {
    official_pricing_page: 'Official pricing',
    official_help_center: 'Official help',
    official_checkout: 'Official checkout',
    app_store_listing: 'App Store',
    google_play_listing: 'Google Play',
    third_party_index: 'Third-party index',
    user_report: 'User report',
    derived: 'Derived',
    unknown: 'Unknown',
  }

  return language === 'zh' ? zh[sourceType] : en[sourceType]
}

export function confidenceLabel(confidence: Confidence, language: Language): string {
  const zh: Record<Confidence, string> = {
    high: '高',
    medium: '中',
    low: '低',
    stale: '过期',
    conflict: '冲突',
    needs_review: '待验证',
  }

  const en: Record<Confidence, string> = {
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    stale: 'Stale',
    conflict: 'Conflict',
    needs_review: 'Needs review',
  }

  return language === 'zh' ? zh[confidence] : en[confidence]
}

export function billingCycleLabel(cycle: BillingCycle, language: Language): string {
  const zh: Record<BillingCycle, string> = {
    monthly: '月付',
    annual: '年付',
    usage: '用量计费',
    custom: '自定义',
    unknown: '未知',
  }

  const en: Record<BillingCycle, string> = {
    monthly: 'Monthly',
    annual: 'Annual',
    usage: 'Usage-based',
    custom: 'Custom',
    unknown: 'Unknown',
  }

  return language === 'zh' ? zh[cycle] : en[cycle]
}

export function taxIncludedLabel(taxIncluded: TaxIncluded, language: Language): string {
  if (taxIncluded === true) return language === 'zh' ? '含税' : 'Included'
  if (taxIncluded === false) return language === 'zh' ? '未含税' : 'Not included'
  if (taxIncluded === 'varies') return language === 'zh' ? '视情况而定' : 'Varies'
  return language === 'zh' ? '未知' : 'Unknown'
}
