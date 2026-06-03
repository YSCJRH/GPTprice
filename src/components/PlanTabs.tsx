import { planLabel } from '../lib/format'
import { copy } from '../lib/i18n'
import type { Language, PlanFilter } from '../types/price'

interface PlanTabsProps {
  language: Language
  selectedPlan: PlanFilter
  onPlanChange: (plan: PlanFilter) => void
}

const plans: PlanFilter[] = [
  'free',
  'go',
  'plus',
  'pro_100',
  'pro_200',
  'business_standard',
  'business_non_profit',
  'all',
]

export function PlanTabs({ language, selectedPlan, onPlanChange }: PlanTabsProps) {
  const t = copy[language]

  return (
    <nav className="-mx-2 flex gap-2 overflow-x-auto px-2 py-2" aria-label="Plan filter">
      {plans.map((plan) => {
        const active = selectedPlan === plan
        const label = plan === 'all' ? t.allPlans : planLabel(plan, language)

        return (
          <button
            key={plan}
            type="button"
            className={`h-11 shrink-0 rounded-md px-4 text-sm font-semibold transition ${
              active
                ? 'bg-slate-950 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-950'
            }`}
            onClick={() => onPlanChange(plan)}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
