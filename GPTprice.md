# GPTprice：Codex App `/goal` 模式实施蓝图

> 仓库：`https://github.com/YSCJRH/GPTprice`  
> 文档用途：把“ChatGPT / OpenAI 订阅价格透明化工具”的产品分析，转化为 Codex App 可长期执行、可验收、可收口的工程蓝图。  
> 推荐使用方式：先把本文件提交到仓库根目录，之后在 Codex App 中以本文件作为主要上下文，启动 `/goal` 模式。  
> 生成日期：2026-06-03

---

## 0. 最重要的结论

`GPTprice` 的 MVP 不应做成“跨区低价购买攻略”，而应做成一个 **开源、可审计、即点即看的 ChatGPT / OpenAI 订阅价格透明化网页**。

Codex App 的长期目标应收敛到这件事：

> 在 `YSCJRH/GPTprice` 仓库中完成一个可静态部署的 Vite + React + TypeScript 网页应用，用户打开页面即可搜索、筛选、排序和换算 ChatGPT / OpenAI 订阅价格，并能看到来源、更新时间、可信度、风险提示和“Star on GitHub”入口。

当前仓库非常轻量，只有 MIT License 与最基础仓库结构，因此适合从零搭建 MVP。不要让 Codex 在早期陷入爬虫、后端、地图、账号系统、截图上传、复杂测试、复杂国际化或过度防御性编程。

---

## 1. Codex `/goal` 模式执行原则

OpenAI 官方 Codex 文档说明，Goal mode 适合多步骤、路径不完全确定但有清晰完成条件的任务；Goal 文本会同时作为起始提示和完成条件。因此，本项目的 `/goal` 提示必须包含：

1. 明确产品目标；
2. 明确不做什么；
3. 明确技术栈；
4. 明确验收命令；
5. 明确收口条件；
6. 明确不要过度测试、不要过度防御。

本蓝图的设计思路是：**让 Codex 有足够上下文长期执行，但每个阶段都有硬边界，避免无限扩展。**

---

## 2. 当前仓库快照

截至 2026-06-03 的公开页面观察：

- 仓库：`YSCJRH/GPTprice`
- 可见状态：Public
- 当前内容：`LICENSE`
- License：MIT
- Stars：0
- Forks：0
- Releases：无
- About：尚未填写 description、website、topics

这意味着 Codex 的第一步应该是 **保留 LICENSE，不要删除已有内容，然后在根目录初始化前端项目**。

---

## 3. 产品边界

### 3.1 产品定位

项目名称保留仓库名：`GPTprice`。页面标题可以使用更清晰的产品名：

> GPT Price Radar

一句话说明：

> GPTprice is an open-source, auditable dashboard for comparing ChatGPT / OpenAI subscription prices across regions, platforms, currencies, and confidence levels.

中文说明：

> GPTprice 是一个开源、可审计、可贡献的 ChatGPT / OpenAI 订阅价格透明化面板，用于比较不同地区、平台、货币和可信度下的订阅成本。

### 3.2 必须做

MVP 必须实现：

- 即点即看的静态网页；
- 价格数据表；
- 国家 / 地区搜索；
- 计划筛选；
- 平台筛选；
- 基准货币选择；
- 按折算价、本地价、更新时间、可信度排序；
- 来源标签；
- 可信度标签；
- 数据更新时间；
- 风险提示；
- 移动端适配；
- GitHub 仓库 Star 入口；
- README、贡献说明、免责声明；
- GitHub Pages 静态部署工作流；
- 最小数据校验脚本。

### 3.3 明确不做

MVP 绝对不要做：

- 不做跨区购买教程；
- 不做 VPN、礼品卡、虚假地址、改区、支付绕过说明；
- 不做登录、账号系统、用户画像；
- 不做后端；
- 不做数据库；
- 不做实时爬虫；
- 不做自动访问 OpenAI 结账页；
- 不做 App Store / Google Play 自动抓取；
- 不做地图可视化；
- 不做截图上传；
- 不做通知系统；
- 不做多 AI 服务横向比较；
- 不做复杂埋点；
- 不做 Storybook；
- 不做 Playwright / E2E；
- 不做复杂单元测试矩阵；
- 不引入 Redux、Zustand、TanStack Table、shadcn/ui、Material UI 等重型依赖；
- 不为了“完美类型安全”写大量防御代码。

### 3.4 合规底线

所有页面都要传达：

- 这是价格透明化和预算规划工具，不是购买指导；
- 价格会变化；
- 汇率会变化；
- 税费会变化；
- 可用地区、支付方式、功能权益可能变化；
- 最终价格以官方结账页面、App Store、Google Play 或服务提供方正式说明为准；
- 项目与 OpenAI、Apple、Google、支付机构无隶属关系。

---

## 4. 推荐技术方案

### 4.1 技术栈

MVP 使用：

- Vite
- React
- TypeScript
- Tailwind CSS
- 静态 JSON 数据
- GitHub Pages
- GitHub Actions
- npm

说明：

- 当前仓库几乎为空，使用 npm 降低上手门槛。
- 不需要后端。
- 不需要 Next.js。
- 不需要 Astro。
- 不需要数据库。
- 不需要复杂测试框架。

### 4.2 路由策略

由于 GitHub Pages 对 SPA 深层路径没有天然 rewrite，MVP 推荐使用 **Hash 路由**，例如：

- `/#/`
- `/#/region/US`
- `/#/contribute`
- `/#/faq`
- `/#/about`

可以使用 `react-router-dom` 的 `HashRouter`，也可以自己写一个极简 hash router。为避免重新造轮子，推荐安装 `react-router-dom`。

### 4.3 部署策略

GitHub Pages 部署时，Vite 的 `base` 应设置为：

```ts
base: "/GPTprice/"
```

因为仓库路径是：

```txt
https://github.com/YSCJRH/GPTprice
```

对应 GitHub Pages 通常是：

```txt
https://yscjrh.github.io/GPTprice/
```

如果后续绑定自定义域名，再把 `base` 改为 `/`。

---

## 5. 目录结构目标

Codex 应该把仓库整理成如下结构。不要为了“更专业”额外创建复杂 monorepo。

