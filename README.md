# Gantry

**A multi-tenant Visitor Management System UI** built with React, TypeScript, Vite, and Tailwind CSS.

Gantry is a frontend-only demonstration project that simulates how multiple organizations use a single visitor management platform. It has no backend, no database, and no real authentication — all data is local and mock.

---

## What It Demonstrates

This project was built to satisfy a set of React/TypeScript mentor requirements. Every feature was chosen to make a concept visible in the UI, not just present in the code.

| Concept | Where |
|---|---|
| **React hooks** | `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`, `useReducer` — each in a justified real use case |
| **Custom hooks** | `useVisitors`, `usePagination`, `useForm` — extracted from repeated page logic |
| **Zod validation** | Register Visitor (2-step form), Settings pages |
| **Lazy loading** | All 21 page routes — 34 code-split chunks in production |
| **Pagination** | Visitors table — 10 per page with Previous/Next |
| **Custom components** | 11 reusable UI primitives + 3 layout components |
| **Multi-tenant architecture** | Tenant switcher — switching updates every page in real time |
| **Unique UI** | Industrial/security aesthetic — no purple, no blue gradients, no glassmorphism |
| **Vite + Tailwind v4** | Build tooling + CSS-in-theme design tokens |
| **TypeScript** | Strict types throughout — no `any` |

---

## Tech Stack

| Tool | Version |
|---|---|
| React | 19 |
| TypeScript | 6 |
| Vite | 8 |
| Tailwind CSS | 4 |
| React Router | 8 |
| Zod | 4 |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — redirects automatically to `/platform`.

```bash
# Type check + production build
npm run build

# Lint
npm run lint
```

---

## The Three Areas

Gantry simulates three distinct roles, each with its own layout and navigation:

### Platform Admin (`/platform`)
Oversees all tenant organizations on the platform.
- View and search all organizations
- Drill into any organization to see its employees and visitors
- Manage platform-level users and activity log
- Platform settings with Zod validation

### Tenant Admin (`/tenant`)
Manages one organization's visitor operations.
- Switch between tenants using the sidebar switcher — all pages update instantly
- Full visitor table with search, status filtering, and pagination
- Two-step visitor registration form (`useReducer` + Zod)
- Appointments, employees, reports, history, settings

### Staff / Reception (`/staff`)
Handles day-to-day visitor check-ins at the front desk.
- Today's visitors with search
- Quick visitor registration form
- Visitor history

---

## Multi-Tenancy

```
Gantry Platform
│
├── Acme Technologies   (enterprise, 28 visitors, 8 employees)
├── Beta Solutions Ltd  (pro, 16 visitors)
├── Gamma Logistics     (pro, 16 visitors)
├── Delta Consulting    (starter)
├── Epsilon Enterprises (starter, paused)
└── Zeta Capital        (enterprise, paused)
```

The **Tenant Switcher** in the sidebar lets you switch between organizations. Every tenant page — visitors, employees, appointments, reports, history — immediately reflects the selected tenant's data. This makes the multi-tenant architecture visible rather than implicit.

---

## Project Structure

```
src/
├── app/
│   ├── layouts/         # PlatformLayout, TenantLayout, StaffLayout
│   └── router/          # createBrowserRouter, lazy page imports, PageLoader
│
├── components/
│   ├── layout/          # Sidebar, Topbar, TenantSwitcher
│   └── ui/              # Badge, Button, EmptyState, Input, Modal,
│                        # PageHeader, Pagination, SearchInput,
│                        # Select, StatCard, Table
│
├── context/             # TenantContext (.ts + .tsx split)
├── data/                # Mock visitors, employees, organizations, appointments
├── hooks/               # usePagination, useVisitors, useForm
├── lib/                 # format.ts (formatTime, formatDate, formatDateTime)
├── pages/
│   ├── platform/        # Dashboard, Organizations, OrganizationDetail,
│   │                    # Users, Activity, Settings
│   ├── tenant/          # Dashboard, Visitors, RegisterVisitor,
│   │                    # TodayVisitors, Appointments, Employees,
│   │                    # Reports, Settings, History
│   └── staff/           # Dashboard, TodayVisitors, RegisterVisitor, History
├── styles/              # index.css (Tailwind v4 @theme tokens)
└── types/               # Visitor, Employee, Organization, Appointment
```

---

## Design System

Gantry uses an **industrial / security aesthetic** — the kind of interface you would expect at a physical access control desk, not a SaaS marketing dashboard.

**Palette:**
- `paper` (#F4F1EA) — warm off-white page background
- `charcoal` (#171A17) — sidebar navigation
- `amber` (#C8781A) — primary accent, active states, stat card values
- `green` / `red` — status indicators
- No purple. No blue gradients. No glassmorphism.

**Fonts** (Google Fonts):
- Inter — UI text
- JetBrains Mono — numbers, timestamps, labels, badges

**Tailwind v4 tokens** — all colors, radius, type scale, and letter spacing are defined in `src/styles/index.css` inside a single `@theme {}` block. No `tailwind.config.js` needed.

---

## Hooks Reference

| Hook | File | Pattern it replaces |
|---|---|---|
| `useVisitors` | `hooks/useVisitors.ts` | Repeated `visitors.filter(v => v.tenantId === 'acme')` across 7 pages |
| `usePagination` | `hooks/usePagination.ts` | Inline `useState(page)`, manual slice, disabled checks |
| `useForm` | `hooks/useForm.ts` | Repeated `useState` trio + `safeParse` block in 3 form pages |

---

## Lazy Loading

Every page is lazy-loaded using `React.lazy()`:

```ts
// src/app/router/lazyPages.ts
export const TenantDashboard = lazy(() => import('@/pages/tenant/Dashboard'))
// ... 20 more
```

All lazy components are wrapped in a `<Suspense>` boundary via `PageLoader.tsx`, which renders a minimal "Loading…" fallback. The production build produces **34 separate JS chunks**.

---

## Mock Data

| Dataset | Records | Notes |
|---|---|---|
| Visitors | 60 | Acme: 28, Beta: 16, Gamma: 16 |
| Employees | 8 | All `acme` — used for host dropdowns |
| Organizations | 6 | Mix of plans (starter/pro/enterprise) and statuses |
| Appointments | 6 | All `acme` |

---

## Known Limitations

- No backend, API, or database — all data is in-memory
- Switching tenants does not reset open forms
- Employees and appointments only exist for Acme — Beta/Gamma show empty states in those sections (intentional, demonstrates the empty state pattern)
- Font loading depends on Google Fonts availability
