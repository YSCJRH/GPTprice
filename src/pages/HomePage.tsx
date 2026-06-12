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

  const metrics = useMemo(() => {
    const visibleRegionCount = new Set(visibleRecords.map((record) => record.regionCode)).size
    const officialRecordCount = visibleRecords.filter((record) => isOfficialSource(record.sourceType)).length
    const needsReviewCount = priceData.records.filter((record) => record.status === 'needs_review').length

    return {
      officialRecordCount,
      needsReviewCount,
      visibleRegionCount,
    }
  }, [visibleRecords])

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-stretch">
        <div className="flex min-w-0 flex-col justify-center gap-4">
          <div className="grid gap-3">
            <p className="text-sm font-semibold text-cyan-700">{t.heroKicker}</p>
            <h1 className="max-w-4xl text-2xl font-semibold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              {t.heroTitle}
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
              {t.heroSubtitle}
            </p>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
              <dt className="text-xs font-semibold uppercase text-slate-500">{t.visibleRecords}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">
                {visibleRecords.length}
              </dd>
            </div>
            <div className="rounded-md border border-cyan-100 bg-cyan-50/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase text-cyan-700">{t.regionsCovered}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">
                {metrics.visibleRegionCount}
              </dd>
            </div>
            <div className="rounded-md border border-emerald-100 bg-emerald-50/80 px-4 py-3">
              <dt className="text-xs font-semibold uppercase text-emerald-700">{t.officialRecords}</dt>
              <dd className="mt-1 text-2xl font-semibold tabular-nums text-slate-950">
                {metrics.officialRecordCount}
              </dd>
            </div>
          </dl>
        </div>

        <aside className="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-sm">
          <div>
            <p className="text-sm font-medium text-cyan-200">{t.lowestConverted}</p>
            <p className="mt-3 text-4xl font-semibold tracking-tight tabular-nums">
              {lowestValue == null ? '-' : formatMoney(lowestValue, currency)}
            </p>
            {lowestRecord ? (
              <dl className="mt-4 grid grid-cols-3 gap-2">
                <div className="min-w-0 rounded-md bg-white/5 px-3 py-2">
                  <dt className="text-xs text-slate-400">{t.region}</dt>
                  <dd
                    className="mt-1 truncate text-sm font-medium text-white"
                    title={localizedRegionName(lowestRecord, language)}
                  >
                    {localizedRegionName(lowestRecord, language)}
                  </dd>
                </div>
                <div className="min-w-0 rounded-md bg-white/5 px-3 py-2">
                  <dt className="text-xs text-slate-400">{t.plan}</dt>
                  <dd className="mt-1 truncate text-sm font-medium text-white">
                    {planLabel(lowestRecord.plan, language)}
                  </dd>
                </div>
                <div className="min-w-0 rounded-md bg-white/5 px-3 py-2">
                  <dt className="text-xs text-slate-400">{t.platform}</dt>
                  <dd className="mt-1 truncate text-sm font-medium text-white">
                    {platformLabel(lowestRecord.platform, language)}
                  </dd>
                </div>
              </dl>
            ) : (
              <p className="mt-3 text-sm text-slate-300">{t.noFixedPrice}</p>
            )}
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
            <div>
              <p className="text-slate-400">{t.reviewQueue}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white">{metrics.needsReviewCount}</p>
            </div>
            <div>
              <p className="text-slate-400">{t.dataUpdated}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums text-white">{formatDate(priceData.updatedAt)}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-4">
        <PlanTabs
          language={language}
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />

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
      </section>

      <PriceTable
        currency={currency}
        language={language}
        rates={exchangeRates.rates}
        records={visibleRecords}
      />

      <div className="flex flex-col gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <span>
          <span className="font-semibold text-slate-900">{t.dataFreshness}</span> · {t.dataUpdated}:{' '}
          {formatDate(priceData.updatedAt)}
        </span>
        <span>
          <span className="font-semibold text-slate-900">{t.exchangeRates}</span> · {t.ratesUpdated}:{' '}
          {formatDate(exchangeRates.updatedAt)} · {t.indicative}
        </span>
      </div>

      <p className="rounded-md border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950">
        {t.compactCompliance}
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

function isOfficialSource(sourceType: PriceRecord['sourceType']): boolean {
  return [
    'official_pricing_page',
    'official_help_center',
    'official_checkout',
    'app_store_listing',
    'google_play_listing',
  ].includes(sourceType)
}
