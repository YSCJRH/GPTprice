# Contributing

Thanks for helping keep GPTprice accurate and transparent.

GPTprice values evidence quality over volume. A small correction with a reliable public source is more useful than a large batch of unsourced prices.

## Good First Contributions

- Correct a stale price with an official public source.
- Add a missing tax note or billing-cycle detail.
- Mark uncertain data as `needs_review` when the source is weak.
- Improve source notes so readers understand what the source actually proves.
- Improve documentation that explains data limits, confidence, or contribution rules.

## Accepted Sources

- OpenAI official pricing, help, or checkout pages.
- Official App Store or Google Play price surfaces.
- Redacted checkout or billing evidence with private data removed.
- Credible third-party indexes, clearly marked as third-party.

Prefer public URLs. If evidence is a screenshot, redact account names, email addresses, order IDs, payment data, private workspace names, and any other private details before sharing it.

## Do Not Submit

- Email addresses, order IDs, payment card numbers, billing addresses, account screenshots, or private invoices.
- Cookies, API keys, access tokens, private repository links, internal issue links, or local filesystem paths.
- Screenshots that contain account identifiers, email addresses, order IDs, billing details, payment details, or private workspace names.
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

## How to Submit

- Use the price report template for new records.
- Use the data correction template for existing records.
- Include the source URL, verification date, and what the source proves.
- Explain ambiguity instead of hiding it. If you are unsure, say so.
- Keep the contribution focused. One clear correction is easier to review than a mixed batch.

## Review Expectations

Maintainers may change confidence or status during review. This is normal: `confidence` describes evidence quality, not whether the reported price is interesting.

Records that are not sufficiently supported should stay `needs_review` and remain hidden from default rankings.

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
