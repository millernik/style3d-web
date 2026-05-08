# Architecture

## Overview

Style3D Web Showcase is a workflow-driven App Router application. It renders a small set of curated interactive demos from typed workflow data instead of using a CMS or remote API.

The application has three main layers:

1. **Route layer** in `src/app`
2. **Workflow registry** in `src/lib/workflows.ts`
3. **Renderer/template layer** in `src/components`

Assets are local files under `public/assets`, referenced by stable URL strings in the workflow registry.

## App Router Structure

```text
src/app/
├── layout.tsx
├── page.tsx
├── admin/page.tsx
├── workflow/layout.tsx
├── workflow/[workflowId]/page.tsx
├── workflow/[workflowId]/[screenId]/page.tsx
└── workflow/*/screensaver/page.tsx
```

### Root Layout

`src/app/layout.tsx` wraps the app in `WorkflowLanguageProvider` and applies the desktop-only guard.

Below `900px`, `.desktop-app-shell` is hidden and `.desktop-only-guard` is shown with:

```text
Diese Demo ist für Desktop-Ansichten optimiert. Bitte öffne sie auf einem Laptop oder Desktop.
```

### Selection Routes

`/` and `/admin` both render `AdminSelectionScreen`. The route name `/admin` is retained for compatibility, but visible UI copy uses workflow-selection language rather than admin language.

### Workflow Cover Route

`/workflow/[workflowId]` resolves a workflow with `getWorkflow()` and renders `AttractScreen`.

The cover screen uses:

- local video from `workflow.attract.videoSrc`
- local poster from `workflow.attract.posterSrc`
- workflow title and logo metadata
- a start target from `getStartScreen(workflow.id)`

### Workflow Step Route

`/workflow/[workflowId]/[screenId]` resolves:

- `workflow` via `getWorkflow(workflowId)`
- `screen` via `getScreen(workflowId, screenId)`

It renders:

```tsx
<WorkflowChrome workflow={workflow} screen={screen} footer={fixedFooter}>
  <WorkflowRenderer workflow={workflow} screen={screen} />
</WorkflowChrome>
```

`generateStaticParams()` enumerates all workflow and screen IDs so the known routes are build-time discoverable.

### Compatibility Screensaver Routes

The legacy screensaver routes redirect to their corresponding workflow cover:

- `/workflow/workwear/screensaver`
- `/workflow/mantel/screensaver`
- `/workflow/key-visual/screensaver`
- `/workflow/nachtwaesche/screensaver`

These exist for link compatibility. The active cover/attract route is `/workflow/[workflowId]`.

## Workflow Registry System

`src/lib/workflows.ts` is the source of truth for:

- workflow IDs
- workflow titles
- selection-card metadata
- local asset paths
- ordered screen arrays
- screen kinds
- footer/progress labels
- overview cards
- route helpers

Important exports:

```ts
getWorkflow(workflowId)
getWorkflowIds()
getWorkflowSelectionEntries()
getOrderedScreens(workflowId)
getStartScreen(workflowId)
getScreen(workflowId, screenId)
getScreenIds(workflowId)
buildScreenHref(workflowId, screenId)
```

The workflow registry is currently static TypeScript data. There is no runtime CMS, database, API fetch, or environment-driven content.

## Route-per-Screen Logic

Each screen has an `id` and `kind`.

Example:

```ts
{
  id: "step-2",
  frameName: "Workwear Step 2",
  kind: "sketch",
  footer: { label: "Sketch to Image", current: 1, total: 6 },
  narrative: "...",
  backdropImage: kioskAssets.workwear.sketchBase,
}
```

The URL is:

```text
/workflow/workwear/step-2
```

`WorkflowRenderer` switches on `screen.kind` and delegates to the right template.

## Shared Rendering System

Primary renderer:

```text
src/components/workflow-renderer.tsx
```

Workflow-specific template files:

```text
src/components/mantel-workflow-templates.tsx
src/components/keyvisual-workflow-templates.tsx
src/components/nachtwaesche-workflow-templates.tsx
```

