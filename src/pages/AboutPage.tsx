import { DisclaimerBanner } from '../components/DisclaimerBanner'
import type { Language } from '../types/price'

interface AboutPageProps {
  language: Language
}

export function AboutPage({ language }: AboutPageProps) {
  if (language === 'en') {
    return (
      <main className="mx-auto grid w-full max-w-4xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-950">About GPTprice</h1>
        <TextBlock
          title="Project boundary"
          body="GPTprice is an open-source, auditable dashboard for comparing ChatGPT and OpenAI subscription prices. It is a budgeting and public information tool, not a purchasing guide."
        />
        <TextBlock
          title="Data maintenance"
          body="Records keep source, confidence, verification date, tax notes, and status. Unverified records are hidden by default."
        />
        <TextBlock
          title="License"
          body="The project is released under the MIT License. Data contributors should only submit information they are allowed to share publicly."
        />
        <DisclaimerBanner language={language} />
      </main>
    )
  }

  return (
    <main className="mx-auto grid w-full max-w-4xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-slate-950">关于 GPTprice</h1>
      <TextBlock
        title="项目边界"
        body="GPTprice 是一个开源、可审计的 ChatGPT / OpenAI 订阅价格对比面板。它用于预算规划和公共信息研究，不是购买指导。"
      />
      <TextBlock
        title="数据维护"
        body="每条记录保留来源、可信度、验证日期、税费说明和状态。未验证记录默认隐藏。"
      />
      <TextBlock
        title="开源协议"
        body="项目使用 MIT License。数据贡献者只能提交允许公开分享的信息。"
      />
      <DisclaimerBanner language={language} />
    </main>
  )
}

interface TextBlockProps {
  body: string
  title: string
}

function TextBlock({ body, title }: TextBlockProps) {
  return (
    <section className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 leading-7 text-slate-600">{body}</p>
    </section>
  )
}
