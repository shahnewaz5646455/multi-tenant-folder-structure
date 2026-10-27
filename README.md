# Ecom Manager

Turborepo monorepo (npm workspaces) for the Ecom Manager platform. Structure follows the Frontend Architecture Blueprint (Oct 2026).

## Apps and ports

Each app is an independent Next.js server with its own hostname in production. Dev ports are only visible on localhost — the load balancer maps TLS 443 → the right app in production.

| App        | Dev port | Prod hostname                                | Owns                                         |
| ---------- | -------- | -------------------------------------------- | -------------------------------------------- |
| web        | 3000     | ecommanager.com                              | Marketing, pricing, templates, learn, experts |
| merchant   | 3001     | app.ecommanager.com                          | Dashboard, `/pos`, `/affiliate` (Phase 2)     |
| storefront | 3002     | `*.ecommanager.shop` + merchant custom domains | Tenant stores, cart, checkout                 |

The SuperAdmin lives in a **separate repository** and consumes `@ecm/ui`, `@ecm/format`, `@ecm/permissions` as published packages — see the blueprint, section D1.

## Getting started

```bash
npm install
npm run dev                              # all apps in parallel
npm run dev --workspace=@ecm/merchant    # one app
```

## Scripts

| Command                | Does                                      |
| ---------------------- | ----------------------------------------- |
| `npm run dev`          | Dev servers for every app                 |
| `npm run build`        | `turbo run build` (affected-aware in CI)  |
| `npm run lint`         | ESLint across the repo                    |
| `npm run typecheck`    | `tsc --noEmit` across the repo            |
| `npm test`             | Vitest across every workspace             |
| `npm run generate:api` | Pull OpenAPI spec → `packages/api-client` |

## Full folder structure

