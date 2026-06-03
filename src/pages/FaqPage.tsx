import { DisclaimerBanner } from '../components/DisclaimerBanner'
import type { Language } from '../types/price'

interface FaqPageProps {
  language: Language
}

const zhFaq = [
  {
    question: '为什么不同地区价格不同？',
    answer: '平台定价、税费、货币、本地法规和结账渠道都可能影响最终价格。',
  },
  {
    question: '是否可以跨区购买？',
    answer:
      '本项目不提供跨区购买教程，也不鼓励违反 OpenAI、Apple、Google、支付机构或当地法规的行为。请以官方结账页面和服务条款为准。',
  },
  {
    question: '为什么页面价格和我看到的不一样？',
    answer: '价格、税费、汇率、地区可用性和账号资格可能随时变化。页面数据只反映记录的来源和验证时间。',
  },
  {
    question: 'Web / iOS / Android 为什么不同？',
    answer: '不同平台可能使用不同结账系统、税费规则或本地货币显示方式。',
  },
  {
    question: '是否含税？',
    answer: '记录会显示税费状态。若为 varies 或 unknown，请以正式结账页面为准。',
  },
  {
    question: '汇率多久更新一次？',
    answer: 'MVP 使用手动汇率快照。折算价仅供预算参考，不代表最终结账金额。',
  },
  {
    question: '为什么有些价格是 Needs verification？',
    answer: '这些记录缺少可靠来源或需要维护者复核，默认不会进入价格排序。',
  },
  {
    question: '官方来源和第三方索引有什么区别？',
    answer:
      '官方来源来自 OpenAI 帮助中心、官方定价页、App Store 或 Google Play。第三方索引用于扩大覆盖范围，但不会被标成官方确认价格。',
  },
  {
    question: 'Codex / Pro / Business Codex 价格如何理解？',
    answer:
      'Pro 是个人订阅层级；Business standard 是固定席位价格；Business Codex 是用量计费，默认不和固定月费计划一起排名。',
  },
]

const enFaq = [
  {
    question: 'Why do prices differ by region?',
    answer:
      'Platform pricing, taxes, currency, local rules, and checkout channels can all affect the final price.',
  },
  {
    question: 'Can I buy across regions?',
    answer:
      'This project does not provide cross-region purchase guidance or encourage violating OpenAI, Apple, Google, payment-provider, or local rules. Use official checkout pages and terms as the source of truth.',
  },
  {
    question: 'Why is the price different from what I see?',
    answer:
      'Prices, taxes, exchange rates, availability, and eligibility can change. Records reflect their source and verification date.',
  },
  {
    question: 'Why can Web, iOS, and Android differ?',
    answer:
      'Different platforms may use different checkout systems, tax rules, or local currency displays.',
  },
  {
    question: 'Is tax included?',
    answer: 'Each record shows tax status. If it says varies or unknown, verify the official checkout page.',
  },
  {
    question: 'How often are exchange rates updated?',
    answer:
      'The MVP uses a manual exchange-rate snapshot. Converted prices are for budgeting only.',
  },
  {
    question: 'What does Needs verification mean?',
    answer:
      'The record lacks a reliable source or maintainer review, and is hidden from default ranking.',
  },
  {
    question: 'What is the difference between official sources and third-party indexes?',
    answer:
      'Official sources come from OpenAI Help Center, official pricing pages, App Store, or Google Play. Third-party indexes expand coverage but are not treated as official confirmation.',
  },
  {
    question: 'How should Codex / Pro / Business Codex pricing be read?',
    answer:
      'Pro is an individual subscription tier. Business standard is a fixed seat price. Business Codex is usage-based and not ranked with fixed monthly plans by default.',
  },
]

export function FaqPage({ language }: FaqPageProps) {
  const items = language === 'zh' ? zhFaq : enFaq

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-5 px-4 py-8 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-950">FAQ</h1>
      </div>
      {items.map((item) => (
        <section key={item.question} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">{item.question}</h2>
          <p className="mt-3 leading-7 text-slate-600">{item.answer}</p>
        </section>
      ))}
      <DisclaimerBanner language={language} />
    </main>
  )
}
