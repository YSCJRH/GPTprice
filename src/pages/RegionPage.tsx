import { Link, useParams } from 'react-router-dom'
import exchangeRatesJson from '../data/exchange-rates.json'
import priceDataJson from '../data/price-data.json'
import { DisclaimerBanner } from '../components/DisclaimerBanner'
import { PriceTable } from '../components/PriceTable'
import { copy } from '../lib/i18n'
import { isDefaultVisibleRecord } from '../lib/filters'
import type { ExchangeRateDataset, Language, PriceDataset } from '../types/price'

const priceData = priceDataJson as PriceDataset
const exchangeRates = exchangeRatesJson as ExchangeRateDataset

interface RegionPageProps {
  currency: string
  language: Language
}

export function RegionPage({ currency, language }: RegionPageProps) {
  const { regionCode } = useParams()
  const normalizedCode = regionCode?.toUpperCase() ?? ''
  const records = priceData.records.filter((record) => record.regionCode === normalizedCode)
  const visibleRecords = records.filter(isDefaultVisibleRecord)
  const visibleNotes = Array.from(new Set(visibleRecords.flatMap((record) => record.notes)))
  const t = copy[language]

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid gap-2">
        <Link className="text-sm font-semibold text-slate-500 hover:text-slate-950" to="/">
          {language === 'zh' ? '返回价格列表' : 'Back to prices'}
        </Link>
        <h1 className="text-4xl font-bold text-slate-950">
          {records[0]?.countryOrRegionName ?? normalizedCode}
        </h1>
      </div>

      {records.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-white p-8 text-slate-600">
          {language === 'zh' ? '该地区尚无价格记录。' : 'No price records exist for this region yet.'}
        </div>
      )}

      {records.length > 0 && visibleRecords.length === 0 && (
        <div className="rounded-md border border-slate-200 bg-white p-6 text-slate-600">
          {language === 'zh'
            ? '该地区暂无已验证价格数据。你可以提交可靠来源来帮助更新。'
            : 'No verified price data yet. You can help by submitting a verified source.'}
        </div>
      )}

      {visibleRecords.length > 0 && (
        <PriceTable
          currency={currency}
          language={language}
          rates={exchangeRates.rates}
          records={visibleRecords}
        />
      )}

      {visibleNotes.length > 0 && (
        <section className="grid gap-4 rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">{t.notes}</h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-slate-600">
            {visibleNotes.map((note) => <li key={note}>{note}</li>)}
          </ul>
        </section>
      )}

      <DisclaimerBanner language={language} />
    </main>
  )
}
