import type { PriceRecord } from '../types/price'

export function convertPrice(
  localPrice: number | null,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>,
): number | null {
  if (localPrice == null) return null
  if (fromCurrency === toCurrency) return localPrice

  const fromRate = rates[fromCurrency]
  const toRate = rates[toCurrency]

  if (!fromRate || !toRate) return null

  const usd = localPrice / fromRate
  return usd * toRate
}

export function convertedPriceForRecord(
  record: PriceRecord,
  toCurrency: string,
  rates: Record<string, number>,
): number | null {
  return convertPrice(record.localPrice, record.currency, toCurrency, rates)
}

export function isFixedPriceRecord(record: PriceRecord): boolean {
  return record.localPrice !== null && record.billingCycle !== 'usage'
}
