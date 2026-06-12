# Haruka Uni Date

A premium hackathon-style landing page and static product demo for **Haruka Uni Date** — a university student matching platform prototype.

Match students by university, course, interests, personality, dating intention, availability, and date-plan preference. No backend. No auth. Just a polished frontend ready for demos.

## Live routes

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/demo` | Interactive match dashboard demo |
| `/about` | About Us page |
| `/faq` | FAQ page |

## Tech stack

**Frontend**

- **React 19** + **TypeScript**
- **Vite**
- **Tailwind CSS v4** (`@tailwindcss/vite`)
- **Framer Motion**
- **Lucide React**
- **React Router**

**Backend** (`server/`)

- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** + **Prisma ORM**
- **node-cron** — SoulmateMatcherCron every 30 minutes

## Tailwind CSS

Tailwind v4 is wired through Vite and used across every component.

| File | Purpose |
|------|---------|
| `vite.config.ts` | `@tailwindcss/vite` plugin |
| `src/index.css` | `@import 'tailwindcss'`, `@source` paths, `@theme` design tokens |
| `tailwind.config.ts` | IDE IntelliSense content paths |
| `src/lib/cn.ts` | `clsx` + `tailwind-merge` for class merging |

**Custom theme tokens** (use as utilities):

```tsx
<div className="bg-bg text-text border-border" />
<p className="text-muted font-display text-gradient-gold" />
<button className="bg-accent text-bg hover:bg-accent-bright" />
```

**Reusable layers** in `index.css`: `.glass`, `.glass-strong`, `.section-container`, `.text-gradient-gold`, etc. — all built with `@apply`.

```tsx
import { cn } from '@/lib/cn'

<div className={cn('rounded-2xl border p-4', isActive && 'border-accent bg-accent/10')} />
```

## Getting started

```bash
# Frontend
npm install
npm run dev

# Backend (separate terminal)
cd server && cp .env.example .env
npm install
npx prisma db push
npm run db:seed
npm run dev
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:3001/api |
| Admin dashboard | http://localhost:5173/admin-dash |
| Create profile | http://localhost:5173/onboarding |

Default admin key: set `ADMIN_API_KEY` in `server/.env` (see `server/.env.example`).

## Match engine flow

1. User creates profile → status `WAITING_FOR_MATCH`
2. `MatchEngineService` scans the waiting pool (excludes blocked/banned/matched)
3. Weighted compatibility score (min **90%** to match)
4. Creates `Match`, `SoulmateSession`, `DatePlan`, `ConversationStarter`
5. Both users → status `MATCHED`
6. Cron re-runs every **30 minutes** for new pairings

## Scripts

```bash
npm run dev          # Frontend
npm run dev:server   # Backend API
npm run db:push      # Prisma schema → PostgreSQL
npm run db:seed      # Seed demo users
npm run build        # Frontend production build
npm run lint         # ESLint
```

## Homepage sections

1. **Navbar** — sticky blurred nav with mobile drawer
2. **Hero** — headline, subtitle, CTAs, stats card
3. **Problem** — pain-point grid
4. **Solution** — product pillars
5. **How Matching Works** — 4-step flow
6. **Features** — 8-card feature grid
7. **Product Preview** — mock SaaS dashboard (profile · match score · AI date plan)
8. **CTA** — closing call to action

## Product preview dashboard

The demo dashboard shows three panels:

- **Left** — Student profile (Haruka @ Sunway University)
- **Center** — Match score with compatibility ring and signal breakdown
- **Right** — AI-generated first-date plan

No chat UI. No message bubbles.

## Project structure

```
src/
├── components/
│   ├── preview/           # Dashboard cards
│   ├── CTA.tsx            # Reusable CTA block
│   ├── FeatureCard.tsx    # Reusable feature card
│   ├── FeatureGrid.tsx
│   ├── GlassCard.tsx
│   ├── GradientBlobs.tsx
│   ├── Hero.tsx
│   ├── Navbar.tsx
│   ├── PageShell.tsx
│   ├── ProductPreview.tsx # Reusable preview section
│   ├── SectionHeader.tsx  # Reusable section heading
│   └── ...
├── data/
│   ├── homepage.ts        # Landing page copy & features
│   ├── about.ts           # About Us content
│   ├── faq.ts             # FAQ questions & answers
│   ├── navigation.ts      # Nav links
│   └── previewDashboard.ts # Mock dashboard data
├── lib/
│   ├── cn.ts
│   └── motion.ts          # Framer Motion variants
├── pages/
│   ├── HomePage.tsx
│   └── DemoPage.tsx
├── assets/
└── App.tsx
```

## Editing content

All copy and feature lists live in data files — update these to change the site without touching components:

- `src/data/homepage.ts` — hero, problem/solution, features, CTA
- `src/data/about.ts` — mission, story, values
- `src/data/faq.ts` — FAQ items
- `src/data/navigation.ts` — navbar links
- `src/data/previewDashboard.ts` — dashboard profile, match scores, date plan

Repeated UI is rendered with `const` arrays and `.map()`.

## Design

- Dark premium background with soft gradient blobs
- Glassmorphism cards with hover effects
- Gold hackathon accents + green/purple/blue spectrum highlights
- Fully responsive (iPhone → MacBook)
- Framer Motion page entrance and scroll reveals

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Type-check + production build → `dist/` |
| `npm run preview` | Serve production build locally |
| `npm run lint` | Run ESLint |

## License

Private prototype — hackathon / demo use.