Shared UI primitives are passed to workflow-specific template modules through a `shared` object. This keeps visual primitives such as buttons, framed stages, thumbnails, sliders, avatar diamonds, and footer shells consistent without forcing every workflow into one generic layout.

## Viewport Scaling System

The main viewport shell is:

```text
src/components/kiosk-viewport.tsx
```

Despite the legacy name, `KioskViewport` is the current browser viewport component.

Current behavior:

- app root fills `100dvh`
- body and app shell use `overflow: hidden`
- workflow screens render in a controlled immersive composition
- selection screen uses a fluid layout path
- workflow screens use a design-coordinate layout scaled to fit desktop/laptop viewports
- normal workflow module backgrounds remain black
- full-bleed media can be rendered at viewport scope through `fullBleedLayer`

Important constants:

```ts
const DESIGN_WIDTH = 1440;
const DESIGN_HEIGHT = 1024;
const WORKFLOW_SAFE_HEIGHT = 900;
```

The shell computes a scale from viewport width and safe height, then centers the design-width foreground content. This preserves finished visual compositions without reintroducing Electron fullscreen lock-down behavior.

## Full-Bleed Backgrounds

Cover, intro, and final screens often require true browser-level background media. These should not be placed only inside the transformed foreground content layer.

`KioskViewport` supports:

```tsx
fullBleedLayer?: React.ReactNode
```

Use `fullBleedLayer` for:

- cover videos
- first-screen background images
- final-screen background images
- dim/blur/gradient/vignette overlays

Full-bleed media should use:

```tsx
className="absolute inset-0 h-full w-full object-cover"
```

Foreground UI remains inside the normal workflow content layer.

## Chrome and Footer

`src/components/workflow-chrome.tsx` provides the top chrome for workflow step routes.

Footer/progress appears in two places depending on screen type:

- regular screen routes pass `fixedFooter` to `WorkflowChrome`
- bespoke final screens can render their own progress/control area

Intro and closing screens are intentionally excluded from the standard fixed footer route logic.

## Animation System

Animations use Framer Motion:

- entry fades and small `y` offsets
- slider/gallery transitions
- hotspot pulsing
- CTA reveals

Animations are local to templates. There is no global animation state machine.

## Asset Loading Strategy

All production assets are local files under:

```text
public/assets
```

They are referenced by root-relative URLs such as:

```ts
"/assets/workwear/sketch-base.png"
```

Local assets are used because:

- the demo must be reliable during client presentations
- large media should not depend on third-party availability
- future offline/kiosk packaging remains possible
- workflow content is fixed and curated

## No-Scroll and No-Mobile Behavior

The app is intentionally not a scrolling mobile website.

Current constraints:

- `html` and `body` are `overflow: hidden`
- workflow shells use `100dvh`
- selection and workflow screens are designed to fit desktop/laptop viewports
- below `900px`, the desktop-only guard hides the app UI

There is some legacy mobile-stacking CSS below `767px`, but the `899px` guard prevents it from being visible in normal operation. This can be cleaned up later.

## Responsive Scaling Philosophy

This project is not fully responsive in the usual content-reflow sense. It is a desktop/laptop showcase with immersive fixed compositions.

The intended behavior:

- large desktop: scale up and use the viewport naturally
- laptop: preserve composition and fit without scroll
- around 1024px wide: compact but usable
- below 900px: block the app and request desktop/laptop

Use targeted component adjustments for visual issues. Avoid broad global overrides that change all cards, images, galleries, or thumbnails.

## How Workflows Are Assembled

1. Add assets to `public/assets/[workflow]/...`.
2. Register paths in `kioskAssets`.
3. Define typed screen objects in an ordered `screens` array.
4. Add an `overview` object.
5. Add a `Workflow` object to the `workflows` map.
6. Add selection metadata through `selectionCard`.
7. Add localization patches in `workflow-localization.ts`.
8. Add or reuse renderer templates for the new screen kinds.

See `WORKFLOWS.md` and `CONTENT_EDITING.md`.
