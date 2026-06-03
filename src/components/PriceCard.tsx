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
    <article className="rounded-md border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            to={`/region/${record.regionCode}`}
            className="font-semibold text-slate-950 hover:text-slate-700"
          >
            {localizedRegionName(record, language)}
          </Link>
          <p className="mt-1 text-sm text-slate-500">
            {planLabel(record.plan, language)} · {platformLabel(record.platform, language)} ·{' '}
            {billingCycleLabel(record.billingCycle, language)}
          </p>
        </div>
        <ConfidenceBadge confidence={record.confidence} language={language} />
      </div>

      <div className="mt-4 text-2xl font-bold text-slate-950">
        {record.localPriceDisplay ?? formatMoney(record.localPrice, record.currency)}
      </div>
      <dl className="mt-4 grid grid-cols-[7rem_1fr] gap-x-3 gap-y-2 text-sm">
        <dt className="text-slate-500">{t.converted}</dt>
        <dd className="text-slate-900">
          {converted == null ? t.noFixedPrice : `${formatMoney(converted, currency)} · ${t.indicative}`}
        </dd>
        <dt className="text-slate-500">{t.tax}</dt>
        <dd className="text-slate-900">{taxIncludedLabel(record.taxIncluded, language)}</dd>
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
