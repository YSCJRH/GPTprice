# GPTprice

GPTprice is an open-source, auditable dashboard for comparing ChatGPT / OpenAI subscription prices across regions, platforms, currencies, sources, freshness, and confidence levels.

简体中文优先：GPTprice 是一个开源、可审计的 ChatGPT / OpenAI 订阅价格透明化面板，用于预算规划和公共信息研究。

## What this project is

- A static Vite + React + TypeScript site.
- A static price dataset seeded from a third-party public index and strengthened with official OpenAI Help Center and Apple App Store records.
- A transparent way to show source, confidence, tax notes, verification dates, and indicative currency conversion.
- A GitHub Pages-ready project.

## What this project is not

- Not a cross-region purchase guide.
- Not a guide for VPNs, gift cards, fake addresses, region changes, payment workarounds, or bypassing platform rules.
- Not affiliated with OpenAI, Apple, Google, or any payment provider.
- Not a real-time scraper, checkout crawler, database, or backend service.

## Features

- Simplified Chinese first, with English UI switch.
- Search by country, region code, currency, plan, or platform.
- Plan tabs for Free, Go, Plus, Pro 5x, Pro 20x, Team, Nonprofit Business, and All.
- Platform filter, source filter, base-currency selector, sort controls, and unverified-data toggle.
- Desktop table and mobile cards.
- Source and confidence badges.
- Manual exchange-rate snapshot with "indicative only" conversion.
- Region detail, contribution, FAQ, and About pages.

## Quick Start

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

## Data

Price records live in `src/data/price-data.json`. The broad Web seed is derived from the public GPTSub index at `https://gptsub.linusx.dev/` and each imported record is marked as `sourceType: "third_party_index"` with medium confidence. No public GPTSub source repository or explicit data license was found during this import pass, so GPTprice treats it as attributed third-party index data rather than confirmed open-source data.

The official-source layer is imported from the user-provided `price.md` public intelligence table. It adds OpenAI Help Center Web records and Apple App Store regional iOS prices as high-confidence official records where applicable. Android public listing rows are retained as `needs_review` because the unauthenticated Google Play page does not expose regional subscription prices.

Exchange rates live in `src/data/exchange-rates.json`. Exchange-rate conversions are indicative only and must not be treated as final checkout prices. A local price change should update the price record. A currency-rate change should update only the exchange-rate snapshot.

Unverified records use `confidence: "needs_review"` and `status: "needs_review"`. They are hidden from the default ranking.

## Disclaimer

This is an unofficial open-source project. It is not affiliated with OpenAI, Apple, Google, or any payment provider. It is for price transparency and budgeting only. It does not provide or encourage bypassing regional restrictions, payment restrictions, platform rules, or terms of service. Prices, exchange rates, taxes, availability, eligibility, and features may change at any time. Final prices are determined by the official checkout page, App Store, Google Play, or service provider documentation.

本项目是非官方开源项目，与 OpenAI、Apple、Google 或任何支付机构无隶属关系。项目仅用于价格透明化和预算规划，不提供或鼓励绕过地区限制、支付限制、平台规则或服务条款的行为。价格、汇率、税费、可用性、资格和功能可能随时变化，最终价格以官方结账页、App Store、Google Play 或服务方文档为准。

## License

MIT
