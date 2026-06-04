# Data Trust Model

GPTprice treats data trust as a product feature. A price is not useful unless a reader can understand where it came from, how fresh it is, and how much confidence the project has in it.

## Source Priority

Use sources in this order:

1. Official public OpenAI pricing, help, checkout, or documentation pages.
2. Official App Store or Google Play public price surfaces.
3. Attributed public third-party pricing indexes already documented in the repository.
4. Redacted user-provided evidence with private account, billing, and payment data removed.

Do not use private repositories, private issue links, local filesystem paths, private screenshots, cookies, tokens, account IDs, invoices, or payment details.

## Confidence Semantics

| Confidence | Meaning | Default visibility |
| --- | --- | --- |
| `high` | Directly supported by an official public source or verified redacted evidence | Visible |
| `medium` | Credible attributed public third-party data, or official evidence with minor ambiguity | Visible |
| `low` | Weak source quality or incomplete context | Visible only when the record is still useful and clearly labeled |
| `stale` | Evidence is old enough that the price may have changed | Visible with stale status |
| `conflict` | Multiple sources disagree | Visible only if the conflict is useful to show |
| `needs_review` | Not sufficiently verified | Hidden by default |

Never upgrade a record to `high` confidence only because it looks plausible. The confidence value should reflect evidence quality, not price attractiveness.

## Required Fields for Price Records

Each record should preserve:

- Region code and localized region name.
- Plan and platform.
- Local price, currency, billing cycle, and tax note.
- Source type and source URL.
- Source note explaining what the source supports.
- Verification date.
- Confidence and status.
- Contributor or source attribution.
- Notes for ambiguity, conflict, or limits.

## Refresh Expectations

GPTprice is a static public dashboard, not a real-time price API.

The maintainer workflow is designed around periodic refreshes:

- Check official public sources first.
- Check documented third-party public sources second.
- Update only records with adequate evidence.
- Keep uncertain records as `needs_review`.
- Run data validation and production build before publishing.
- Use a separate review gate before automated push and deploy.

## What Must Not Be Added

Do not add:

- Cross-region purchase instructions.
- VPN, gift-card, fake-address, account-region-change, or payment-workaround guidance.
- Private account, billing, order, invoice, or payment data.
- Cookies, API keys, access tokens, local filesystem paths, or private repository references.
- Claims that indicative exchange-rate conversions are final checkout prices.

## Reader Guidance

Use GPTprice for price transparency, public information research, and budget planning. Final prices are determined by official checkout pages, App Store, Google Play, or provider documentation.