```txt
GPTprice/
  .github/
    workflows/
      ci.yml
      deploy.yml
    ISSUE_TEMPLATE/
      price-report.yml
      data-correction.yml
      feature-request.yml
    pull_request_template.md

  public/
    favicon.svg

  src/
    components/
      AppHeader.tsx
      DisclaimerBanner.tsx
      Filters.tsx
      PriceTable.tsx
      PriceCard.tsx
      ConfidenceBadge.tsx
      SourceBadge.tsx
      Footer.tsx

    data/
      price-data.json
      exchange-rates.json
      regions.json

    lib/
      currency.ts
      freshness.ts
      filters.ts
      sort.ts
      format.ts

    pages/
      HomePage.tsx
      RegionPage.tsx
      ContributePage.tsx
      FaqPage.tsx
      AboutPage.tsx

    types/
      price.ts

    App.tsx
    main.tsx
    index.css

  scripts/
    validate-data.mjs

  AGENTS.md
  CONTRIBUTING.md
  README.md
  LICENSE
  package.json
  vite.config.ts
  tsconfig.json
  tailwind.config.js
```

---

## 6. 最小依赖策略

Codex 应尽量使用以下依赖：

### 6.1 runtime dependencies

```txt
react
react-dom
react-router-dom
```

### 6.2 dev dependencies

```txt
@vitejs/plugin-react
vite
typescript
tailwindcss
@tailwindcss/vite 或 postcss/autoprefixer，取决于当前 Tailwind 推荐配置
eslint
typescript-eslint
```

### 6.3 不推荐在 MVP 引入

```txt
axios
lodash
date-fns
zod
ajv
vitest
playwright
storybook
redux
zustand
@tanstack/react-table
framer-motion
chart.js
d3
mapbox
```

如果 Codex 认为需要 schema validation，不要引入 AJV。MVP 用 `scripts/validate-data.mjs` 手写基础校验即可。

---

## 7. 数据模型

### 7.1 TypeScript 类型

文件：`src/types/price.ts`

```ts
export type Plan =
  | "free"
  | "go"
  | "plus"
  | "pro_100"
  | "pro_200"
  | "business_standard"
  | "business_codex"
  | "enterprise"
  | "edu"
  | "legacy_team"
  | "unknown";

export type Platform = "web" | "ios" | "android" | "unknown";

export type BillingCycle =
  | "monthly"
  | "annual"
  | "usage"
  | "custom"
  | "unknown";

export type TaxIncluded = true | false | "varies" | "unknown";

export type SourceType =
  | "official_pricing_page"
  | "official_help_center"
  | "official_checkout"
  | "app_store_listing"
  | "google_play_listing"
  | "third_party_index"
  | "user_report"
  | "derived"
  | "unknown";

export type Confidence =
  | "high"
  | "medium"
  | "low"
  | "stale"
  | "conflict"
  | "needs_review";

export interface ConvertedPrices {
  USD?: number;
  CNY?: number;
  TWD?: number;
  EUR?: number;
  [currencyCode: string]: number | undefined;
}

export interface PriceRecord {
  id: string;
  regionCode: string;
  countryOrRegionName: string;
  currency: string;
  plan: Plan;
  platform: Platform;
  localPrice: number | null;
  localPriceDisplay?: string;
  billingCycle: BillingCycle;
  taxIncluded: TaxIncluded;
  taxNote?: string;
  convertedPrices?: ConvertedPrices;
  sourceType: SourceType;
  sourceUrl: string | null;
  sourceNote: string;
  verifiedAt: string;
  staleAt?: string;
  confidence: Confidence;
  contributor: string;
  notes: string[];
  status: "active" | "stale" | "deprecated" | "conflict" | "needs_review";
}
```

### 7.2 `price-data.json`

文件：`src/data/price-data.json`

注意：MVP 不应假装有大量全球真实价格。只放少量官方可验证记录和少量 `needs_review` 占位记录。占位记录默认不进入排名。

```json
{
  "schemaVersion": "0.1.0",
  "updatedAt": "2026-06-03T00:00:00Z",
  "records": [
    {
      "id": "us-plus-web-monthly-2026-06-03",
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "currency": "USD",
      "plan": "plus",
      "platform": "web",
      "localPrice": 20,
      "localPriceDisplay": "$20/month",
      "billingCycle": "monthly",
      "taxIncluded": "varies",
      "taxNote": "Taxes may vary by state and checkout context.",
      "sourceType": "official_help_center",
      "sourceUrl": "https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus",
      "sourceNote": "OpenAI Help Center states ChatGPT Plus is $20/month. Final checkout price may vary by tax and location.",
      "verifiedAt": "2026-06-03T00:00:00Z",
      "staleAt": "2026-07-03T00:00:00Z",
      "confidence": "high",
      "contributor": "maintainers",
      "notes": [
        "API usage is billed separately.",
        "Final price should be verified on the official checkout page."
      ],
      "status": "active"
    },
    {
      "id": "us-pro-100-web-monthly-2026-06-03",
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "currency": "USD",
      "plan": "pro_100",
      "platform": "web",
      "localPrice": 100,
      "localPriceDisplay": "$100/month",
      "billingCycle": "monthly",
      "taxIncluded": "varies",
      "taxNote": "Taxes may vary by state and checkout context.",
      "sourceType": "official_help_center",
      "sourceUrl": "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers",
      "sourceNote": "OpenAI Help Center describes Pro $100 as a tier with 5x higher usage than Plus.",
      "verifiedAt": "2026-06-03T00:00:00Z",
      "staleAt": "2026-07-03T00:00:00Z",
      "confidence": "high",
      "contributor": "maintainers",
      "notes": [
        "Designed for people using advanced tools and models throughout the week."
      ],
      "status": "active"
    },
    {
      "id": "us-pro-200-web-monthly-2026-06-03",
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "currency": "USD",
      "plan": "pro_200",
      "platform": "web",
      "localPrice": 200,
      "localPriceDisplay": "$200/month",
      "billingCycle": "monthly",
      "taxIncluded": "varies",
      "taxNote": "Taxes may vary by state and checkout context.",
      "sourceType": "official_help_center",
      "sourceUrl": "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers",
      "sourceNote": "OpenAI Help Center describes Pro $200 as the highest-usage Pro tier with 20x higher usage than Plus.",
      "verifiedAt": "2026-06-03T00:00:00Z",
      "staleAt": "2026-07-03T00:00:00Z",
      "confidence": "high",
      "contributor": "maintainers",
      "notes": [
        "Suitable for heavy workflows and parallel projects."
      ],
      "status": "active"
    },
    {
      "id": "us-business-standard-web-monthly-2026-06-03",
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "currency": "USD",
      "plan": "business_standard",
      "platform": "web",
      "localPrice": 25,
      "localPriceDisplay": "$25/user/month, monthly billing",
      "billingCycle": "monthly",
      "taxIncluded": "varies",
      "taxNote": "Pricing may vary depending on country and currency type.",
      "sourceType": "official_help_center",
      "sourceUrl": "https://help.openai.com/en/articles/8792828-what-is-chatgpt-business",
      "sourceNote": "OpenAI Help Center states that for most countries ChatGPT Business standard seats are $25/user/month if billed monthly, with a 2-seat minimum.",
      "verifiedAt": "2026-06-03T00:00:00Z",
      "staleAt": "2026-07-03T00:00:00Z",
      "confidence": "high",
      "contributor": "maintainers",
      "notes": [
        "Business standard seats include ChatGPT and Codex access within the Business workspace.",
        "Minimum 2 standard ChatGPT seats."
      ],
      "status": "active"
    },
    {
      "id": "us-business-codex-web-usage-2026-06-03",
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "currency": "USD",
      "plan": "business_codex",
      "platform": "web",
      "localPrice": null,
      "localPriceDisplay": "Usage-based",
      "billingCycle": "usage",
      "taxIncluded": "unknown",
      "taxNote": "Usage-based billing; final charges depend on workspace credits and usage.",
      "sourceType": "official_help_center",
      "sourceUrl": "https://help.openai.com/en/articles/8792828-what-is-chatgpt-business",
      "sourceNote": "OpenAI Help Center states Codex seats are usage-based and have no fixed per-user monthly cost.",
      "verifiedAt": "2026-06-03T00:00:00Z",
      "staleAt": "2026-07-03T00:00:00Z",
      "confidence": "high",
      "contributor": "maintainers",
      "notes": [
        "Do not rank usage-based plans together with fixed monthly plans by default."
      ],
      "status": "active"
    },
    {
      "id": "tw-plus-web-monthly-needs-review",
      "regionCode": "TW",
      "countryOrRegionName": "Taiwan",
      "currency": "TWD",
      "plan": "plus",
      "platform": "web",
      "localPrice": null,
      "localPriceDisplay": "Needs verification",
      "billingCycle": "monthly",
      "taxIncluded": "unknown",
      "taxNote": "Needs manual checkout or reliable source verification.",
      "sourceType": "unknown",
      "sourceUrl": null,
      "sourceNote": "Placeholder for future contribution. Do not show in default ranking.",
      "verifiedAt": "1970-01-01T00:00:00Z",
      "confidence": "needs_review",
      "contributor": "maintainers",
      "notes": [
        "This placeholder exists to demonstrate the contribution workflow."
      ],
      "status": "needs_review"
    }
  ]
}
```

