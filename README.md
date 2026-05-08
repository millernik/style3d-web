# Style3D Web Showcase

Style3D Web Showcase is a desktop-first interactive product demo built with Next.js. It presents four workflow-driven showcases using local media, full-bleed intro/final screens, fixed immersive workflow layouts, and touch-inspired controls adapted from an original kiosk experience.

The current repository is web-first. It no longer contains active Electron or Windows packaging code, but the architecture is intentionally documented so Electron/kiosk packaging can be reintroduced later if needed.

## Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Material UI icons
- Local assets served from `public/assets`

## Requirements

- Node.js 20 or newer is recommended.
- npm is used for dependency management.

## Install

```bash
npm install
```

For CI or clean installs:

```bash
npm ci
```

## Development

```bash
npm run dev
```

Next.js prints the local URL, usually:

```text
http://localhost:3000
```

If port `3000` is already in use, Next.js will choose another local port.

## Production

```bash
npm run build
npm run start
```

Quality checks:

```bash
npm run lint
npm run build
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create a production Next.js build. |
| `npm run start` | Serve the production build. |
| `npm run lint` | Run ESLint with zero warnings allowed. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public workflow selection screen. |
| `/admin` | Same workflow selection screen, kept as a compatibility/internal route. |
| `/workflow/[workflowId]` | Workflow cover / attract screen with local video. |
| `/workflow/[workflowId]/[screenId]` | Individual workflow step. |
| `/workflow/*/screensaver` | Compatibility redirect to the workflow cover screen. |

Current workflow IDs:

- `workwear`
- `mantel`
- `key-visual`
- `nachtwaesche`

## Project Structure

```text
.
├── public/assets/                  # Local images, videos, SVGs, QR assets
├── src/app/                        # Next.js App Router routes and root layout
├── src/components/                 # Shared renderer, viewport, workflow templates
├── src/lib/workflows.ts            # Workflow registry, screen definitions, asset paths
├── src/lib/workflow-localization.ts# DE/EN text patches
├── src/lib/workflow-language.tsx   # Language context and localStorage persistence
├── src/app/globals.css             # Global tokens, fixed app shell, desktop guard
├── docs/                           # Handoff and technical documentation
└── .github/workflows/build-web.yml # CI lint/build workflow
```

## Architecture Summary

The app is driven by `src/lib/workflows.ts`. Each workflow is a typed object containing:

- workflow metadata
- local asset references
- attract / cover video configuration
- ordered screen definitions
- footer progress data
- overview cards

`src/app/workflow/[workflowId]/[screenId]/page.tsx` resolves a workflow and screen, then delegates rendering to `WorkflowRenderer`. Screen kinds map to shared and workflow-specific React templates.

Important shared components:

- `src/components/kiosk-viewport.tsx`  
  Browser viewport shell. Despite the legacy name, it is the current web viewport/scaling component.
- `src/components/attract-screen.tsx`  
  Cover / attract video screen shown at `/workflow/[workflowId]`.
- `src/components/workflow-renderer.tsx`  
  Main screen-kind dispatcher plus many Workwear shared primitives.
- `src/app/globals.css`  
  Global tokens, no-scroll behavior, desktop guard, and shared visual classes.

## Design and UX Constraints

- Desktop-first experience.
- Viewports below `900px` show a blocking desktop-required message.
- Workflow screens intentionally do not scroll.
- The workflow experience uses fixed immersive compositions adapted from kiosk design.
- Full-bleed cover, intro, and final backgrounds render at viewport level.
- Regular workflow module screens keep their controlled stage/card layouts.
- Interactions are touch/kiosk-inspired but must still allow normal browser behavior outside custom controls.
- Assets are local-only and are loaded from `public/assets`.

## Content and Asset Management

- Asset paths are centralized in `kioskAssets` inside `src/lib/workflows.ts`.
- Workflow text, screen order, progress labels, and screen configuration live in `src/lib/workflows.ts`.
- English/German localized text overrides live in `src/lib/workflow-localization.ts`.
- Language state is handled by `src/lib/workflow-language.tsx`.

See:

- `docs/CONTENT_EDITING.md`
- `docs/WORKFLOWS.md`

## Deployment Overview

The project is ready for standard Next.js hosting such as Vercel.

Current `next.config.ts`:

```ts
const nextConfig = {
  trailingSlash: true,
};
```

There are currently no required environment variables.

See `docs/DEPLOYMENT.md` for Vercel, static export, and asset notes.

## Future Electron Support

Electron is not active in this repository. There is no `electron/` directory, no Electron dependency, and no Windows packaging script in `package.json`.

If kiosk packaging is required again, reintroduce it as a separate wrapper around the web build rather than changing workflow logic. See `docs/ELECTRON_PACKAGING.md`.

## Documentation

- `docs/ARCHITECTURE.md`
- `docs/WORKFLOWS.md`
- `docs/DEPLOYMENT.md`
- `docs/ELECTRON_PACKAGING.md`
- `docs/HANDOFF.md`
- `docs/CONTENT_EDITING.md`
