import { readFileSync } from 'node:fs'

const priceData = readJson('src/data/price-data.json')
const exchangeRates = readJson('src/data/exchange-rates.json')
const regions = readJson('src/data/regions.json')

const enums = {
  plan: [
    'free',
    'go',
    'plus',
    'pro_100',
    'pro_200',
    'business_standard',
    'business_non_profit',
    'business_codex',
    'enterprise',
    'edu',
    'legacy_team',
    'unknown',
  ],
  platform: ['web', 'ios', 'android', 'unknown'],
  billingCycle: ['monthly', 'annual', 'usage', 'custom', 'unknown'],
  taxIncluded: [true, false, 'varies', 'unknown'],
  sourceType: [
    'official_pricing_page',
    'official_help_center',
    'official_checkout',
    'app_store_listing',
    'google_play_listing',
    'third_party_index',
    'user_report',
    'derived',
    'unknown',
  ],
  confidence: ['high', 'medium', 'low', 'stale', 'conflict', 'needs_review'],
  status: ['active', 'stale', 'deprecated', 'conflict', 'needs_review'],
}

const errors = []
const warnings = []
const ids = new Set()
const knownRegions = new Set(regions.regions.map((region) => region.regionCode))
const requiredFields = [
  'id',
  'regionCode',
  'countryOrRegionName',
  'currency',
  'plan',
  'platform',
  'localPrice',
  'billingCycle',
  'taxIncluded',
  'sourceType',
  'sourceUrl',
  'sourceNote',
  'verifiedAt',
  'confidence',
  'contributor',
  'notes',
  'status',
]

if (!priceData.records || !Array.isArray(priceData.records)) {
  errors.push('price-data.json must include a records array.')
}

for (const record of priceData.records ?? []) {
  for (const field of requiredFields) {
    if (!(field in record)) {
      errors.push(`${record.id ?? '<missing id>'}: missing required field ${field}.`)
    }
  }

  if (ids.has(record.id)) {
    errors.push(`${record.id}: duplicate record id.`)
  }
  ids.add(record.id)

  validateEnum(record, 'plan')
  validateEnum(record, 'platform')
  validateEnum(record, 'billingCycle')
  validateEnum(record, 'taxIncluded')
  validateEnum(record, 'sourceType')
  validateEnum(record, 'confidence')
  validateEnum(record, 'status')

  if (!knownRegions.has(record.regionCode)) {
    warnings.push(`${record.id}: regionCode is not listed in regions.json.`)
  }

  if (
    record.localPrice !== null &&
    (!Number.isFinite(record.localPrice) || record.localPrice < 0)
  ) {
    errors.push(`${record.id}: localPrice must be null or a non-negative number.`)
  }

  if (record.plan !== 'free' && record.localPrice === 0) {
    errors.push(`${record.id}: only free plan records may use localPrice 0.`)
  }

  if (record.status === 'active' && record.confidence === 'high' && !record.sourceUrl) {
    errors.push(`${record.id}: active high-confidence records require sourceUrl.`)
  }

  if (typeof record.sourceNote !== 'string' || record.sourceNote.trim() === '') {
    errors.push(`${record.id}: sourceNote must not be empty.`)
  }

  const verifiedAt = new Date(record.verifiedAt)
  if (Number.isNaN(verifiedAt.getTime())) {
    errors.push(`${record.id}: verifiedAt must be a valid date.`)
  } else {
    const ageDays = (Date.now() - verifiedAt.getTime()) / (1000 * 60 * 60 * 24)
    if (ageDays > 90 && record.status === 'active') {
      warnings.push(`${record.id}: verifiedAt is older than 90 days.`)
    }
  }

  if (
    record.sourceType === 'user_report' &&
    record.confidence === 'high' &&
    !record.notes.some((note) => note.toLowerCase().includes('maintainer-reviewed'))
  ) {
    errors.push(`${record.id}: user_report cannot be high confidence unless notes include maintainer-reviewed.`)
  }
}

if (exchangeRates.baseCurrency !== 'USD') {
  errors.push('exchange-rates.json baseCurrency must be USD for the MVP conversion model.')
}

for (const [currency, rate] of Object.entries(exchangeRates.rates ?? {})) {
  if (!Number.isFinite(rate) || rate <= 0) {
    errors.push(`${currency}: exchange rate must be a positive number.`)
  }
}

for (const warning of warnings) {
  console.warn(`warning: ${warning}`)
}

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`error: ${error}`)
  }
  process.exit(1)
}

console.log(`Validated ${priceData.records.length} price records.`)

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'))
}

function validateEnum(record, field) {
  if (!enums[field].includes(record[field])) {
    errors.push(`${record.id}: invalid ${field} value ${String(record[field])}.`)
  }
}