### 7.3 `exchange-rates.json`

文件：`src/data/exchange-rates.json`

MVP 可以提供手动快照，但必须标注“indicative only”。如果不想维护汇率，可以让 UI 在缺少汇率时显示 `Conversion unavailable`。

```json
{
  "schemaVersion": "0.1.0",
  "baseCurrency": "USD",
  "updatedAt": "2026-06-03T00:00:00Z",
  "sourceType": "manual_snapshot",
  "sourceUrl": null,
  "sourceNote": "Manual fixture for MVP. Exchange-rate conversions are indicative only and must not be treated as final checkout prices.",
  "rates": {
    "USD": 1,
    "CNY": 7.20,
    "TWD": 32.30,
    "EUR": 0.92,
    "JPY": 157.00,
    "HKD": 7.80
  }
}
```

### 7.4 `regions.json`

```json
{
  "schemaVersion": "0.1.0",
  "regions": [
    {
      "regionCode": "US",
      "countryOrRegionName": "United States",
      "defaultCurrency": "USD"
    },
    {
      "regionCode": "TW",
      "countryOrRegionName": "Taiwan",
      "defaultCurrency": "TWD"
    },
    {
      "regionCode": "JP",
      "countryOrRegionName": "Japan",
      "defaultCurrency": "JPY"
    },
    {
      "regionCode": "HK",
      "countryOrRegionName": "Hong Kong",
      "defaultCurrency": "HKD"
    },
    {
      "regionCode": "EU",
      "countryOrRegionName": "European Economic Area",
      "defaultCurrency": "EUR"
    }
  ]
}
```

---

## 8. 货币换算逻辑

文件：`src/lib/currency.ts`

`exchange-rates.json` 的语义：

```txt
rates[currency] = 1 USD 可兑换多少该货币
```

示例：

```txt
USD: 1
CNY: 7.20
TWD: 32.30
```

换算逻辑：

```ts
export function convertPrice(
  localPrice: number | null,
  fromCurrency: string,
  toCurrency: string,
  rates: Record<string, number>
): number | null {
  if (localPrice == null) return null;
  if (fromCurrency === toCurrency) return localPrice;

  const fromRate = rates[fromCurrency];
  const toRate = rates[toCurrency];

  if (!fromRate || !toRate) return null;

  const usd = localPrice / fromRate;
  return usd * toRate;
}
```

UI 显示规则：

- `localPrice === null`：显示 `Needs verification` 或 `Usage-based`；
- 换算结果为 `null`：显示 `Conversion unavailable`；
- 非 USD 价格显示两位小数；
- JPY、KRW 等可显示 0 位小数；
- 所有换算价旁边加提示：`Indicative only`。

---

## 9. 可信度与新鲜度规则

### 9.1 可信度标签

```txt
high          官方文档、官方定价页、维护者复核数据
medium        可信第三方或部分验证来源
low           单一用户报告
needs_review  占位或未验证提交
conflict      多条来源冲突
stale         超过维护周期
```

### 9.2 Freshness 规则

文件：`src/lib/freshness.ts`

```txt
verifiedAt 距今 <= 30 天：fresh
31 - 60 天：review_soon
61 - 90 天：stale
> 90 天：deprecated
status === needs_review：needs_review
status === conflict：conflict
```

UI 默认：

- 显示 `active`；
- 隐藏 `needs_review`；
- 隐藏 `deprecated`；
- 提供一个复选框：`Show unverified data`。

---

## 10. 页面设计

### 10.1 Header

Header 必须包含：

- 项目名：`GPTprice`
- 副标题：`OpenAI subscription price transparency`
- 导航：
  - Prices
  - Contribute
  - FAQ
  - About
- 明显的 GitHub Star 入口：

```tsx
<a
  href="https://github.com/YSCJRH/GPTprice"
  target="_blank"
  rel="noreferrer"
  className="..."
  aria-label="Star GPTprice on GitHub"
>
  ⭐ Star on GitHub
</a>
```

