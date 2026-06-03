# Contributing

Thanks for helping keep GPTprice accurate and transparent.

## Accepted Sources

- OpenAI official pricing, help, or checkout pages.
- Official App Store or Google Play price surfaces.
- Redacted checkout or billing evidence with private data removed.
- Credible third-party indexes, clearly marked as third-party.

## Do Not Submit

- Email addresses, order IDs, payment card numbers, billing addresses, account screenshots, or private invoices.
- Unsourced prices or expired screenshots.
- VPN, gift-card, fake-address, account-region-change, or payment-workaround instructions.
- Any guide for bypassing OpenAI, Apple, Google, payment-provider, platform, or local rules.

## Data Checklist

Each price contribution should include:

- Region and region code.
- Plan.
- Platform.
- Local price and currency.
- Billing cycle.
- Tax status and tax note.
- Source type and source URL or redacted evidence.
- Verification date.
- Notes explaining uncertainty.

When data is uncertain, mark it as `needs_review`. Do not guess.

Third-party index data should stay clearly attributed and should not be upgraded to high confidence unless a maintainer verifies it against an official or redacted checkout source.

## Local Checks

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

## Disclaimer

This is an unofficial open-source project. It is for price transparency and budgeting only. It does not provide or encourage bypassing regional, payment, platform, or terms-of-service restrictions.

本项目是非官方开源项目，仅用于价格透明化和预算规划，不提供或鼓励绕过地区、支付、平台或服务条款限制的行为。
