---
name: "ecom-manager-i18n"
description: "Add bilingual (English + Bangla) localization to any page in Ecom Manager using next-intl + @ecm/i18n following the project's established structural-config pattern. Triggered by phrases like 'localize X page', 'add i18n to X', 'translate X to bangla', 'make X bilingual', 'this page should be in both languages'."
---

# Ecom Manager Localization

Work as a senior frontend engineer who knows this project's i18n system inside out. The infrastructure (next-intl, `[locale]` routing, proxy, locale switcher, font switching) is **already built** — your job is to add a new page or section to that system **without re-doing or breaking the plumbing**.

Follow the eight phases below in order. Do not skip. End with the QA report in Phase 8.

---

## System overview (do not reinvent)

**Routing**: Prefix-based with `localePrefix: 'as-needed'`. English stays at `/pricing`; Bangla at `/bn/pricing`.
- `apps/web/src/i18n/routing.ts` — `routing` definition. **Do not edit** unless adding a locale.
- `apps/web/src/i18n/navigation.ts` — exports locale-aware `Link`, `useRouter`, `usePathname`, `redirect`. **Always use these**, never `next/link`.
- `apps/web/src/i18n/request.ts` — loads messages per request. **Do not edit** for new pages.
- `apps/web/src/proxy.ts` — Next 16 middleware. **Do not edit**.
- `apps/web/next.config.ts` — wrapped with `createNextIntlPlugin`. **Do not edit**.

**Message catalog**: `packages/i18n/`
- `src/index.ts` — exports `LOCALES`, `DEFAULT_LOCALE`, `TIMEZONE`, `isLocale`, `loadMessages`. Contains `NAMESPACES = ['common', 'nav', 'footer', 'home', 'pricing']`. **Edit only to add a new namespace.**
- `messages/en/<ns>.json` and `messages/bn/<ns>.json` — mirrored structures. **Nested JSON objects**, not flat dot-keys.

**Page structure**: Every page lives under `apps/web/src/app/[locale]/`. Every page file calls:
```tsx
export default async function MyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);  // enables SSG for this page
  // ...
}
```

**Font switching**: `app/[locale]/layout.tsx` picks `font-sans` (Inter) for en and `font-bn` (Noto Sans Bengali → Hind Siliguri) for bn based on `locale`. Bengali digits use the Bengali font via `font-bn` on body. **Do not touch** per page.

**Locale switcher**: `components/layout/locale-switcher.tsx`. Already mounted in `SiteHeader` and `MobileNav`. **Do not touch** unless the UX changes.

---

## Phase 1: Audit the page

Do this before writing any code.

1. **Enumerate the page's component tree.** Open the `page.tsx` and every `_components/*.tsx` it imports. Also open every `components/marketing/*` and `components/layout/*` leaf used. Make a tree:
   ```
   DashboardPage (app/[locale]/dashboard/page.tsx)
   ├── SiteHeader                   (shared, already translated — skip)
   ├── OverviewSection              (_components)
   │   ├── StatCard                 (shared leaf — check for hard-coded text!)
   │   └── RecentOrdersTable        (_components)
   └── SiteFooter                   (shared, already translated — skip)
   ```

2. **Inventory every string.** For each component in the tree:
   - Section components in `_components/` — any JSX text, aria-label, title/alt, placeholder.
   - Config files imported by the sections (`config/landing-*.ts` style) — any `label`, `title`, `description`, `name`, `badge`, `pitch`, `subtitle`, `heading`, `question`, `answer`, etc.
   - Shared leaf components — any text inside the component itself (NOT already received via props).

   Record: `file:line → "the string"` for each. **If this is more than ~20 strings, use TaskCreate to track per-section progress**.

3. **Flag the leaves that need text-as-props conversion.** Shared components in `components/marketing/*` or `components/layout/*` should stay dumb — they should not call `useTranslations` themselves. If one has a hard-coded string, mark it for Phase 6.

4. **Decide the namespace.** One namespace per page, named after the route segment (e.g. `dashboard`, `checkout`, `orders`). Do NOT reuse an existing namespace unless the strings genuinely belong to that surface (e.g. a new header item goes in `nav.json`, not a new namespace).

Deliverable: a tree + a flat list of all strings + the chosen namespace name.

---

## Phase 2: Design the namespace shape

Use nested JSON, not flat dot-keys. Mirror the component tree.

```json
{
  "overline": "...",
  "title": "...",
  "subtitle": "...",
  "sectionOne": {
    "heading": "...",
    "items": {
      "foo": { "label": "...", "description": "..." },
      "bar": { "label": "...", "description": "..." }
    }
  },
  "sectionTwo": { ... }
}
```

