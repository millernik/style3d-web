# Style3D Web

Responsive Next.js App Router showcase for the Style3D expo workflows.

## Local Development

```bash
npm install
npm run dev
```

Open the URL printed by Next.js, usually `http://localhost:3000`.

## Production Check

```bash
npm run build
npm run start
```

## Routes

- `/` and `/admin` show the workflow selection screen.
- `/workflow/[workflowId]` shows the workflow intro state.
- `/workflow/[workflowId]/[screenId]` shows an individual workflow screen.
- Existing `/workflow/*/screensaver` URLs redirect to their workflow intro.

## Notes

- The screen system is data-driven in `src/lib/workflows.ts`.
- Assets are served from `public/assets`.
- This repo is the browser-based web version and does not include Electron or Windows packaging.
