import { Link } from 'react-router-dom'
import { convertedPriceForRecord } from '../lib/currency'
import {
  billingCycleLabel,
  formatDate,
  formatMoney,
  planLabel,
  platformLabel,
  taxIncludedLabel,
} from '../lib/format'
import { copy } from '../lib/i18n'
import { localizedRegionName } from '../lib/regions'
import type { Language, PriceRecord } from '../types/price'
import { ConfidenceBadge } from './ConfidenceBadge'
import { PriceCard } from './PriceCard'
import { SourceBadge } from './SourceBadge'

interface PriceTableProps {
  currency: string
  language: Language
  rates: Record<string, number>
  records: PriceRecord[]
}

export function PriceTable({ currency, language, rates, records }: PriceTableProps) {
  const t = copy[language]

  if (records.length === 0) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-slate-500">
        {t.noResults}
      </div>
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                <th className="px-4 py-3">#</th>
                <th className="px-4 py-3">{t.region}</th>
                <th className="px-4 py-3">{t.plan}</th>
                <th className="px-4 py-3">{t.platform}</th>
                <th className="px-4 py-3">{t.localPrice}</th>
                <th className="px-4 py-3">{currency}</th>
                <th className="px-4 py-3">{t.tax}</th>
                <th className="px-4 py-3">{t.source}</th>
                <th className="px-4 py-3">{t.confidence}</th>
                <th className="px-4 py-3">{t.verified}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record, index) => {
                const converted = convertedPriceForRecord(record, currency, rates)

                return (
                  <tr key={record.id} className="align-top text-slate-700">
                    <td className="px-4 py-4 text-slate-400">{index + 1}</td>
                    <td className="px-4 py-4">
                      <Link
                        className="font-semibold text-slate-950 hover:text-slate-700"
                        to={`/region/${record.regionCode}`}
                      >
                        {localizedRegionName(record, language)}
                      </Link>
                      <div className="mt-1 text-xs text-slate-500">{record.regionCode}</div>
                    </td>
                    <td className="px-4 py-4">{planLabel(record.plan, language)}</td>
                    <td className="px-4 py-4">{platformLabel(record.platform, language)}</td>
                    <td className="px-4 py-4">
                      <div className="font-semibold text-slate-950">
                        {record.localPriceDisplay ?? formatMoney(record.localPrice, record.currency)}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {billingCycleLabel(record.billingCycle, language)}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-950">
                        {converted == null ? 'Unavailable' : formatMoney(converted, currency)}
                      </div>
                      {converted != null && <div className="mt-1 text-xs text-slate-500">{t.indicative}</div>}
                    </td>
                    <td className="px-4 py-4">
                      {taxIncludedLabel(record.taxIncluded, language)}
                      {record.taxNote && <div className="mt-1 max-w-44 text-xs text-slate-500">{record.taxNote}</div>}
                    </td>
                    <td className="px-4 py-4">
                      <SourceBadge
                        language={language}
                        sourceType={record.sourceType}
                        sourceUrl={record.sourceUrl}
                      />
                    </td>
                    <td className="px-4 py-4">
                      <ConfidenceBadge confidence={record.confidence} language={language} />
                    </td>
                    <td className="px-4 py-4">{formatDate(record.verifiedAt)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-3 lg:hidden">
        {records.map((record) => (
          <PriceCard
            key={record.id}
            currency={currency}
            language={language}
            rates={rates}
            record={record}
          />
        ))}
      </div>
    </>
  )
}