Design rules:
- **One stable key per iterable item.** For arrays of similar items (features, plans, FAQ entries), choose a short lowercase key (`shipping`, `pos`, `trial`). Keep the SAME keys across both locales.
- **Interpolation uses ICU syntax**: `"copyright": "© {year} Ecom Manager."` — call with `t('copyright', { year: 2026 })`.
- **Features arrays** per plan/item: use JSON arrays. Component reads via `t.raw(\`plans.\${key}.features\`) as readonly string[]`.
- **Optional keys** (e.g. `badge` only on featured plan): use `t.has(key)` to guard before `t(key)`, since `t()` throws on missing keys.
- **Boolean cells in compare tables**: use `"✓"` and `"✗"` sentinel strings. Components detect these and swap for icons. See `pricing.json` → `compare.groups.*.rows.*.values` for the pattern.
- **Non-translatable identifiers** (brand names like "bKash", icon imports, hex colors, hrefs, numeric chart data) stay in the TypeScript config, not in JSON.

Deliverable: both `messages/en/<ns>.json` and `messages/bn/<ns>.json` skeleton with placeholder values.

---

## Phase 3: Register the namespace + author messages

1. **Edit `packages/i18n/src/index.ts`** — add the new namespace to the tuple:
   ```ts
   const NAMESPACES = ['common', 'nav', 'footer', 'home', 'pricing', '<newNs>'] as const;
   ```
   This single line is required — `loadMessages` iterates this list, so forgetting it means the namespace won't ship.

2. **Write `packages/i18n/messages/en/<ns>.json`** with real English copy from the audit.

3. **Mirror as `packages/i18n/messages/bn/<ns>.json`** — translate per the Bangla guidelines below. Every string must be present in both locales; a missing key will throw at render time.

Deliverable: NAMESPACES updated, both JSON files complete with real copy.

---

## Phase 4: Restructure configs

For every `config/*.ts` file imported by the page's section components, strip all displayable strings. Keep only:
- Stable keys (`'free'`, `'starter'`, `'shipping'`) that match the JSON keys
- Icon references (`icon: Truck`)
- Hex colors, numeric data (chart bars, percents), hrefs
- Visual flags (`featured: true`, `billingNoteTone: 'success'`, `ctaVariant: 'primary'`)

Example — before:
```ts
export const TOOLKIT_FEATURES = [
  { icon: Truck, title: 'Shipping & delivery', description: 'Delivery zones...' },
  { icon: Package, title: 'Inventory', description: 'Stock across...' },
] as const;
```

After:
```ts
export type ToolkitFeature = { key: string; icon: LucideIcon };
export const TOOLKIT_FEATURES: readonly ToolkitFeature[] = [
  { key: 'shipping', icon: Truck },
  { key: 'inventory', icon: Package },
] as const;
```

Update the TypeScript types in `types/*.types.ts` if needed. Delete types that only existed to carry display text.

Deliverable: every landing-*.ts / page-config.ts touches is reduced to structural data.

---

## Phase 5: Translate section components

For each section component in `_components/`:

1. **Add the hook**:
   ```tsx
   import { useTranslations } from 'next-intl';
   // ...
   const t = useTranslations('<ns>.<section>');  // or just '<ns>' if the section is top-level
   ```

2. **Replace every string** with `t('key')` or `t(\`items.\${entry.key}\`)` for dynamic lookups.

3. **Compose display data** from (config + translations) at the top of the component:
   ```tsx
   const kpis = HERO_KPI_KEYS.map((key) => ({
     label: t(`kpis.${key}.label`),
     value: t(`kpis.${key}.value`),
   }));
   ```

4. **Replace internal `<a>` with `<Link>`** from `@/i18n/navigation` so hrefs stay locale-aware.

5. **If a leaf component previously received a config object (`plan: Plan`, `tile: FeeTile`)**, build the object in the section from config + translations, then pass it down. Do NOT make the leaf call `useTranslations`.

6. **Client components** (`'use client'`) use `useTranslations` the same way as server components in next-intl v4. No API difference.

Deliverable: every section component renders zero hard-coded user-facing strings.

---

## Phase 6: Convert leaf components with hard-coded text

If Phase 1 flagged any shared `components/marketing/*` or `components/layout/*` leaves with hard-coded text:

- **Make the text a prop**, don't add `useTranslations` to the leaf. Reason: the leaf is reused across pages that may want different copy or no copy; translations are a parent concern.
- Caller passes the translated string down.

