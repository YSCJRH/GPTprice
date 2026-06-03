import { DisclaimerBanner } from '../components/DisclaimerBanner'
import type { Language } from '../types/price'

interface ContributePageProps {
  language: Language
}

export function ContributePage({ language }: ContributePageProps) {
  if (language === 'en') {
    return (
      <main className="mx-auto grid w-full max-w-4xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Contribute price data</h1>
        </div>
        <Section
          title="Accepted sources"
          items={[
            'OpenAI official pricing, help, or checkout pages.',
            'Official App Store or Google Play price surfaces.',
            'Redacted checkout or billing evidence with private data removed.',
            'Credible third-party indexes, clearly marked as third-party.',
          ]}
        />
        <Section
          title="Do not submit"
          items={[
            'Email addresses, order IDs, payment cards, billing addresses, or account screenshots.',
            'Unsourced prices, expired screenshots, or private invoices.',
            'VPN, gift-card, fake-address, account-region-change, or payment-workaround instructions.',
          ]}
        />
        <Section
          title="What to include"
          items={[
            'Region, plan, platform, local price, currency, billing cycle, tax note, source type, source URL, verification date, and notes.',
            'Explain uncertainty. Use needs_review instead of guessing.',
          ]}
        />
        <DisclaimerBanner language={language} />
      </main>
    )
  }

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">贡献价格数据</h1>
      </div>
      <Section
        title="可接受来源"
        items={[
          'OpenAI 官方 pricing、help 或 checkout 页面。',
          'App Store 或 Google Play 官方显示价格。',
          '已脱敏的结账页或账单说明。',
          '可信第三方价格索引，但必须标记为第三方来源。',
        ]}
      />
      <Section
        title="不要提交"
        items={[
          '邮箱、订单号、支付卡号、账单地址或账号截图。',
          '没有来源的价格、过期截图或私密发票。',
          'VPN、礼品卡、虚假地址、改区或支付绕过说明。',
        ]}
      />
      <Section
        title="需要包含"
        items={[
          '地区、计划、平台、本地价格、币种、账单周期、税费说明、来源类型、来源链接、验证日期和备注。',
          '不确定时请标记为 needs_review，不要猜测。',
        ]}
      />
      <DisclaimerBanner language={language} />
    </main>
  )
}

interface SectionProps {
  items: string[]
  title: string
}

function Section({ items, title }: SectionProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}
