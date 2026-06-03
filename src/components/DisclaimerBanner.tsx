import { copy } from '../lib/i18n'
import type { Language } from '../types/price'

interface DisclaimerBannerProps {
  language: Language
}

export function DisclaimerBanner({ language }: DisclaimerBannerProps) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm leading-6 text-amber-950">
      {copy[language].fullDisclaimer}
    </div>
  )
}
