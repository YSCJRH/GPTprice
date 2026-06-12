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
import { SourceBadge } from './SourceBadge'

interface PriceCardProps {
  currency: string
  language: Language
  rates: Record<string, number>
  record: PriceRecord
}

export function PriceCard({ currency, language, rates, record }: PriceCardProps) {
  const t = copy[language]
  const converted = convertedPriceForRecord(record, currency, rates)

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Link
            to={`/region/${record.regionCode}`}
            className="text-lg font-semibold text-slate-950 hover:text-cyan-700"
          >
            {localizedRegionName(record, language)}
          </Link>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            {planLabel(record.plan, language)} · {platformLabel(record.platform, language)} ·{' '}
            {billingCycleLabel(record.billingCycle, language)}
          </p>
        </div>
        <ConfidenceBadge confidence={record.confidence} language={language} />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-emerald-100 bg-emerald-50/80 px-3 py-3">
          <p className="text-xs font-semibold uppercase text-emerald-700">{t.converted}</p>
          <p className="mt-1 break-words text-2xl font-semibold tabular-nums text-slate-950">
            {converted == null ? t.noFixedPrice : formatMoney(converted, currency)}
          </p>
          {converted != null && <p className="mt-1 text-xs text-slate-500">{t.indicative}</p>}
        </div>
        <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
          <p className="text-xs font-semibold uppercase text-slate-500">{t.localPrice}</p>
          <p className="mt-1 break-words text-2xl font-semibold tabular-nums text-slate-950">
            {record.localPriceDisplay ?? formatMoney(record.localPrice, record.currency)}
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-[6rem_1fr] gap-x-3 gap-y-3 text-sm">
        <dt className="text-slate-500">{t.tax}</dt>
        <dd className="text-slate-900">
          {taxIncludedLabel(record.taxIncluded, language)}
          {record.taxNote && <p className="mt-1 text-xs leading-5 text-slate-500">{record.taxNote}</p>}
        </dd>
        <dt className="text-slate-500">{t.source}</dt>
        <dd>
          <SourceBadge
            language={language}
            sourceType={record.sourceType}
            sourceUrl={record.sourceUrl}
          />
        </dd>
        <dt className="text-slate-500">{t.verified}</dt>
        <dd className="text-slate-900">{formatDate(record.verifiedAt)}</dd>
      </dl>
    </article>
  )
}