不要做“自动点 star”的功能。GitHub star 需要用户登录并明确操作；网页只提供入口。

### 10.2 首页 `HomePage`

首页模块顺序：

1. Hero：
   - `Compare ChatGPT / OpenAI subscription prices across regions.`
   - 中文说明：`用于预算规划和价格透明化，不提供跨区购买教程。`
2. Disclaimer banner：
   - `Final prices may vary. Always verify on the official checkout page.`
3. Filters：
   - Search input
   - Plan select
   - Platform select
   - Currency select
   - Sort select
   - `Show unverified data` checkbox
4. Price table / cards：
   - 桌面：表格
   - 移动端：卡片
5. Data note：
   - Data last updated
   - Exchange rates updated
6. CTA：
   - `Contribute price data`
   - `Star on GitHub`

表格列：

```txt
Region
Plan
Platform
Local Price
Converted
Tax
Source
Confidence
Verified
```

移动端卡片：

```txt
United States · Plus · Web
$20/month
≈ CNY 144.00
Tax: varies
Source: Official Help Center
Confidence: high
Verified: 2026-06-03
```

### 10.3 地区详情页 `RegionPage`

路径：

```txt
/#/region/US
```

内容：

- 地区名称；
- 该地区所有价格记录；
- 按 plan 分组；
- Web / iOS / Android 差异；
- 税费说明；
- 数据来源；
- notes；
- 贡献入口。

如果某地区只有 `needs_review` 数据，显示：

```txt
No verified price data yet. You can help by submitting a verified source.
```

### 10.4 数据贡献页 `ContributePage`

必须写清楚：

可接受来源：

- OpenAI 官方 pricing / help / checkout；
- App Store / Google Play 官方显示；
- 脱敏后的结账页或账单说明；
- 可信第三方价格索引，但必须标记为第三方。

不可接受内容：

- 邮箱、订单号、支付卡号、账单地址；
- 账号截图；
- VPN、礼品卡、虚假地址、改区教程；
- 没有来源的价格；
- 过期截图；
- 任何绕过服务条款的操作指南。

### 10.5 FAQ 页

必须包含这些问答：

1. 为什么不同地区价格不同？
2. 是否可以跨区购买？
3. 为什么页面价格和我看到的不一样？
4. Web / iOS / Android 为什么不同？
5. 是否含税？
6. 汇率多久更新一次？
7. 为什么有些价格是 `Needs verification`？
8. Codex / Pro / Business Codex 价格如何理解？

其中“是否可以跨区购买”的答案必须非常克制：

```txt
本项目不提供跨区购买教程，也不鼓励违反 OpenAI、Apple、Google、支付机构或当地法规的行为。请以官方结账页面和服务条款为准。
```

### 10.6 About 页

包含：

- 项目边界；
- 非官方声明；
- 数据维护原则；
- 开源协议；
- 隐私说明；
- GitHub 仓库链接。

---

## 11. 页面底部免责声明

中文：

```txt
GPTprice 是一个非官方开源项目，未与 OpenAI、Apple、Google 或任何支付平台建立隶属、赞助或背书关系。本项目仅用于公开信息整理、价格透明化研究和个人 / 团队预算规划，不提供、不鼓励、也不协助任何绕过地区限制、支付限制、平台规则或服务条款的行为。

订阅价格、汇率、税费、可用地区、支付方式、订阅资格和功能权益可能随时变化。页面展示的数据可能来自官方文档、官方结账页、第三方整理或用户贡献，并会标注来源、验证时间和可信度。任何价格信息都可能过期或存在误差，最终价格、税费和可购买性请以官方结账页面、App Store、Google Play 或服务提供方的正式说明为准。

请勿提交包含邮箱、订单号、支付方式、账单地址、账号截图等敏感信息的内容。贡献数据前请先完成脱敏处理。
```

英文：

```txt
GPTprice is an unofficial open-source project and is not affiliated with, sponsored by, or endorsed by OpenAI, Apple, Google, or any payment provider. This project is intended only for public information research, subscription price transparency, and personal or team budgeting. It does not provide, encourage, or assist with bypassing regional restrictions, payment restrictions, platform rules, or terms of service.

Subscription prices, exchange rates, taxes, regional availability, payment methods, eligibility, and included features may change at any time. Data shown in this project may come from official documentation, official checkout pages, third-party indexes, or user contributions, and should be labeled with source, verification time, and confidence level. Any price may be outdated or inaccurate. The final price, taxes, and purchase eligibility are determined by the official checkout page, App Store, Google Play, or the service provider’s official documentation.

Do not submit sensitive information such as emails, order IDs, payment details, billing addresses, or account screenshots. Please redact all private information before contributing.
```

---

## 12. 数据校验脚本

文件：`scripts/validate-data.mjs`

不要引入大型 schema 依赖。手写基础校验即可。

校验规则：

- `schemaVersion` 必须存在；
- `updatedAt` 必须是有效日期；
- `records` 必须是数组；
- `id` 唯一；
- 必填字段必须存在；
- `plan`、`platform`、`billingCycle`、`sourceType`、`confidence`、`status` 必须在枚举内；
- `regionCode` 长度为 2，或是允许的特殊码 `EU`、`GLOBAL`；
- `currency` 必须是 3 位大写字母；
- `localPrice` 可以是 `null`；如果不是 `null`，必须大于 0；
- `sourceNote` 不得为空；
- `confidence === "high"` 且 `status === "active"` 时，`sourceUrl` 必须存在；
- `sourceType === "user_report"` 不允许直接 `confidence: "high"`，除非 notes 中包含 `maintainer-reviewed`；
- `verifiedAt` 必须是有效日期；
- 如果 `verifiedAt` 超过 60 天，不 fail，只 warning；
- `needs_review` 记录允许 `sourceUrl: null`；
- 对 `localPrice: null` 的记录，不参与价格排序。

命令：

```json
{
  "scripts": {
    "validate:data": "node scripts/validate-data.mjs"
  }
}
```

---

## 13. 最小测试策略

为了避免 Codex 陷入不必要测试，本项目 MVP 不要求单元测试框架。

MVP 的验收面只有：

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

如果 Codex 强烈想加测试，最多只允许：

- 1 个 currency conversion 测试；
- 1 个 freshness 测试；
- 1 个 filtering/sorting 测试。

不要添加：

