import { sourceTypeLabel } from '../lib/format'
import { safeExternalUrl } from '../lib/url'
import type { Language, SourceType } from '../types/price'

interface SourceBadgeProps {
  language: Language
  sourceType: SourceType
  sourceUrl: string | null
}

export function SourceBadge({ language, sourceType, sourceUrl }: SourceBadgeProps) {
  const label = sourceTypeLabel(sourceType, language)
  const safeUrl = safeExternalUrl(sourceUrl)
  const className =
    'inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-white hover:text-slate-950'

  if (!safeUrl) {
    return <span className={className}>{label}</span>
  }

  return (
    <a className={className} href={safeUrl} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  )
}
