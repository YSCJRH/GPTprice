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
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <p className="text-base font-semibold text-slate-950">{t.noResults}</p>
      </div>
    )
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm lg:block">
        <div className="max-h-[72vh] overflow-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="sticky top-0 z-10 bg-slate-50 shadow-[0_1px_0_rgba(148,163,184,0.35)]">
              <tr className="text-left text-xs font-semibold uppercase text-slate-500">
                <th className="w-14 px-4 py-3.5">#</th>
                <th className="px-4 py-3.5">{t.region}</th>
                <th className="px-4 py-3.5">{t.plan}</th>
                <th className="px-4 py-3.5">{t.platform}</th>
                <th className="px-4 py-3.5 text-right">{t.localPrice}</th>
                <th className="px-4 py-3.5 text-right">
                  {t.converted} ({currency})
                </th>
                <th className="px-4 py-3.5">{t.tax}</th>
                <th className="px-4 py-3.5">{t.source}</th>
                <th className="px-4 py-3.5">{t.confidence}</th>
                <th className="px-4 py-3.5">{t.verified}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {records.map((record, index) => {
                const converted = convertedPriceForRecord(record, currency, rates)

                return (
                  <tr
                    key={record.id}
                    className="align-top text-slate-700 transition odd:bg-white even:bg-slate-50/35 hover:bg-cyan-50/60"
                  >
                    <td className="px-4 py-4 text-sm tabular-nums text-slate-400">{index + 1}</td>
                    <td className="max-w-48 px-4 py-4">
                      <Link
                        className="font-semibold text-slate-950 hover:text-cyan-700"
                        to={`/region/${record.regionCode}`}
                      >
                        {localizedRegionName(record, language)}
                      </Link>
                      <div className="mt-1 text-xs text-slate-500">{record.regionCode}</div>
                    </td>
                    <td className="px-4 py-4 font-medium whitespace-nowrap text-slate-800">{planLabel(record.plan, language)}</td>
                    <td className="px-4 py-4 text-slate-600">{platformLabel(record.platform, language)}</td>
                    <td className="px-4 py-4 text-right">
                      <div className="font-semibold tabular-nums text-slate-950">
                        {record.localPriceDisplay ?? formatMoney(record.localPrice, record.currency)}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {billingCycleLabel(record.billingCycle, language)}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="font-bold tabular-nums text-emerald-700">
                        {converted == null ? t.unavailablePrice : formatMoney(converted, currency)}
                      </div>
                      {converted != null && <div className="mt-1 text-xs text-slate-500">{t.indicative}</div>}
                    </td>
                    <td className="px-4 py-4">
                      {taxIncludedLabel(record.taxIncluded, language)}
                      {record.taxNote && <div className="mt-1 max-w-44 text-xs leading-5 text-slate-500">{record.taxNote}</div>}
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
