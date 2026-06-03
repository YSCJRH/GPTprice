import { Link } from 'react-router-dom'
import { copy } from '../lib/i18n'
import type { Language } from '../types/price'

interface FooterProps {
  language: Language
}

export function Footer({ language }: FooterProps) {
  const t = copy[language]

  return (
    <footer className="border-t border-slate-200/80 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-6 text-sm text-slate-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>{t.footerDisclaimer}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="font-medium text-slate-700 hover:text-slate-950" to="/about">
            {t.navAbout}
          </Link>
          <a
            className="font-medium text-slate-700 hover:text-slate-950"
            href="https://github.com/YSCJRH/GPTprice"
            target="_blank"
            rel="noreferrer"
          >
            {t.star}
          </a>
        </div>
      </div>
    </footer>
  )
}
