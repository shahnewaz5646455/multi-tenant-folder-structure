---
name: "ecom-manager-frontend"
description: "Build Ecom Manager frontend in Next.js + TypeScript as a 6-year senior dev: Figma → components, design tokens, DRY, central types, SOLID, mobile-first 360px, final QA."
---

# Ecom Manager Frontend Developer

Work as a senior frontend developer with 6 years of experience in Next.js (App Router), React and TypeScript. Never jump straight into JSX. Every task runs through the six phases below, in order, and ends with the QA report in Phase 6.

Project context (from the Ecom Manager Frontend Architecture Blueprint):
- Turborepo monorepo: `apps/web` (marketing), `apps/storefront` (tenant stores), `apps/merchant` (dashboard + `/pos`). Super Admin is a separate repo.
- Shared packages: `@ecm/ui` (primitives + tokens), `@ecm/api-client` (generated from OpenAPI), `@ecm/auth`, `@ecm/permissions`, `@ecm/format`, `@ecm/validation`, `@ecm/i18n`.
- Stack: Next.js 16, React 19, TypeScript strict, Tailwind CSS v4, shadcn/ui on Radix, TanStack Query v5, Zustand, nuqs, React Hook Form + Zod, next-intl (bn + en).
- Locale defaults: BDT currency, Asia/Dhaka timezone, +880 phone format, Bangla and English.
- If the code you are working in contradicts this skill, follow the existing code and tell the user what differs.

---

## Phase 1: Analyse the Figma design and break it into components

Do this before writing any code.

1. **Get the design.** If Figma tools are available, read the frame (design context, variables, screenshot). Otherwise work from the screenshot or spec the user gives. Note every breakpoint frame Figma provides (mobile 360, tablet 768, desktop 1280/1440).
2. **Extract the tokens first.** List every colour, font family, font size, line height, font weight, spacing value, radius, shadow and breakpoint the design uses. Map each to an existing token. A value with no token is either a new token (add it, Phase 2) or a designer mistake (ask; do not hard-code it).
3. **Break the screen down, top to bottom:** page → sections → blocks → components → primitives. Write it as a tree before coding, for example:

   ```text
   ProductListPage
   ├── PageHeader            (shared: components/layout)
   ├── ProductsToolbar       (route-only: _components)
   │   ├── SearchInput       (primitive: @ecm/ui)
   │   └── FilterSheet       (feature: features/products)
   ├── DataTable             (shared: components/shared)
   │   └── StatusBadge       (shared: components/shared)
   └── EmptyState            (shared: components/shared)
   ```

4. **Decide where each component lives**, using this order. Start as close to its use as possible; move it up only when a second consumer appears.

   | Used by | Location |
   | --- | --- |
   | One route only | `app/.../_components/` next to its `page.tsx` |
   | One feature | `features/<feature>/components/` |
   | Two or more features or pages (shared UI) | `components/shared/` |
   | Two or more apps, or no business meaning (Button, Input, Card) | `@ecm/ui` |

5. **Spot repetition in the design.** Two blocks that look alike with different content are ONE component with props or variants, never two copies.
6. **List every state per component:** default, hover, focus-visible, active, disabled, loading (skeleton), empty, error, success, long text / overflow, and Bangla text (it runs longer).
7. **Decide the rendering boundary.** Server Component by default. `'use client'` only on the smallest interactive leaf (input, toggle, dialog trigger). Never on a page or layout.

Share this breakdown with the user before building a whole screen.

---

## Phase 2: Design tokens, the single source of truth for styling

Colours, fonts, font sizes, spacing (padding, margin, gap), radius, shadows, z-index, breakpoints and animation durations are defined ONCE and used everywhere by name.

- Tokens live in the Tailwind v4 theme in `@ecm/ui` (for example `packages/ui/src/styles/theme.css`), as CSS variables:

  ```css
  @import "tailwindcss";

  @theme {
    --color-primary: oklch(0.55 0.15 155);
    --color-primary-foreground: oklch(0.98 0 0);
    --color-surface: oklch(1 0 0);
    --color-muted-foreground: oklch(0.55 0.02 260);
    --color-border: oklch(0.9 0.01 260);
    --color-danger: oklch(0.58 0.2 27);

    --font-sans: "Inter", "Hind Siliguri", system-ui, sans-serif;
    --text-body: 1rem;
    --text-body--line-height: 1.6;

    --spacing: 0.25rem;          /* p-4 = 16px, gap-6 = 24px */
    --radius-card: 0.75rem;
    --shadow-card: 0 1px 2px rgb(0 0 0 / 0.06);

    --breakpoint-sm: 40rem;      /* 640  */
    --breakpoint-md: 48rem;      /* 768  */
    --breakpoint-lg: 64rem;      /* 1024 */
    --breakpoint-xl: 80rem;      /* 1280 */
  }
  ```

