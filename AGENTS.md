# GPTprice Agent Guide

## Project Goal

Build and maintain a static ChatGPT / OpenAI subscription price transparency dashboard.

## Tech Stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Static JSON data
- GitHub Pages
- GitHub Actions
- npm

## Commands

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

## Hard Constraints

- No backend, database, auth, scraping, checkout automation, or realtime crawler.
- No cross-region purchase guidance.
- No VPN, gift-card, fake-address, account-region-change, or payment-workaround content.
- No Redux, Zustand, TanStack Table, Storybook, Playwright, Cypress, map libraries, charting libraries, or heavy UI frameworks for MVP.
- Keep unverified data hidden by default.
- Keep exchange-rate conversions labeled as indicative only.

## UI Direction

- Simplified Chinese is the default UI language.
- English is available through the language selector.
- Plan filtering uses horizontal tabs.
- The header includes language, base currency, and a GitHub star link.
- The homepage keeps compliance copy compact; full disclaimers live in About, FAQ, Contribute, README, and CONTRIBUTING.
