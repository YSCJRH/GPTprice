import { useMemo, useState } from 'react'
import exchangeRatesJson from '../data/exchange-rates.json'
import priceDataJson from '../data/price-data.json'
import { convertedPriceForRecord, isFixedPriceRecord } from '../lib/currency'
import { copy } from '../lib/i18n'
import { formatDate, formatMoney, planLabel, platformLabel } from '../lib/format'
import {
  isDefaultVisibleRecord,
  matchesPlan,
  matchesPlatform,
  matchesSearch,
  matchesSource,
} from '../lib/filters'
import { sortPriceRecords } from '../lib/sort'
import { localizedRegionName } from '../lib/regions'
import type {
  ExchangeRateDataset,
  Language,
  PlatformFilter,
  PlanFilter,
  PriceDataset,
  PriceRecord,
  SourceFilter,
  SortKey,
} from '../types/price'
import { Filters } from '../components/Filters'
import { PlanTabs } from '../components/PlanTabs'
import { PriceTable } from '../components/PriceTable'

const priceData = priceDataJson as PriceDataset
const exchangeRates = exchangeRatesJson as ExchangeRateDataset

interface HomePageProps {
  currency: string
  language: Language
}

export function HomePage({ currency, language }: HomePageProps) {
  const t = copy[language]
  const [search, setSearch] = useState('')
  const [selectedPlan, setSelectedPlan] = useState<PlanFilter>('plus')
  const [platform, setPlatform] = useState<PlatformFilter>('all')
  const [source, setSource] = useState<SourceFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('converted_asc')
  const [showUnverified, setShowUnverified] = useState(false)

  const visibleRecords = useMemo(() => {
    const filtered = priceData.records.filter((record) => {
      if (!showUnverified && !isDefaultVisibleRecord(record)) return false
      return (
        matchesSearch(record, search) &&
        matchesPlan(record, selectedPlan) &&
        matchesPlatform(record, platform) &&
        matchesSource(record, source)
      )
    })

    return sortPriceRecords(filtered, sortKey, currency, exchangeRates.rates)
  }, [currency, platform, search, selectedPlan, showUnverified, sortKey, source])

  const lowestRecord = useMemo(
    () => findLowestConvertedRecord(visibleRecords, currency),
    [currency, visibleRecords],
  )

  const lowestValue =
    lowestRecord == null
      ? null
      : convertedPriceForRecord(lowestRecord, currency, exchangeRates.rates)

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <section className="grid items-end gap-5 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
          {t.heroTitle}
        </h1>
        <aside className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">{t.lowestConverted}</p>
          <p className="mt-2 text-4xl font-bold text-slate-950">
            {lowestValue == null ? '-' : formatMoney(lowestValue, currency)}
          </p>
          {lowestRecord ? (
            <p className="mt-3 text-sm text-slate-500">
              {localizedRegionName(lowestRecord, language)} · {planLabel(lowestRecord.plan, language)} ·{' '}
              {platformLabel(lowestRecord.platform, language)}
            </p>
          ) : (
            <p className="mt-3 text-sm text-slate-500">{t.noFixedPrice}</p>
          )}
        </aside>
      </section>

      <PlanTabs
        language={language}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
      />

      <p className="rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
        {t.compactCompliance}
      </p>

      <Filters
        language={language}
        platform={platform}
        search={search}
        showUnverified={showUnverified}
        source={source}
        sortKey={sortKey}
        onPlatformChange={setPlatform}
        onSearchChange={setSearch}
        onShowUnverifiedChange={setShowUnverified}
        onSourceChange={setSource}
        onSortKeyChange={setSortKey}
      />

      <PriceTable
        currency={currency}
        language={language}
        rates={exchangeRates.rates}
        records={visibleRecords}
      />

      <p className="text-sm text-slate-500">
        {t.dataUpdated}: {formatDate(priceData.updatedAt)} · {t.ratesUpdated}:{' '}
        {formatDate(exchangeRates.updatedAt)} · {t.indicative}
      </p>
    </main>
  )
}

function findLowestConvertedRecord(records: PriceRecord[], currency: string): PriceRecord | null {
  let bestRecord: PriceRecord | null = null
  let bestPrice = Number.POSITIVE_INFINITY

  for (const record of records) {
    if (!isDefaultVisibleRecord(record) || !isFixedPriceRecord(record)) continue

    const converted = convertedPriceForRecord(record, currency, exchangeRates.rates)
    if (converted != null && converted < bestPrice) {
      bestPrice = converted
      bestRecord = record
    }
  }

  return bestRecord
}