- Use semantic names (`bg-primary`, `text-muted-foreground`, `border-border`, `rounded-card`), not raw palette names, so a rebrand or a tenant theme changes one file.
- Storefront tenant themes override the same CSS variables at runtime from tenant config (`@ecm/tenant` theme → CSS variables). Components never read tenant colours directly.
- **Forbidden in components:** hex or rgb values, arbitrary values like `w-[347px]`, `p-[13px]`, `text-[#1a1a1a]`, inline `style` for colours or spacing. Allowed exceptions: media aspect ratios and one-off art direction, with a comment saying why.
- Text styles that repeat (page title, section title, label, caption) become one component (`<Heading level>`, `<Text variant>`) or one utility, not the same class string pasted around.

---

## Phase 3: DRY, one place to change

If the same thing changes in two places, it belongs in one place. Before writing anything, search the codebase for an existing component, hook, util, schema or constant that already does it.

| Thing | Single source of truth |
| --- | --- |
| Colours, spacing, fonts | Tailwind theme tokens (Phase 2) |
| UI primitives | `@ecm/ui` |
| Shared composites (data table, form field, empty state, confirm dialog, status badge) | `components/shared/` |
| Money and date display | `<Money />` and `<DateTime />` from `@ecm/format`. Never call `toFixed` or `toLocaleString` in a component. |
| Validation rules (BD phone, amount, date range) | `@ecm/validation`; one Zod schema per form, shared by the form and its Server Action |
| API calls | `features/<x>/<x>.service.ts`, built on `@ecm/api-client` |
| Routes and links | `config/routes.ts` (`routes.products.detail(storeId, id)`), never string-built URLs in components |
| Nav menus | `config/dashboard-nav.ts` with `{ href, label, permission }` |
| Labels, enums, status lists | `*.constants.ts` (`ORDER_STATUSES`), typed `as const` |
| User-facing text | next-intl messages `bn` and `en`; no hard-coded strings |

Rules:
- **Rule of two:** the second copy of a block of JSX, a class string or logic means extract it now.
- Variants go through `cva` + the `cn()` helper (`clsx` + `tailwind-merge`), not copied components with one class changed.
- Repeated logic goes into a custom hook (`use-*.ts`) or a pure util, not copy-paste across components.
- Do not over-abstract: do not build a generic component for one use "just in case". DRY removes real repetition, not imagined repetition.

---

## Phase 4: TypeScript, with a central `types` folder

All shared types live in one types folder, so when TypeScript reports an error the source type is in one predictable place.

```text
src/types/
├── api.types.ts          # ApiResponse<T>, Paginated<T>, ApiError
├── product.types.ts      # Product, Variant, ProductStatus
├── order.types.ts        # Order, OrderStatus, OrderLine
├── customer.types.ts
├── store.types.ts        # Store, Tenant, Plan, Entitlements
├── auth.types.ts         # Session, StoreSession, Permission
├── common.types.ts       # Money, DateRange, ID, Locale
└── index.ts              # NOT a barrel; do not re-export everything
```

Rules:
- **One domain = one file**, named `<domain>.types.ts`. Import from the file directly: `import type { Order } from '@/types/order.types'`.
- **API types come from the generated OpenAPI schema** in `@ecm/api-client`. Domain files derive from them instead of retyping fields: `export type Product = components['schemas']['Product']`. Never hand-write a type the backend already defines.
- **Form types come from Zod:** `export type ProductFormValues = z.infer<typeof productSchema>`.
- **Component props:** a component's own `Props` type sits in the component file, exported, and extends the native element: `type ButtonProps = React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof buttonVariants>`. Anything used by two or more files moves to `src/types/`.
- Use `import type` for type-only imports.
- `strict: true` and `noUncheckedIndexedAccess: true`. **No `any`.** At boundaries (API responses, `searchParams`, `localStorage`, `JSON.parse`) use `unknown` and parse with Zod.
- Use discriminated unions instead of several optional booleans: `type State = { status: 'loading' } | { status: 'error'; error: string } | { status: 'success'; data: Order[] }`.
- Status and enum values are `as const` arrays plus a derived union, not TypeScript `enum`.
- No `@ts-ignore`. If you need `@ts-expect-error`, add a comment explaining why.

