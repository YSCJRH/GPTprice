# GPTprice

[![CI](https://github.com/YSCJRH/GPTprice/actions/workflows/ci.yml/badge.svg)](https://github.com/YSCJRH/GPTprice/actions/workflows/ci.yml)
[![Deploy GitHub Pages](https://github.com/YSCJRH/GPTprice/actions/workflows/deploy.yml/badge.svg)](https://github.com/YSCJRH/GPTprice/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-black.svg)](LICENSE)

GPTprice is an open-source, auditable ChatGPT / OpenAI subscription price transparency dashboard.

简体中文优先：GPTprice 用于比较不同地区、平台、计划和基准货币下的 ChatGPT / OpenAI 订阅价格，帮助用户做预算规划和公开信息研究。

[Live demo](https://yscjrh.github.io/GPTprice/) · [Data trust model](docs/data-trust.md) · [Contribute data](CONTRIBUTING.md)

## Why GPTprice

ChatGPT / OpenAI subscription prices can vary by region, platform, billing cycle, tax treatment, and source freshness. Public price discussions are often scattered, stale, or hard to audit.

GPTprice makes this information easier to inspect:

- Compare subscription prices across regions, plans, platforms, and currencies.
- See the original local price and indicative converted price side by side.
- Inspect source type, source URL, confidence, tax note, status, and verification date.
- Keep unverified data hidden by default.
- Use a static, open, GitHub Pages-hosted dashboard with no backend or login.

## What You Can Do

- Search by country, region code, currency, plan, or platform.
- Filter by plan, platform, source, and data visibility.
- Switch between Simplified Chinese and English.
- Switch the base currency for indicative conversion.
- Review desktop tables and mobile cards.
- Contribute corrections with public sources or redacted evidence.

## Why Star This Project

Star GPTprice if you want:

- A transparent public reference for ChatGPT / OpenAI subscription pricing.
- A static open-source dataset that can be audited through Git history.
- A conservative data model that separates official, third-party, and needs-review records.
- A project that refuses purchase-workaround guidance and keeps privacy boundaries clear.
- A maintainable Vite + React + TypeScript example for public data dashboards.

## Data Trust Model

GPTprice is useful only if the data is explainable. Every price record should carry source and confidence metadata.

| Layer | Source type | Default treatment |
| --- | --- | --- |
| Official public source | OpenAI pricing/help pages, App Store, Google Play, official checkout or documentation | High confidence when the price and region are directly supported |
| Attributed public index | Public third-party pricing indexes already documented in the repo | Medium confidence unless independently verified |
| User report or weak evidence | Redacted screenshots, reports, partial public evidence | `needs_review`, hidden by default |
| Conflict or stale data | Contradictory, expired, or unclear evidence | `conflict`, `stale`, or `needs_review` |

See [docs/data-trust.md](docs/data-trust.md) for contribution rules, confidence semantics, and refresh expectations.

## Freshness

This is not a real-time crawler. Prices, taxes, availability, platform checkout behavior, and exchange rates can change at any time.

The maintenance workflow is:

- Weekly Codex App automation checks public sources and prepares verified updates.
- A separate review gate checks source quality, privacy, confidence, and compliance boundaries.
- `npm run validate:data`, `npm run lint`, `npm run typecheck`, and `npm run build` must pass before publish.
- Final prices are still determined by official checkout pages, App Store, Google Play, or provider documentation.

## Project Boundaries

GPTprice is:

- A static Vite + React + TypeScript site.
- A public, auditable price transparency dashboard.
- A budgeting and public-information research tool.

GPTprice is not:

- A cross-region purchase guide.
- A guide for VPNs, gift cards, fake addresses, region changes, payment workarounds, or bypassing platform rules.
- Affiliated with OpenAI, Apple, Google, or any payment provider.
- A scraper service, checkout crawler, backend, database, or real-time API.

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

## Data Files

- `src/data/price-data.json`: subscription price records.
- `src/data/exchange-rates.json`: static exchange-rate snapshot for indicative conversion.
- `src/data/regions.json`: region names and default currencies.

Unverified records use `confidence: "needs_review"` and `status: "needs_review"`. They are hidden from the default ranking.

## Contributing

Useful contributions include:

- Correcting a price with an official public source.
- Reporting stale or conflicting records.
- Improving region names, tax notes, source metadata, or confidence labels.
- Improving documentation that helps users understand data limits.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Do not submit private account data, order IDs, payment screenshots, cookies, tokens, private repository links, local paths, or payment-workaround guidance.

## License

MIT
