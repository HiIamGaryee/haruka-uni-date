# Haruka Uni Date — Match Engine API

Express + TypeScript + Prisma + PostgreSQL backend.

## Setup

```bash
cp .env.example .env
# Edit DATABASE_URL and ADMIN_API_KEY

npm install
npx prisma db push
npm run db:seed
npm run dev
```

API runs at `http://localhost:3001`. Frontend proxies `/api` in dev.

## Architecture

```
src/
├── controllers/     # HTTP handlers
├── services/        # MatchEngine, Profile, Admin, AI generators
├── repositories/    # Prisma data access
├── cron/            # SoulmateMatcherCron (every 30 min)
├── dto/             # Zod validation
├── middleware/      # Admin auth, errors
└── routes/          # /api/*
```

## Key endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/profiles` | Create profile → auto match |
| GET | `/api/profiles/:id/match` | Get active match |
| POST | `/api/match/run/:userId` | Manual match trigger |
| GET | `/api/admin/overview` | Dashboard stats (requires `X-Admin-Key`) |

## Matching weights

University 10% · Faculty 5% · Course 5% · Interests 20% · Personality 15% · Lifestyle 10% · Love language 10% · Availability 10% · Dating goals 10% · Budget 5%

Minimum match score: **90%**