---

## Phase 5: SOLID, where it helps

Apply SOLID when it keeps components small and replaceable. Do not add layers a feature does not need.

- **S: Single responsibility.** A component does one job. Data fetching stays in the page or a service, behaviour in a hook, markup in the component. Split a component past about 150 lines or when it mixes fetching, state and layout.
- **O: Open/closed.** Extend through props, variants (`cva`), `children` and compound components (`<Card><Card.Header/><Card.Body/></Card>`), not by editing a shared component for one page's case or adding `if (page === 'x')`.
- **L: Liskov substitution.** A `<Button>` must work anywhere a `<button>` works: extend native props, forward `ref`, spread `...props`, keep `onClick`, `disabled`, `aria-*` and `type` behaving natively.
- **I: Interface segregation.** Small, focused props. No god components with 15 booleans. Pass what the component needs (`price`, `name`), not a whole `product` object, unless it really uses most of it.
- **D: Dependency inversion.** Components depend on hooks and services, not on `fetch` or a specific library. UI never calls the API client directly; it calls `product.service.ts` or a Server Action, so swapping the API layer touches one file.

Related project rules:
- Server Components read through services; client forms write through Server Actions that Zod-validate, then `revalidateTag`.
- Never copy server data into Zustand. Zustand is only for cart, POS ticket and UI state.
- Filters, search, sort and page live in the URL (nuqs).
- Permissions: use `can(session, 'orders.cancel')` and `<Can>`. Never compare role names. Every Server Action calls a guard first.
- Every cache tag includes the tenant id.

---

## Phase 6: Mobile-first responsive design

Design for **360px first**, then add larger breakpoints to match Figma.

- Unprefixed Tailwind classes are the 360px layout. Add `sm:`, `md:`, `lg:`, `xl:` only to change things for larger screens. Never write desktop styles first and undo them with `max-*` variants.
- Every page must work from 360px to 1440px+ with **no horizontal scroll** at any width.
- Layout:
  - Flexbox for one direction, Grid for two: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` or `grid-cols-[repeat(auto-fill,minmax(16rem,1fr))]`.
  - Figma "Hug" = `w-fit`; "Fill" = `w-full` / `flex-1`; "Fixed" only for icons and media.
  - Use `max-w-*` + `mx-auto` + side padding (`px-4 md:px-6 lg:px-8`) for page containers, not fixed widths.
  - Never fix the height of anything that holds text; use padding and `min-h-*`.
  - Add `min-w-0` on flex and grid children that contain long text, and `truncate`, `line-clamp-*` or `break-words` for user content (product names, emails, URLs).
- Tables: on mobile, show cards, or wrap the table in `overflow-x-auto` inside its own container. The page itself never scrolls sideways.
- Images: `next/image` with `sizes`, explicit dimensions or `fill` inside an `aspect-*` box; no layout shift.
- Touch: tap targets at least 44×44px on mobile; correct input types (`type="tel"` with `inputMode="numeric"` for phone numbers, `type="email"`).
- Text: body at least 14px on mobile (16px for inputs, to stop iOS zoom); test with Bangla text, which is longer.
- Navigation: sidebar becomes a drawer below `lg`; dialogs become bottom sheets on mobile where Figma shows that.
- Accessibility: semantic HTML, `aria-label` on icon-only buttons, visible `focus-visible` rings, keyboard reachable controls, colour contrast WCAG 2.1 AA.

---

## Phase 7: Final QA before saying "done"

After coding, check everything below. Do not report the work as finished until each item passes or is listed as a known issue.

### 1. Code checks (all must pass with zero errors)

```bash
pnpm tsc --noEmit        # or: pnpm turbo run typecheck --filter=<app>
pnpm lint                # eslint, including import-boundary rules
pnpm test                # vitest, if tests exist for the changed code
pnpm build               # catches server/client boundary and route errors
```

Then search the changed files for things that slip through:
- `any`, `@ts-ignore`, `console.log`
- hex colours or arbitrary values: `#[0-9a-fA-F]{3,6}`, `-\[\d+px\]`
- `toFixed(`, `toLocaleString(` in components
- hard-coded user-facing strings that belong in next-intl messages
- duplicated JSX or class strings that should be one component

### 2. Layout check at every breakpoint

Run the app (`pnpm dev`) and run this script on every page you changed. It opens each page at 360, 390, 768, 1024, 1280 and 1440px, fails on horizontal scroll, names the element sticking out past the screen edge (ignoring content inside its own scroll container), catches console errors and text under 12px, and saves full-page screenshots to `qa-shots/`.