Example:
```tsx
// Before — DashboardPreview had hard-coded "Today" and "Live"
<h3>Today</h3>
<Badge>Live</Badge>

// After — props-driven
export type DashboardPreviewProps = {
  todayLabel: string;
  liveLabel: string;
  // ...
};
<h3>{todayLabel}</h3>
<Badge>{liveLabel}</Badge>

// Caller (section component):
<DashboardPreview
  todayLabel={t('dashboard.today')}
  liveLabel={t('dashboard.live')}
  kpis={kpis}
  bars={bars}
/>
```

Exception: if a leaf renders the SAME small label in every usage and has no other reason to vary (e.g. an aria-only utility), it may call `useTranslations('common.<key>')` directly. Prefer props.

---

## Phase 7: Verify

Run, in order:

1. **Typecheck both packages**:
   ```bash
   cd /d/ecom-manager && npx turbo run typecheck --filter=@ecm/web --filter=@ecm/i18n
   ```
   Must be clean.

2. **Build the web app**:
   ```bash
   cd /d/ecom-manager/apps/web && rm -rf .next && npm run build
   ```
   Must prerender **both** `/<path>` (English) and `/bn/<path>` as ● SSG. If one is missing, the page probably forgot `setRequestLocale(locale)`.

3. **Smoke-test content** (dev server at :3000 or whatever port):
   ```bash
   curl -s http://localhost:3000/<path> | grep -oE '<signature english string>' | head -3
   curl -s http://localhost:3000/bn/<path> | grep -oE '<signature bangla string>' | head -3
   ```
   Pick one distinctive string per section and confirm it appears in the right locale.

4. **Leak check** — a hard-coded English string should NOT appear in the Bangla output:
   ```bash
   curl -s http://localhost:3000/bn/<path> | grep -c 'some unique English phrase'   # expect 0
   ```
   If > 0, a hard-coded string slipped through. Grep the source for it and fix.

5. **HTML attributes**: confirm `<html lang="bn">` on /bn pages and body class `font-bn`:
   ```bash
   curl -s http://localhost:3000/bn/<path> | grep -oE '<html lang="[^"]+"'
   curl -s http://localhost:3000/bn/<path> | grep -oE 'body class="[^"]*font-[a-z]+'
   ```

---

## Phase 8: QA report

End the session with a compact report:

```markdown
## i18n: <page> → bilingual

**Namespace**: `<ns>` (added to packages/i18n/src/index.ts)
**Strings extracted**: <N> across <M> sections
**Configs restructured**: <files>
**Shared leaves refactored**: <files or "none">
**Build**: ✓ en + bn prerendered (<N> ● SSG pages total)
**Spot-checks**:
- /<path> → "<english sample>"
- /bn/<path> → "<bangla sample>"
```

---

## Patterns reference (copy-paste starters)

### Server component with translations
```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function FooSection() {
  const t = useTranslations('foo');
  return (
    <section>
      <h2>{t('title')}</h2>
      <Link href="/pricing">{t('cta')}</Link>
    </section>
  );
}
```

### Dynamic lookup over a config loop
```tsx
const t = useTranslations('toolkit.features');
TOOLKIT_FEATURES.map(f => (
  <FeatureTile
    key={f.key}
    icon={f.icon}
    title={t(`${f.key}.title`)}
    description={t(`${f.key}.description`)}
  />
))
```

### Optional key with has()
```tsx
const badge = t.has(`plans.${key}.badge`) ? t(`plans.${key}.badge`) : undefined;
```

### Array value via raw()
```tsx
const features = t.raw(`plans.${key}.features`) as readonly string[];
```

### Interpolation
```tsx
<p>{t('copyright', { year: new Date().getFullYear() })}</p>
// JSON: "copyright": "© {year} Ecom Manager."
```

### Boolean sentinel for compare-table-style cells
```json
"values": { "free": "✗", "starter": "✓", "pro": "✓" }
```
```tsx
// Component recognizes "✓" / "✗" and swaps for icons; see pricing CompareCell.
```

### Page file (always)
```tsx
import { setRequestLocale } from 'next-intl/server';

export default async function MyPage({
  params,
}: { params: Promise<{ locale: string }> }): Promise<JSX.Element> {
  const { locale } = await params;
  setRequestLocale(locale);
  return <>...</>;
}
```

---

## Bangla translation guidelines

