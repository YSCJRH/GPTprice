import { NavLink } from 'react-router-dom'
import { copy, languages } from '../lib/i18n'
import type { Language } from '../types/price'

interface AppHeaderProps {
  currencies: string[]
  currency: string
  language: Language
  onCurrencyChange: (currency: string) => void
  onLanguageChange: (language: Language) => void
}

const navItems = [
  { to: '/', key: 'navPrices' },
  { to: '/contribute', key: 'navContribute' },
  { to: '/faq', key: 'navFaq' },
  { to: '/about', key: 'navAbout' },
] as const

export function AppHeader({
  currencies,
  currency,
  language,
  onCurrencyChange,
  onLanguageChange,
}: AppHeaderProps) {
  const t = copy[language]

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 flex-wrap items-center gap-x-8 gap-y-3">
          <NavLink to="/" className="text-xl font-semibold tracking-tight text-slate-950">
            GPTprice
          </NavLink>
          <nav className="flex flex-wrap items-center gap-1" aria-label="Primary navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-slate-950 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                  }`
                }
              >
                {t[item.key]}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="sr-only" htmlFor="language-select">
            {t.language}
          </label>
          <select
            id="language-select"
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
            value={language}
            onChange={(event) => onLanguageChange(event.target.value as Language)}
          >
            {languages.map((item) => (
              <option key={item.code} value={item.code}>
                {item.label}
              </option>
            ))}
          </select>

          <label className="sr-only" htmlFor="currency-select">
            {t.currency}
          </label>
          <select
            id="currency-select"
            className="h-10 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-200/60"
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value)}
          >
            {currencies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <a
            href="https://github.com/YSCJRH/GPTprice"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300"
            aria-label={language === 'zh' ? '点星鼓励 GPTprice' : 'Star GPTprice on GitHub'}
          >
            {t.star}
          </a>
        </div>
      </div>
    </header>
  )
}