```
ecom-manager/
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── .npmrc
├── .prettierrc
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── turbo.json
│
├── apps/
│   ├── merchant/                              # app.ecommanager.com — dashboard + /pos + /affiliate
│   │   ├── eslint.config.mjs
│   │   ├── next.config.ts
│   │   ├── next-env.d.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── public/
│   │   └── src/
│   │       ├── proxy.ts                       # auth cookie check, redirect to /login
│   │       ├── sw.ts                          # Serwist SW (scope '/pos/' only)
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── globals.css
│   │       │   ├── page.tsx                   # redirect → /onboarding
│   │       │   ├── global-error.tsx
│   │       │   ├── (auth)/
│   │       │   │   ├── layout.tsx
│   │       │   │   └── login/page.tsx
│   │       │   ├── (onboarding)/
│   │       │   │   └── onboarding/page.tsx
│   │       │   ├── (dashboard)/
│   │       │   │   └── [storeId]/
│   │       │   │       ├── layout.tsx         # requireStoreAccess
│   │       │   │       ├── page.tsx           # setup checklist, plan card
│   │       │   │       ├── orders/page.tsx
│   │       │   │       ├── products/page.tsx
│   │       │   │       ├── categories/page.tsx
│   │       │   │       ├── customers/page.tsx
│   │       │   │       ├── inventory/page.tsx
│   │       │   │       ├── shipping/page.tsx
│   │       │   │       ├── payments/page.tsx
│   │       │   │       ├── promo-codes/page.tsx
│   │       │   │       ├── analytics/page.tsx
│   │       │   │       ├── store-design/page.tsx
│   │       │   │       ├── resell/page.tsx
│   │       │   │       └── settings/page.tsx
│   │       │   ├── (pos)/
│   │       │   │   └── pos/[storeId]/
│   │       │   │       ├── layout.tsx         # requirePermission('pos.sell')
│   │       │   │       ├── page.tsx           # sell screen
│   │       │   │       ├── shift/page.tsx
│   │       │   │       └── returns/page.tsx
│   │       │   ├── (affiliate)/
│   │       │   │   └── affiliate/page.tsx
│   │       │   └── api/
│   │       │       ├── auth/refresh/route.ts  # BFF token rotation
│   │       │       └── events/route.ts        # SSE relay (new orders, stock)
│   │       ├── features/
│   │       │   └── pos/
│   │       │       ├── db.ts                  # Dexie: products, stock, outbox, meta
│   │       │       ├── outbox.ts              # enqueue, flush, idempotency keys
│   │       │       ├── sync.worker.ts
│   │       │       ├── scanner.ts             # HID burst detection
│   │       │       ├── shortcuts.ts           # tinykeys F2/F4/F8/Esc
│   │       │       ├── pos.store.ts           # Zustand ticket/tender
│   │       │       └── components/
│   │       ├── components/
│   │       │   ├── layout/
│   │       │   └── shared/
│   │       └── lib/
│   │           └── dashboard-nav.ts           # { href, label, permission, feature }
│   │
│   ├── storefront/                            # *.ecommanager.shop + custom domains
│   │   ├── eslint.config.mjs                  # extra: no 'use client' in blocks/
│   │   ├── next.config.ts                     # custom image loader (D2 rule 5)
│   │   ├── next-env.d.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── public/
│   │   └── src/
│   │       ├── proxy.ts                       # host → tenant, rewrite /[domain]
│   │       ├── app/
│   │       │   ├── layout.tsx
│   │       │   ├── globals.css
│   │       │   ├── [domain]/
│   │       │   │   ├── layout.tsx             # tenant theme → CSS vars
│   │       │   │   ├── page.tsx               # home from page-builder blocks
│   │       │   │   ├── c/[slug]/page.tsx      # category (nuqs state)
│   │       │   │   ├── p/[slug]/page.tsx      # product detail
│   │       │   │   ├── cart/page.tsx
│   │       │   │   ├── checkout/page.tsx
│   │       │   │   ├── order/[orderNo]/page.tsx
│   │       │   │   ├── track/page.tsx
│   │       │   │   ├── pages/[slug]/page.tsx
│   │       │   │   ├── account/page.tsx
│   │       │   │   ├── maintenance/page.tsx
│   │       │   │   ├── not-found.tsx
│   │       │   │   ├── sitemap.ts
│   │       │   │   └── robots.ts
│   │       │   ├── preview/[token]/page.tsx   # iframe target for merchant builder
│   │       │   └── api/
│   │       │       ├── revalidate/route.ts    # backend → revalidateTag per tenant
│   │       │       └── webhooks/[provider]/route.ts
│   │       ├── blocks/                        # hero, product-grid, banner, gallery…
│   │       ├── features/                      # catalog, cart, checkout, tracking
│   │       └── lib/
│   │           ├── tenant-cache.ts            # THE ONLY place cache tags are built
│   │           └── image-loader.ts            # CDN loader (not Next's optimiser)
│   │
│   └── web/                                   # ecommanager.com — marketing
│       ├── eslint.config.mjs
│       ├── next.config.ts
│       ├── next-env.d.ts
│       ├── package.json
│       ├── tsconfig.json
│       ├── public/
│       └── src/app/
│           ├── layout.tsx
│           ├── globals.css
│           └── page.tsx
│
├── packages/
│   ├── api-client/                            # @ecm/api-client
│   │   ├── package.json                       # exports: ., ./schema, ./errors
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── client.ts                      # tenant + auth + impersonation headers
│   │       ├── errors.ts                      # ApiError + 422 field errors
│   │       └── schema.d.ts                    # GENERATED — don't edit
│   │
│   ├── auth/                                  # @ecm/auth (server-only)
│   │   ├── package.json                       # exports: ., ./guards, ./session
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── session.ts                     # __Host- cookies, getStoreSession
│   │       └── guards.ts                      # requireUser, requireStoreAccess, requirePermission
│   │
│   ├── permissions/                           # @ecm/permissions
│   │   ├── package.json                       # exports: ., ./catalogue
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── catalogue.ts                   # PERMISSIONS, StoreSession, can()
│   │
│   ├── tenant/                                # @ecm/tenant
│   │   ├── package.json                       # exports: ., ./resolve, ./theme
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── types.ts
│   │       ├── resolve.ts                     # edge-cached host → tenant lookup
│   │       └── theme.ts                       # TenantTheme → CSS variables
│   │
│   ├── validation/                            # @ecm/validation
│   │   ├── package.json                       # exports: ., ./bd
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── bd.ts                          # bdPhone, bdtAmount, bdAddress, dateRange
│   │
│   ├── format/                                # @ecm/format
│   │   ├── package.json                       # exports: ., ./money, ./datetime
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── money.tsx                      # <Money/> — BDT, bn-BD numerals
│   │       └── datetime.tsx                   # <DateTime/> — Asia/Dhaka
│   │
│   ├── i18n/                                  # @ecm/i18n
│   │   ├── package.json                       # exports: ., ./messages/*
│   │   ├── tsconfig.json
│   │   ├── src/index.ts
│   │   └── messages/
│   │       ├── en/common.json
│   │       └── bn/common.json
│   │
│   ├── page-schema/                           # @ecm/page-schema
│   │   ├── package.json                       # exports: ., ./blocks
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       └── blocks.ts                      # Hero, ProductGrid, Banner, Gallery…
│   │
│   ├── tracking/                              # @ecm/tracking — storefront ONLY
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── src/index.ts                       # trackPurchase, sendPurchaseToCapi
│   │
│   ├── testing/                               # @ecm/testing
│   │   ├── package.json                       # exports: ., ./msw, ./fixtures
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── index.ts
│   │       ├── msw.ts
│   │       └── fixtures.ts
│   │
│   ├── ui/                                    # @ecm/ui — merchant + web (NOT storefront)
│   │   ├── package.json                       # per-component exports (no barrel)
│   │   ├── tsconfig.json
│   │   └── src/
│   │       ├── cn.ts
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── card.tsx
│   │       ├── data-table.tsx                 # TanStack adapter
│   │       ├── can.tsx                        # <Can permission=… /> UI gate
│   │       └── styles.css
│   │
│   ├── eslint-config/                         # @ecm/eslint-config
│   │   ├── package.json
│   │   ├── index.mjs                          # boundaries matrix (apps ↔ packages)
│   │   ├── next.mjs                           # + core-web-vitals, layout.tsx guard
│   │   └── react-library.mjs
│   │
│   ├── typescript-config/                     # @ecm/typescript-config
│   │   ├── package.json
│   │   ├── base.json                          # strict + noUncheckedIndexedAccess
│   │   ├── nextjs.json
│   │   ├── react-library.json
│   │   └── node-library.json
│   │
│   └── tailwind-config/                       # @ecm/tailwind-config
│       ├── package.json
│       └── theme.css                          # @theme tokens, tenant-overridable
│
└── tooling/
    └── scripts/
        └── generate-api.ts                    # OpenAPI spec → packages/api-client/src/schema.d.ts
```

## Package import rules (enforced by `eslint-plugin-boundaries`)

| Package                                        | May import                  | Must NOT import                                      |
| ---------------------------------------------- | --------------------------- | ---------------------------------------------------- |
| `ui`                                           | config packages             | `api-client`, `auth`, any app                        |
| `api-client`                                   | nothing internal            | React, Next.js                                       |
| `auth`, `tenant`                               | `api-client`                | `ui`, any app                                        |
| `format`, `validation`, `permissions`, `page-schema` | nothing internal      | React (except `format`'s two components), Next.js    |
| `tracking`                                     | `api-client`                | `ui`; **only** used by `storefront`                  |
| any app                                        | any package                 | another app                                          |

## Blueprint references

Every non-trivial file carries a comment pointing at the relevant blueprint section (C — folder structure, D1 — multi-tenancy, D2 — performance isolation, D3 — RBAC, D4 — POS). Open the file; the "why" is there.