- **Numerals**: use Bengali digits ০-৯ for all displayable numbers (prices, counts, dates, time, percentages). English Latin numerals in Bangla UI look foreign. Example: `"৳ ২,২৪৩"` not `"৳ 2,243"`.
- **Currency**: keep the `৳` symbol. Format with Bangla number grouping if natural (lakhs/crores).
- **Punctuation**: use `।` (Bangla full stop) at sentence ends in body copy. For UI labels, standard `.` is fine. Keep `—`, `·`, `/` as-is.
- **Brand names**: keep `bKash`, `Nagad`, `Pathao`, `RedX`, `SSLCOMMERZ`, `Ecom Manager` in Latin even in Bangla (brand recognition). You MAY also use Bangla spelling for well-known names (`পাঠাও`, `রেডএক্স`) where it reads naturally in context.
- **Technical terms**: common English technical nouns (`পিওএস`, `এসএমএস`, `এআই`, `কুরিয়ার`, `অর্ডার`, `টেমপ্লেট`, `কাস্টম ডোমেইন`, `পিক্সেল`, `সিওডি`) are standard in Bangladeshi commerce — use Bangla phonetic spelling, don't force unnatural pure-Bangla equivalents.
- **Tone**: direct, conversational — match the English register. BD seller audience, not formal literary Bangla.
- **Date/time**: AM/PM → `সকাল`/`রাত`/`দুপুর` where natural, else keep AM/PM.
- **Length check**: Bangla sentences often run 10–20% longer than English. Check layout for wrap/overflow on button and tile widths after translating.

---

## DO NOT

- ❌ Hard-code any user-facing string, even temporarily. If you need a placeholder, create the JSON key first.
- ❌ Use `next/link` or `useRouter` from `next/navigation`. **Always** use the wrappers from `@/i18n/navigation`.
- ❌ Edit `apps/web/src/i18n/routing.ts`, `src/i18n/request.ts`, `src/i18n/navigation.ts`, or `src/proxy.ts` for new pages — these are infrastructure. Only touch them to add a new locale.
- ❌ Edit `apps/web/src/app/[locale]/layout.tsx` for new pages. The fonts, provider, and `<html lang>` are handled.
- ❌ Add a new NAMESPACE without updating `packages/i18n/src/index.ts` — the import loop ignores files not in that list.
- ❌ Use flat dot-keys like `"nav.pricing": "Pricing"` in JSON. Use nested objects: `{ "nav": { "pricing": "Pricing" } }`.
- ❌ Call `useTranslations` inside shared `components/marketing/*` or `components/layout/*` leaves. Pass labels as props from the section component instead.
- ❌ Leave strings in `config/landing-*.ts` after Phase 4. Configs are structure-only.
- ❌ Omit `setRequestLocale(locale)` in page files. The page will fall back to dynamic rendering and lose SSG.
- ❌ Use Latin digits in Bangla JSON for prices, counts, dates, or percentages.
- ❌ Translate brand names, lucide-react icon identifiers, hex colors, or route hrefs.
- ❌ Add `getTranslations` unless the surrounding function is already `async` for other reasons — `useTranslations` is simpler and works in server components in next-intl v4.
- ❌ Skip Phase 7 verification. "typecheck passed" alone doesn't catch missing JSON keys — those throw at render time.

---

## Reference examples (read these before starting)

- **Simple namespace, flat structure**: `packages/i18n/messages/{en,bn}/nav.json` + consumer `apps/web/src/components/layout/site-header.tsx`.
- **Deeply nested with iterable items**: `packages/i18n/messages/{en,bn}/home.json` → `toolkit.features.*` + consumer `app/[locale]/_components/toolkit-section.tsx`.
- **Interpolation**: `messages/{en,bn}/footer.json` → `copyright` + consumer `components/layout/site-footer.tsx`.
- **Arrays via `t.raw()`**: `messages/{en,bn}/pricing.json` → `plans.*.features` + consumer `app/[locale]/pricing/_components/plans-section.tsx`.
- **Optional keys via `t.has()`**: same consumer, see `badge` and `priceSuffix` handling.
- **Boolean sentinel compare cells**: `messages/{en,bn}/pricing.json` → `compare.groups.*.rows.*.values` + consumer `pricing/_components/compare-cell.tsx` + table components.
- **Props-driven leaf refactor**: `components/marketing/dashboard-preview.tsx` (took `todayLabel`, `liveLabel`), `components/marketing/sales-split-card.tsx` (took `onlineLabel`, `codLabel`), `components/marketing/theme-card.tsx` (took `previewLabel`).
- **Locale switcher**: `components/layout/locale-switcher.tsx` — do not duplicate; it's already mounted.