- Playwright；
- Cypress；
- Storybook；
- visual snapshot；
- coverage threshold；
- mock server；
- E2E pipeline。

---

## 14. GitHub Actions

### 14.1 `ci.yml`

文件：`.github/workflows/ci.yml`

```yaml
name: CI

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm run validate:data
      - run: npm run build
```

### 14.2 `deploy.yml`

文件：`.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run validate:data
      - run: npm run build

      - uses: actions/configure-pages@v5

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest

    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

仓库 owner 仍需在 GitHub 仓库设置里启用 Pages：

```txt
Settings → Pages → Build and deployment → Source: GitHub Actions
```

Codex 无法替你点击 GitHub 设置页面，不要卡在这里。

---

## 15. README 草案结构

`README.md` 应该包含：

```md
# GPTprice

Open-source, auditable dashboard for comparing ChatGPT / OpenAI subscription prices across regions, platforms, currencies, and confidence levels.

[⭐ Star this project](https://github.com/YSCJRH/GPTprice)

## What this project is

- A subscription price transparency dashboard
- A multi-region price observation panel
- A budgeting reference for developers, researchers, students, and heavy AI users
- An open dataset with source, timestamp, and confidence labels

## What this project is not

- Not a cross-region purchasing guide
- Not a payment workaround tutorial
- Not affiliated with OpenAI, Apple, Google, or any payment provider
- Not a guarantee of final checkout price or eligibility

## Features

- Region search
- Plan filter
- Platform filter
- Currency conversion
- Sortable price table
- Source labels
- Confidence labels
- Freshness status
- Mobile-first responsive UI
- Static GitHub Pages deployment

## Quick Start

```bash
npm install
npm run dev
npm run validate:data
npm run build
```

## Data

Data lives in:

- `src/data/price-data.json`
- `src/data/exchange-rates.json`
- `src/data/regions.json`

## Contributing

Please read `CONTRIBUTING.md`.

## Disclaimer

[Use the bilingual disclaimer from this blueprint.]

## License

MIT
```

---

## 16. Issue / PR 模板

### 16.1 `.github/ISSUE_TEMPLATE/price-report.yml`

```yaml
name: Price report
description: Submit a new subscription price or update an existing one.
title: "[Price] REGION PLAN PLATFORM"
labels: ["data", "needs-review"]

body:
  - type: input
    id: region
    attributes:
      label: Region code
      placeholder: "US, TW, JP"
    validations:
      required: true

  - type: input
    id: plan
    attributes:
      label: Plan
      placeholder: "plus, pro_100, pro_200, business_standard, business_codex"
    validations:
      required: true

  - type: dropdown
    id: platform
    attributes:
      label: Platform
      options:
        - web
        - ios
        - android
        - unknown
    validations:
      required: true

  - type: input
    id: price
    attributes:
      label: Local price and currency
      placeholder: "20 USD / 650 TWD / 3000 JPY"
    validations:
      required: true

  - type: dropdown
    id: tax
    attributes:
      label: Tax included?
      options:
        - "true"
        - "false"
        - "varies"
        - "unknown"
    validations:
      required: true

  - type: textarea
    id: source
    attributes:
      label: Source
      description: Official URL, app store listing, or redacted proof description.
    validations:
      required: true

  - type: checkboxes
    id: compliance
    attributes:
      label: Compliance checklist
      options:
        - label: I removed all sensitive information.
          required: true
        - label: This report does not include cross-region purchase instructions.
          required: true
        - label: I understand final prices may differ at checkout.
          required: true
```

### 16.2 `.github/ISSUE_TEMPLATE/data-correction.yml`

```yaml
name: Data correction
description: Report outdated, incorrect, or conflicting price data.
title: "[Correction] REGION PLAN PLATFORM"
labels: ["data-correction", "needs-review"]

body:
  - type: input
    id: record_id
    attributes:
      label: Existing record ID
      placeholder: "us-plus-web-monthly-2026-06-03"

  - type: textarea
    id: problem
    attributes:
      label: What is wrong?
      placeholder: "Price outdated, tax status incorrect, wrong platform..."
    validations:
      required: true

  - type: textarea
    id: evidence
    attributes:
      label: Evidence or source
    validations:
      required: true
```

### 16.3 `.github/pull_request_template.md`

```md
## What changed?

- [ ] Added or updated price data
- [ ] Updated exchange rates
- [ ] UI change
- [ ] Documentation change
- [ ] CI / deployment change

## Data checklist

- [ ] Every new record has a unique `id`
- [ ] Source type, source note, and verification date are provided
- [ ] Tax status is specified
- [ ] Sensitive information is removed
- [ ] This PR does not include cross-region purchase instructions
- [ ] I ran `npm run validate:data`

## Notes

Describe how the data was verified.
```

---

## 17. AGENTS.md

Codex 应在项目根目录创建 `AGENTS.md`，用于长期保持方向。

```md
# AGENTS.md

## Project goal

Build GPTprice as a static, open-source ChatGPT / OpenAI subscription price transparency dashboard.

The project is for public information research, price transparency, and budgeting. It must not become a cross-region purchase guide.

## Tech stack

- Vite
- React
- TypeScript
- Tailwind CSS
- Static JSON
- GitHub Pages
- npm

## Commands

- Install: `npm install`
- Dev: `npm run dev`
- Lint: `npm run lint`
- Typecheck: `npm run typecheck`
- Data validation: `npm run validate:data`
- Build: `npm run build`

## Hard constraints

- No backend in MVP.
- No database in MVP.
- No scraping in MVP.
- No login/auth in MVP.
- No screenshot upload in MVP.
- No cross-region purchase guidance.
- No VPN, gift-card, fake-address, account-region-change, or payment-workaround content.
- Keep dependencies minimal.
- Do not add E2E tests or Storybook.
- Do not spend time on perfect test coverage.

## Definition of done for MVP

- Static website builds successfully.
- Home page shows searchable/filterable/sortable price records.
- Unverified records are hidden by default.
- Currency conversion works when exchange rates exist.
- Source, confidence, verified date, and tax status are visible.
- Mobile layout is usable.
- Header and footer include a link to `https://github.com/YSCJRH/GPTprice` asking users to star the repo.
- README, CONTRIBUTING, issue templates, PR template, CI, and GitHub Pages deploy workflow exist.
- `npm run lint`, `npm run typecheck`, `npm run validate:data`, and `npm run build` pass.
```

---

## 18. 阶段化实施计划

### Phase 0：仓库检查与初始化

目标：

- 保留 `LICENSE`；
- 检查是否已有 `package.json`；
- 如果没有，初始化 Vite React TS；
- 创建 `AGENTS.md`；
- 不要删除历史内容。

验收：

```bash
npm install
npm run dev
```

收口条件：

- Vite 页面能启动；
- LICENSE 仍存在。

不要做：

- 不要写业务逻辑；
- 不要改仓库名称；
- 不要引入后端。

---

### Phase 1：基础工程骨架

目标：

- 设置 Tailwind；
- 设置 `vite.config.ts` 的 `base: "/GPTprice/"`；
- 创建目录结构；
- 创建基础页面和路由；
- 创建 Header / Footer；
- 加入 GitHub Star 链接。

验收：

```bash
npm run build
```

收口条件：

- 页面能打开；
- Header 有 Star 链接；
- 基础导航可切换。

不要做：

- 不要追求复杂视觉；
- 不要添加动画库；
- 不要添加地图。

---

### Phase 2：数据模型和数据校验

目标：

- 创建 `src/types/price.ts`；
- 创建 `price-data.json`；
- 创建 `exchange-rates.json`；
- 创建 `regions.json`；
- 创建 `scripts/validate-data.mjs`；
- 添加 `npm run validate:data`。

验收：

```bash
npm run validate:data
npm run typecheck
```

收口条件：

- 数据校验能发现明显错误；
- seed 数据通过；
- 不引入大依赖。

不要做：

- 不要爬数据；
- 不要假装有全球价格；
- 不要接第三方实时 API。

---

### Phase 3：首页价格表

目标：

- 读取静态 JSON；
- 显示价格表；
- 搜索；
- 计划筛选；
- 平台筛选；
- 货币选择；
- 排序；
- 隐藏未验证数据；
- 移动端卡片。

验收：

```bash
npm run build
```

手工验收：

- 搜 `US` 能看到美国记录；
- 切换 `plus` 能看到 Plus；
- 选择 CNY / TWD 能看到折算价或明确不可用；
- 勾选 `Show unverified data` 后能看到 TW placeholder；
- 移动端布局不是横向溢出。

不要做：

- 不要引入 TanStack Table；
- 不要写复杂虚拟列表；
- 不要分页；
- 不要做地图。

---

### Phase 4：详情页、贡献页、FAQ、About

目标：

- `/#/region/:regionCode`
- `/#/contribute`
- `/#/faq`
- `/#/about`

验收：

```bash
npm run build
```

收口条件：

- 每个页面有可用内容；
- FAQ 明确合规边界；
- About 明确非官方；
- 贡献页明确隐私和不可接受内容。

不要做：

- 不要写长篇法律论文；
- 不要提供跨区步骤；
- 不要生成大量无来源价格。

---

### Phase 5：README、贡献模板、CI

目标：

- README；
- CONTRIBUTING；
- issue templates；
- PR template；
- CI workflow；
- deploy workflow。

验收：

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

收口条件：

- GitHub 上用户能看懂项目；
- 新贡献者知道如何提交数据；
- CI 和 deploy 文件存在。

不要做：

- 不要设置复杂 release pipeline；
- 不要加 semantic-release；
- 不要加 changesets。

---

### Phase 6：最终收口

目标：

- 修复 build/lint/typecheck；
- 检查 mobile；
- 检查所有链接；
- 检查 Star 入口；
- 检查免责声明；
- 检查未验证数据默认隐藏；
- 输出最终变更摘要。

最终验收命令：

```bash
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

最终人工验收：

- 首页 10 秒内能理解这是做什么的；
- 用户能直接点击 Star on GitHub；
- 无跨区套利文案；
- 无虚假价格承诺；
- 页面可静态部署。

---

## 19. 可直接复制给 Codex App 的主 `/goal` 提示词

把下面整段复制到 Codex App 中作为 `/goal`。建议在仓库根目录打开 Codex App 后执行。

```txt
/goal Build the MVP of the GPTprice repository as a static, mobile-first ChatGPT / OpenAI subscription price transparency website.

Repository:
https://github.com/YSCJRH/GPTprice

Current repo state:
The repository is very lightweight and currently only has the MIT LICENSE. Preserve the LICENSE. Do not delete existing files.

Product goal:
Create an instantly usable public webpage where users can compare ChatGPT / OpenAI subscription prices across regions, plans, platforms, currencies, sources, freshness, and confidence levels. The website should be suitable for GitHub Pages deployment and should include a prominent "Star on GitHub" entry linking to https://github.com/YSCJRH/GPTprice.

Important positioning:
This project is for public information research, price transparency, and budgeting only. It is not a cross-region purchasing guide and must not include instructions about VPNs, gift cards, fake addresses, account region changes, payment workarounds, or bypassing OpenAI / Apple / Google / payment provider rules.

Tech stack:
- Vite
- React
- TypeScript
- Tailwind CSS
- Static JSON data
- GitHub Pages
- GitHub Actions
- npm
- No backend
- No database
- No scraping
- No auth

Routing:
Use HashRouter or equivalent hash-based routing so GitHub Pages works without server rewrites:
- /#/
- /#/region/:regionCode
- /#/contribute
- /#/faq
- /#/about

Deployment:
Set Vite base to "/GPTprice/" because the repo name is GPTprice.

Required pages:
1. Home page:
   - Hero and concise project explanation
   - Compliance/disclaimer banner
   - Region search
   - Plan filter
   - Platform filter
   - Base currency selector
   - Sort selector
   - "Show unverified data" checkbox
   - Responsive price table on desktop
   - Responsive cards on mobile
   - Source badges
   - Confidence badges
   - Verified date and data updated date
   - "Star on GitHub" CTA

2. Region detail page:
   - Show all records for the region
   - Local price
   - Converted price
   - Platform differences
   - Tax note
   - Source and notes
   - Contribute update CTA

3. Contribute page:
   - How to submit price data
   - Acceptable sources
   - Unacceptable content
   - Privacy and redaction rules

4. FAQ page:
   - Why prices differ
   - Can I buy across regions?
   - Why the price differs from what I see
   - Why Web / iOS / Android differ
   - Tax explanation
   - Exchange-rate update explanation
   - What "needs verification" means
   - How to understand Pro / Codex / Business Codex pricing

5. About page:
   - Project boundary
   - Non-affiliation disclaimer
   - Data maintenance principles
   - License
   - GitHub repo link

Data model:
Create src/types/price.ts with:
- Plan: free, go, plus, pro_100, pro_200, business_standard, business_codex, enterprise, edu, legacy_team, unknown
- Platform: web, ios, android, unknown
- BillingCycle: monthly, annual, usage, custom, unknown
- TaxIncluded: true, false, varies, unknown
- SourceType: official_pricing_page, official_help_center, official_checkout, app_store_listing, google_play_listing, third_party_index, user_report, derived, unknown
- Confidence: high, medium, low, stale, conflict, needs_review
- PriceRecord fields:
  id, regionCode, countryOrRegionName, currency, plan, platform, localPrice, localPriceDisplay, billingCycle, taxIncluded, taxNote, convertedPrices, sourceType, sourceUrl, sourceNote, verifiedAt, staleAt, confidence, contributor, notes, status

Static data:
Create:
- src/data/price-data.json
- src/data/exchange-rates.json
- src/data/regions.json

Seed data rules:
- Include only a small seed dataset.
- Include official US Plus $20/month from OpenAI Help Center.
- Include official US Pro $100 and Pro $200 records from OpenAI Help Center.
- Include ChatGPT Business standard and Business Codex usage-based records from OpenAI Help Center.
- Include one Taiwan placeholder record with localPrice null, confidence needs_review, status needs_review.
- Do not invent unverified regional prices.
- Unverified records must be hidden by default and excluded from default sorting.

Currency conversion:
Implement conversion using static exchange-rates.json. If a rate is missing or localPrice is null, show "Conversion unavailable" or the localPriceDisplay. Conversion is indicative only.

Validation:
Create scripts/validate-data.mjs with basic manual validation. Do not add AJV or Zod unless absolutely necessary.
Add npm script:
- "validate:data": "node scripts/validate-data.mjs"

Validation rules:
- Required fields exist
- Record IDs are unique
- Enum values are valid
- localPrice is null or > 0
- active high-confidence records require sourceUrl
- sourceNote must not be empty
- verifiedAt must be a valid date
- old verifiedAt can warn but should not fail
- user_report cannot be high confidence unless notes include maintainer-reviewed

Docs:
Create:
- README.md
- CONTRIBUTING.md
- AGENTS.md
- .github/ISSUE_TEMPLATE/price-report.yml
- .github/ISSUE_TEMPLATE/data-correction.yml
- .github/ISSUE_TEMPLATE/feature-request.yml
- .github/pull_request_template.md

CI / Deploy:
Create:
- .github/workflows/ci.yml
- .github/workflows/deploy.yml

Use Node 22 and npm cache.
CI should run:
- npm ci
- npm run lint
- npm run typecheck
- npm run validate:data
- npm run build

Deployment should build and upload dist to GitHub Pages using actions/configure-pages, actions/upload-pages-artifact, and actions/deploy-pages.

Disclaimers:
Add bilingual disclaimer in footer, README, About, and Contribute page:
This is an unofficial open-source project. It is not affiliated with OpenAI, Apple, Google, or any payment provider. It is for price transparency and budgeting only. It does not provide or encourage bypassing regional restrictions, payment restrictions, platform rules, or terms of service. Prices, exchange rates, taxes, availability, eligibility, and features may change at any time. Final prices are determined by the official checkout page, App Store, Google Play, or service provider documentation.

Dependency discipline:
Do not add heavy dependencies.
Do not add Redux, Zustand, TanStack Table, Storybook, Playwright, Cypress, charting libraries, map libraries, backend frameworks, scraping libraries, or auth libraries.
Do not build a perfect test suite. The MVP verification surface is lint, typecheck, data validation, and production build.

Definition of done:
- npm install works
- npm run dev starts the app
- npm run lint passes
- npm run typecheck passes
- npm run validate:data passes
- npm run build passes
- Home page is usable on mobile and desktop
- Users can search, filter, sort, and convert visible price records
- Unverified records are hidden by default
- Source, confidence, tax, verified date, and notes are visible
- Header and footer include "Star on GitHub" linking to https://github.com/YSCJRH/GPTprice
- README and CONTRIBUTING explain the project and data contribution process
- CI and deploy workflows exist
- No cross-region purchase or payment workaround guidance appears anywhere

When you are close to done:
Stop expanding scope. Run the required commands, fix only blocking failures, then summarize changed files and remaining manual GitHub Pages setting required by the repository owner.
```

---

## 20. 分阶段微提示词

如果 Codex 主 `/goal` 执行时间过长，可以按阶段继续喂下面的提示词。

### 20.1 防跑偏提示词

```txt
You are drifting from the MVP. Stop expanding scope.

Do not add backend, scraping, auth, database, map, screenshot upload, notifications, Playwright, Storybook, or complex test coverage.

Return to the MVP:
- static Vite React app
- static JSON data
- searchable/filterable/sortable price table
- source/confidence/freshness labels
- bilingual disclaimer
- GitHub Star link
- README/CONTRIBUTING
- CI and GitHub Pages deploy workflow

Run only:
npm run lint
npm run typecheck
npm run validate:data
npm run build
```

### 20.2 收口提示词

```txt
Please stop feature expansion and close the MVP.

Tasks:
1. Run npm run lint, npm run typecheck, npm run validate:data, npm run build.
2. Fix only blocking errors.
3. Verify unverified records are hidden by default.
4. Verify the Star on GitHub link points to https://github.com/YSCJRH/GPTprice.
5. Verify no page contains cross-region purchasing or payment workaround guidance.
6. Summarize changed files and any manual steps needed for GitHub Pages settings.

Do not add new dependencies unless the build is impossible without them.
```

### 20.3 样式简化提示词

```txt
The current implementation is spending too much time on styling. Simplify.

Use Tailwind utility classes and a clean responsive layout:
- max-width container
- header
- disclaimer banner
- filter panel
- table on desktop
- cards on mobile
- footer

No animations, no design system, no component library, no theme engine beyond simple dark-mode-ready colors if already easy.
```

### 20.4 测试简化提示词

```txt
The MVP does not need a large test suite.

Remove or avoid non-essential tests. Keep only:
- TypeScript typecheck
- ESLint
- data validation script
- production build

Do not add Playwright, Cypress, Storybook, coverage thresholds, visual snapshots, or mock servers.
```

---

## 21. 视觉与文案建议

### 21.1 Hero 文案

英文：

```txt
Compare ChatGPT / OpenAI subscription prices across regions.
```

中文：

```txt
开源、可审计的 ChatGPT / OpenAI 订阅价格透明化面板。
```

副标题：

```txt
For budgeting and public information research only. Final prices may vary by checkout page, tax, platform, region, and currency.
```

### 21.2 风险提示 Banner

```txt
This project does not provide cross-region purchase guidance. Prices, taxes, exchange rates, availability, and plan benefits may change. Always verify final prices on the official checkout page, App Store, Google Play, or service provider documentation.
```

### 21.3 Star CTA

```txt
Useful? Star GPTprice on GitHub.
```

按钮：

```txt
⭐ Star on GitHub
```

链接：

```txt
https://github.com/YSCJRH/GPTprice
```

---

## 22. 颜色和 UI 规则

不要花太多时间设计视觉系统。使用简单、清晰、可读的样式。

建议：

- 背景：浅色为主；
- 卡片：白底、细边框、圆角；
- 重点 CTA：深色按钮；
- `high`：绿色标签；
- `medium`：蓝色标签；
- `low`：黄色标签；
- `needs_review`：灰色标签；
- `conflict`：红色标签；
- `stale`：橙色标签。

移动端：

- 表格隐藏；
- 用卡片；
- 筛选项纵向堆叠；
- Star 按钮始终可见但不要遮挡内容。

---

## 23. 数据贡献原则

贡献数据时必须要求：

- 地区；
- 计划；
- 平台；
- 本地价格；
- 币种；
- 账单周期；
- 是否含税；
- 来源类型；
- 来源链接或脱敏证明；
- 验证日期；
- 备注。

绝不接受：

- 邮箱；
- 订单号；
- 支付卡号；
- 账单地址；
- 账号截图；
- 私密发票；
- 任何绕过地区或支付规则的方法。

冲突处理：

- 不直接覆盖；
- 标记 `conflict`；
- 维护者复核；
- 默认排序只使用 active + non-conflict + non-null price。

---

## 24. 后续 V1 / V2，不进入 MVP

### V1 backlog

- 多语言切换；
- 更完整地区数据；
- 价格历史；
- 数据变更 changelog；
- JSON schema；
- 详情页图表；
- 更完善的 FAQ；
- App Store / Google Play 手动数据字段；
- 税费字段增强；
- Cloudflare Pages 或 Vercel 镜像部署。

### V2 backlog

- 汇率自动更新；
- 价格变动提醒；
- 审核队列；
- 用户提交截图但自动打码；
- API 输出；
- 可视化地图；
- Claude / Gemini / Perplexity 等多 AI 服务比较。

Codex 在 MVP 阶段不要主动实现 V1 / V2。

---

## 25. 最终验收清单

在认为完成前，Codex 必须确认：

```txt
[ ] LICENSE 保留
[ ] package.json 存在
[ ] Vite React TypeScript app 存在
[ ] Tailwind 可用
[ ] vite.config.ts base = "/GPTprice/"
[ ] Hash routing 可用
[ ] Home page 可用
[ ] Region page 可用
[ ] Contribute page 可用
[ ] FAQ page 可用
[ ] About page 可用
[ ] Header 有 Star on GitHub
[ ] Footer 有 Star on GitHub
[ ] 数据表可搜索
[ ] 数据表可筛选 plan
[ ] 数据表可筛选 platform
[ ] 数据表可切换 currency
[ ] 数据表可排序
[ ] unverified 默认隐藏
[ ] needs_review 可通过 checkbox 显示
[ ] source badge 存在
[ ] confidence badge 存在
[ ] verified date 存在
[ ] tax note 存在
[ ] disclaimer 存在
[ ] README 存在
[ ] CONTRIBUTING 存在
[ ] AGENTS.md 存在
[ ] issue templates 存在
[ ] PR template 存在
[ ] ci.yml 存在
[ ] deploy.yml 存在
[ ] npm run lint passes
[ ] npm run typecheck passes
[ ] npm run validate:data passes
[ ] npm run build passes
[ ] 无跨区购买教程
[ ] 无支付绕过指南
[ ] 无虚假价格承诺
```

---

## 26. 参考依据

这些来源只用于产品和工程边界，不代表本项目与对应公司有任何关系。

- GPTprice 仓库：`https://github.com/YSCJRH/GPTprice`
- OpenAI ChatGPT pricing：`https://chatgpt.com/pricing/`
- OpenAI Help：ChatGPT Plus：`https://help.openai.com/en/articles/6950777-what-is-chatgpt-plus`
- OpenAI Help：ChatGPT Pro tiers：`https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers`
- OpenAI Help：Multi-currency billing：`https://help.openai.com/en/articles/10421635-multicurrency-billing`
- OpenAI Help：ChatGPT Business：`https://help.openai.com/en/articles/8792828-what-is-chatgpt-business`
- OpenAI Terms of Use：`https://openai.com/policies/terms-of-use/`
- OpenAI Developers：Codex prompting / Goal mode：`https://developers.openai.com/codex/prompting`
- OpenAI Cookbook：Using Goals in Codex：`https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex`
- Vite static deploy：`https://vite.dev/guide/static-deploy`
- GitHub Docs：Saving repositories with stars：`https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars`

---

## 27. 给仓库维护者的人工操作清单

Codex 完成代码后，你需要手动做这些事：

1. 在 GitHub 仓库 About 里填写：
   - Description：`Open-source ChatGPT / OpenAI subscription price transparency dashboard`
   - Website：部署后的 GitHub Pages URL
   - Topics：`chatgpt`, `openai`, `pricing`, `subscription`, `vite`, `react`, `typescript`, `open-data`
2. 启用 GitHub Pages：
   - `Settings → Pages → Build and deployment → Source: GitHub Actions`
3. 检查 Actions 是否成功；
4. 打开 Pages URL；
5. 点击页面上的 `Star on GitHub`，确认能回到仓库；
6. 发布第一条 issue，说明需要社区贡献更多地区的已验证价格；
7. 不要在 README 或页面中添加跨区购买教程。

---

## 28. 最终产品应该是什么样

用户打开页面后，应该在 10 秒内明白：

- 这是 ChatGPT / OpenAI 订阅价格透明化工具；
- 可以搜索国家和地区；
- 可以筛选 Plus / Pro / Business / Codex；
- 可以查看 Web / iOS / Android；
- 可以换算 USD / CNY / TWD / EUR；
- 可以看到来源和可信度；
- 可以知道数据是否过期；
- 可以贡献价格数据；
- 可以点击 Star 支持项目；
- 这不是跨区购买教程。

只要达到这个状态，MVP 就完成了。不要继续扩展。
