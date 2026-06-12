import { copy } from '../lib/i18n'
import type { Language, PlatformFilter, SortKey, SourceFilter } from '../types/price'

interface FiltersProps {
  language: Language
  platform: PlatformFilter
  search: string
  showUnverified: boolean
  source: SourceFilter
  sortKey: SortKey
  onPlatformChange: (platform: PlatformFilter) => void
  onSearchChange: (search: string) => void
  onShowUnverifiedChange: (show: boolean) => void
  onSourceChange: (source: SourceFilter) => void
  onSortKeyChange: (sortKey: SortKey) => void
}

export function Filters({
  language,
  platform,
  search,
  showUnverified,
  source,
  sortKey,
  onPlatformChange,
  onSearchChange,
  onShowUnverifiedChange,
  onSourceChange,
  onSortKeyChange,
}: FiltersProps) {
  const t = copy[language]

  return (
    <section
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5"
      aria-label="Filters"
    >
      <div className="mb-4 flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-950">{t.controlsTitle}</h2>
          <p className="mt-1 text-sm text-slate-500">{t.controlsSubtitle}</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_auto]">
        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="region-search">
            {t.searchRegion}
          </label>
          <input
            id="region-search"
            className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={t.searchPlaceholder}
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="platform-filter">
            {t.platform}
          </label>
          <select
            id="platform-filter"
            className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            value={platform}
            onChange={(event) => onPlatformChange(event.target.value as PlatformFilter)}
          >
            <option value="all">{t.allPlatforms}</option>
            <option value="web">Web</option>
            <option value="ios">iOS</option>
            <option value="android">Android</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="source-filter">
            {t.sourceFilter}
          </label>
          <select
            id="source-filter"
            className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            value={source}
            onChange={(event) => onSourceChange(event.target.value as SourceFilter)}
          >
            <option value="all">{t.allSources}</option>
            <option value="official">{t.officialSources}</option>
            <option value="third_party">{t.thirdPartySources}</option>
            <option value="other">{t.otherSources}</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-semibold text-slate-600" htmlFor="sort-filter">
            {t.sort}
          </label>
          <select
            id="sort-filter"
            className="h-11 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-950 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
            value={sortKey}
            onChange={(event) => onSortKeyChange(event.target.value as SortKey)}
          >
            <option value="converted_asc">{t.sortConverted}</option>
            <option value="local_asc">{t.sortLocal}</option>
            <option value="verified_desc">{t.sortVerified}</option>
            <option value="confidence">{t.sortConfidence}</option>
          </select>
        </div>

        <div className="grid gap-2 sm:col-span-2 lg:col-span-1">
          <span className="text-sm font-semibold text-slate-600">{t.dataScope}</span>
          <label className="flex h-11 items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600 transition hover:border-amber-200 hover:bg-amber-50/60">
            <input
              className="h-4 w-4 rounded border-slate-300 text-slate-950 accent-slate-950"
              type="checkbox"
              checked={showUnverified}
              onChange={(event) => onShowUnverifiedChange(event.target.checked)}
            />
            {t.showUnverified}
          </label>
        </div>
      </div>
    </section>
  )
}
