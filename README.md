# majidkagar.ir

Personal portfolio (Next.js App Router, next-intl, Tailwind CSS, MongoDB).

## MongoDB setup

Project data (the `projects` list) is stored in MongoDB. The app reads from it
at request/build time and falls back to the local constants in
`src/constants/projects.ts` when the database isn't configured.

1. **Vercel:** the MongoDB integration injects `MONGODB_URI` automatically into
   your deployment (Project Settings -> Environment Variables). Nothing to do
   here.
2. **Local dev:** copy the same `MONGODB_URI` value into a `.env.local` file at
   the repo root. See `.env.example`.

### Seeding the data

To push the projects from `src/constants/projects.ts` and the icons from
`src/constants/icons.ts` into MongoDB (replaces the whole `projects` and
`icons` collections):

```bash
npm run seed
```

Run it locally once after setting `MONGODB_URI`, and again whenever you change
the project list. Pages revalidate hourly (`revalidate = 3600`); on Vercel a
redeploy also refreshes them.

To check the connection without changing anything:

```bash
npm run check:db
```

The seed/check scripts read `MONGODB_URI` from `.env` or `.env.local`
(`.env.local` wins). `next dev`/`next build` also pick up `.env` automatically.

## Admin page

The private admin at `/en/admin` lets you add, edit and delete projects in
MongoDB (not linked in the navigation). Guard it with `APP_PASSWORD` (set it in
`.env` locally and in Vercel's environment variables). After logging in, the
session cookie lasts 7 days. The **Icons** tab manages the `icons` collection
(add/edit/delete, with class, SVG path and color) and the project form's
technology rows pick an icon from a dropdown of the database icons (no color
editing there). The lists fall back to the local constants if the database is
unreachable. New or renamed projects render without a redeploy. Reorder projects by drag-and-drop
(or the ↑/↓ arrows) — dropping on the top half of a row inserts before it, the
bottom half after it. The list mirrors the public page (special projects first,
then the rest) and the order is persisted in MongoDB (`order` field).
