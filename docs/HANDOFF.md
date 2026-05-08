# Handoff Guide

## Project Ownership

This repository contains the Style3D Web Showcase: a desktop-first interactive workflow demo built in Next.js.

It is suitable for:

- client presentations
- browser deployment
- internal workflow demos
- future kiosk/Electron packaging

## Safe to Edit

The following areas are safe for trained content maintainers or developers:

- text and workflow configuration in `src/lib/workflows.ts`
- localized copy in `src/lib/workflow-localization.ts`
- local media under `public/assets`
- selection-card titles/subtitles/images
- overview card titles and artwork
- CTA labels and target IDs
- progress labels and step counts

Always run lint/build after edits.

## Edit with Care

These files control shared layout and should be modified only by developers familiar with the current visual system:

- `src/components/kiosk-viewport.tsx`
- `src/components/attract-screen.tsx`
- `src/components/workflow-renderer.tsx`
- `src/components/mantel-workflow-templates.tsx`
- `src/components/keyvisual-workflow-templates.tsx`
- `src/components/nachtwaesche-workflow-templates.tsx`
- `src/app/globals.css`

Small targeted fixes are preferred. Avoid broad CSS selectors that affect all images, galleries, cards, or fixed-width elements.

## Do Not Modify Casually

Avoid changing:

- route structure
- workflow IDs
- screen IDs used in links
- `getScreenIds()` / `generateStaticParams()` behavior
- desktop-only guard cutoff
- no-scroll shell behavior
- full-bleed background layering
- shared slider/hotspot/gallery primitives without visual QA

## Asset Replacement

Best option: replace an asset file while keeping the same path and filename.

If the path changes:

1. Add the new asset under `public/assets`.
2. Update the relevant `kioskAssets` entry in `src/lib/workflows.ts`.
3. Confirm every screen using that asset still looks correct.
4. Run:

```bash
npm run lint
npm run build
```

5. Manually test the affected route.

## Workflow Duplication

To create a workflow based on an existing one:

1. Duplicate the asset folder.
2. Add new `kioskAssets` entries.
3. Duplicate the workflow screen array.
4. Change workflow `id`, `title`, `selectionCard`, `attract`, and `overview`.
5. Add the new workflow to the `workflows` map.
6. Add it to `getWorkflowSelectionEntries()`.
7. Add localization patches.
8. Verify every route.

Do not duplicate a workflow by copying rendered JSX unless the layout is genuinely new.

## Deployment Responsibilities

Before production deployment:

```bash
npm ci
npm run lint
npm run build
```

Manual smoke test:

- `/`
- `/admin`
- all `/workflow/[workflowId]` cover screens
- all final screens
- one or more module screens per workflow
- below `900px` viewport guard

Deployment owner should confirm:

- asset files are present
- videos autoplay muted
- no desktop scroll
- full-bleed screens reach viewport edges
- language switch works
- client-approved copy and media are present

## Maintenance Recommendations

- Keep all content and asset changes in version control.
- Use pull requests for client-facing content updates.
- Keep a short changelog for asset replacements.
- Do not commit generated folders such as `.next`, `out`, or `tsconfig.tsbuildinfo`.
- Re-run visual QA after dependency updates.
- Avoid updating Next.js/React immediately before a client presentation without time for regression testing.

## Backup and Versioning

Recommended:

- tag known-good presentation builds
- store final approved source assets outside the repo if they are too large for git history
- keep exported videos/images named with stable semantic names, not temporary design-tool names
- document which commit was used for each client delivery

Example:

```bash
git tag client-handoff-2026-05
```

## Troubleshooting

### Dev server starts on another port

Port `3000` is already in use. Use the URL printed by Next.js or stop the other process.

### App crashes after layout/router changes

Clear stale build artifacts:

```bash
rm -rf .next out tsconfig.tsbuildinfo
npm run dev
```

### Asset does not load

Check:

- file exists under `public/assets`
- path starts with `/assets/...`
- path in `kioskAssets` matches case-sensitive filename
- deployment includes the `public` folder

### Video does not autoplay

Videos must be muted and inline. Current cover videos use:

```tsx
autoPlay
loop
muted
playsInline
```

Also verify video codec/browser support.

### Screen is boxed or shows side bars

For cover/intro/final screens, background media should be passed through `fullBleedLayer` so it renders at viewport level.

Do not fix this by adding a centered wrapper or changing regular module screens.

### CTA or footer is clipped

Check the relevant template vertical placement first. Do not shrink content unless the design explicitly requires it.

Useful CSS tokens:

```css
--workflow-main-lift
--workflow-intro-lift
```

### Mobile view does not show the app

This is intentional. Below `900px`, the desktop-only guard is shown.

