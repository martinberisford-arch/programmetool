# Healthcare Training Hub - Eligibility Checker

Production-focused Next.js 14 eligibility checker with admin management, conditional logic and analytics.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS + shadcn-style components
- Prisma ORM (SQLite by default, easy swap to Vercel Postgres)
- NextAuth credentials authentication
- Recharts analytics charts
- Framer Motion transitions

## Quick Start
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure env:
   ```bash
   cp .env.example .env
   ```
3. Run migrations and seed:
   ```bash
   npm run db:push
   npm run db:seed
   ```
4. Start app:
   ```bash
   npm run dev
   ```

## Authentication
- Visit `/login`.
- Default seeded user: `admin@example.com` / `ChangeMe123!` (change immediately).
- Create custom admin:
  ```bash
  npm run create-admin -- admin@yourhub.org StrongPassword123!
  ```

## Key Features Included
- **Admin dashboard** with usage and completion overview.
- **Programme management** with quick-create and status view.
- **Question management** with typed options and ordering.
- **Settings panel** for branding controls.
- **Analytics dashboard** with line/bar charts.
- **Public checker** single-question flow, progress bar, animated transitions, local save.
- **Results page** with matched programme cards and CTAs.
- **API endpoints** for session tracking, responses, completion, and CSV export.

## Database Notes
> Compatibility note: the schema intentionally stores `role`, `status`, and `question type` as strings (not Prisma enums) so SQLite deployments build cleanly on Vercel without enum connector errors.

### Recommended for Vercel: Postgres
For production Vercel deployments use Vercel Postgres:
- Switch the Prisma datasource provider in `prisma/schema.prisma` from `sqlite` to `postgresql`.
- Set `DATABASE_URL` to the Vercel Postgres connection string.
- Run `prisma migrate deploy` during build (already in `npm run build`).

### Local SQLite
- Default `.env.example` uses SQLite (`file:./dev.db`) for quick local setup.

## Deployment to Vercel
1. Push repository to GitHub.
2. Import project in Vercel.
3. Add env variables from `.env.example`.
4. Prefer Vercel Postgres and set `DATABASE_URL` (plus update datasource provider in Prisma schema).
5. Deploy (uses `vercel.json` + build script migrations).

## File Highlights
- `prisma/schema.prisma`: users, programmes, questions, rules, sessions, responses, settings.
- `src/lib/logic.ts`: reusable AND/OR eligibility evaluator.
- `src/app/(admin)/admin/*`: admin panel views.
- `src/app/checker/page.tsx`: public checker entry.
- `src/app/api/*`: data and analytics APIs.

## Future Enhancements
- Password reset via token email flow.
- Rich text editor integration for long programme descriptions.
- Drag-and-drop ordering UI for questions/programmes.
- Automated data retention cleanup job (cron).
- PWA service worker (`next-pwa`) activation in production config.