Save it as `scripts/check-layout.mjs` (needs `playwright` installed):

```js
// Usage: node scripts/check-layout.mjs <baseUrl> [path ...]
// e.g.   node scripts/check-layout.mjs http://localhost:3000 / /products /checkout
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const [base, ...rest] = process.argv.slice(2);
if (!base) { console.error('Usage: node check-layout.mjs <baseUrl> [path ...]'); process.exit(2); }
const paths = rest.length ? rest : ['/'];
const widths = [360, 390, 768, 1024, 1280, 1440];
mkdirSync('qa-shots', { recursive: true });

const browser = await chromium.launch();
let failures = 0;

for (const path of paths) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(new URL(path, base).href, { waitUntil: 'networkidle' });

    const r = await page.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const clippedByAncestor = (el) => {
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (/(auto|scroll|hidden|clip)/.test(getComputedStyle(p).overflowX)) return true;
        }
        return false;
      };
      const sticksOut = (el) => {
        const b = el.getBoundingClientRect();
        return b.width > 0 && (b.right > vw + 1 || b.left < -1) && !clippedByAncestor(el);
      };
      const all = [...document.querySelectorAll('body *')].filter(sticksOut);
      const outermost = all.filter((el) => !all.includes(el.parentElement));
      const label = (el) => {
        const cls = [...el.classList].slice(0, 3).join('.');
        return `<${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${cls ? '.' + cls : ''}> right=${Math.round(el.getBoundingClientRect().right)}px`;
      };
      const smallText = [...document.querySelectorAll('body *')].filter((el) => {
        const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
        return own && parseFloat(getComputedStyle(el).fontSize) < 12;
      }).length;
      return {
        vw,
        scrollWidth: document.documentElement.scrollWidth,
        culprits: outermost.slice(0, 8).map(label),
        smallText,
      };
    });

    const slug = (path === '/' ? 'home' : path.replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '')) + `-${width}`;
    await page.screenshot({ path: `qa-shots/${slug}.png`, fullPage: true });

    const problems = [];
    if (res && !res.ok()) problems.push(`HTTP ${res.status()}`);
    if (r.scrollWidth > r.vw) problems.push(`horizontal scroll: page is ${r.scrollWidth}px wide in a ${r.vw}px viewport`);
    if (r.culprits.length) problems.push(`elements past the viewport edge: ${r.culprits.join(', ')}`);
    if (errors.length) problems.push(`console errors: ${errors.slice(0, 5).join(' | ')}`);
    if (r.smallText) problems.push(`${r.smallText} text elements under 12px`);

    console.log(`${problems.length ? 'FAIL' : 'PASS'}  ${path} @ ${width}px${problems.map((p) => `\n      - ${p}`).join('')}`);
    if (problems.length) failures++;
    await page.close();
  }
}

await browser.close();
console.log(failures ? `\n${failures} check(s) failed. Screenshots in qa-shots/` : '\nAll checks passed. Screenshots in qa-shots/');
process.exit(failures ? 1 : 0);
```

Pages behind login: log in once with Playwright and save `storageState`, or run the check against a dev route that seeds a session.

### 3. Visual check against Figma

Open the screenshots in `qa-shots/` (and look at them yourself if you can view images) and compare each with the matching Figma frame:
- spacing, alignment, font sizes and weights, colours match the tokens
- nothing overlaps, is cut off, or wraps badly; long names and Bangla text fit
- hover, focus, disabled, loading, empty and error states exist and look right
- images keep their aspect ratio; no layout shift while loading

### 4. Behaviour check
- Keyboard: Tab through the page; every control is reachable and shows a focus ring; dialogs trap focus and close on Esc.
- Forms: required fields show the red `*`; errors appear inline under the field (not as toasts); submit is disabled while pending.
- Data views: loading skeleton, empty state, error with retry, and pagination all work.

### 5. Report

End every task with this report:

```text
QA report: <feature / page>
Verdict: GOOD TO GO | NOT READY

Code:        typecheck ✓  lint ✓  tests ✓  build ✓
Layout:      360 ✓  390 ✓  768 ✓  1024 ✓  1280 ✓  1440 ✓  (no horizontal scroll)
Console:     no errors
Figma match: <what matches; any differences and why>
States:      loading ✓ empty ✓ error ✓ long text ✓ Bangla ✓
Known issues: <none, or each issue with the file and what is needed>
```

If anything fails, fix it and run the checks again. Say NOT READY rather than GOOD TO GO when an item is unchecked.