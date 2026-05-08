# Workflows

## Existing Workflows

| Workflow ID | Public title | Current route | Final step |
| --- | --- | --- | --- |
| `workwear` | AI for Workwear | `/workflow/workwear` | `step-10` |
| `mantel` | AI for Retail \| Brand | `/workflow/mantel` | `step-10` |
| `key-visual` | AI for Outdoor Products | `/workflow/key-visual` | `step-10` |
| `nachtwaesche` | AI for Branding Campaigns | `/workflow/nachtwaesche` | `step-9` |

Each workflow also has an `overview` route:

```text
/workflow/[workflowId]/overview
```

## Workflow Content Structure

Assets are grouped by workflow:

```text
public/assets/
├── shared/
├── workwear/
├── mantel/
├── key-visual/
└── nachtwaesche/
```

Each workflow folder contains subfolders for screensaver/cover media, intro/final assets, and step-specific media.

Examples:

```text
public/assets/mantel/screensaver/
public/assets/mantel/intro/
public/assets/mantel/step-2-image-to-sketch/
public/assets/mantel/closing/
```

All asset paths are registered in `kioskAssets` in `src/lib/workflows.ts`.

## Workflow Object Shape

Workflow definitions live in `src/lib/workflows.ts`.

Simplified example:

```ts
const exampleWorkflow: Workflow = {
  id: "example",
  title: "AI for Example",
  workflowIcon: kioskAssets.shared.workflowMark,
  workflowIconLarge: kioskAssets.shared.workflowMarkLarge,
  selectionCard: {
    title: "Example",
    subtitle: "Short selection-card description",
    previewImage: "/assets/example/preview.png",
  },
  attract: {
    videoSrc: "/assets/example/screensaver/example.mp4",
    posterSrc: "/assets/example/screensaver/poster.png",
    brandLogo: kioskAssets.shared.brandLogoLarge,
    workflowMark: kioskAssets.shared.workflowMarkLarge,
    workflowTitle: "AI for Example",
  },
  screens: [
    {
      id: "step-1",
      frameName: "Example Step 1",
      kind: "intro",
      headline: "Hi, I am ...",
      body: "...",
      ctaLabel: "Start workflow",
      ctaTarget: "step-2",
      backdropImage: "/assets/example/intro/background.png",
    },
  ],
  overview: exampleOverview,
};
```

## Screen Registration

Screens are ordered in the workflow's `screens` array. The order controls:

- start screen lookup
- generated static route params
- overview navigation assumptions
- route availability

Screen URLs are based on IDs:

```text
/workflow/workwear/step-2
/workflow/mantel/step-6
/workflow/key-visual/step-10
/workflow/nachtwaesche/step-9
```

Route helpers:

```ts
getOrderedScreens(workflowId)
getStartScreen(workflowId)
getScreen(workflowId, screenId)
getScreenIds(workflowId)
buildScreenHref(workflowId, screenId)
```

## Screen Kinds

Screen kinds are typed in `BaseScreen["kind"]` in `src/lib/workflows.ts`.

Current families include:

- Workwear: `intro`, `sketch`, `style-design`, `try-on`, `style-redraw`, `ai-graphic`, `logo-placement`, `ecommerce`, `closing`
- Retail/Brand: `mantel-intro`, `mantel-image-to-sketch`, `mantel-detail-gallery`, `mantel-try-on`, `mantel-tech-pack`, `mantel-colorways`, `mantel-campaign`, `mantel-campaign-generation`, `mantel-review-gallery`, `mantel-closing`
- Outdoor Products: `keyvisual-stage-swap`, `keyvisual-gallery`, `keyvisual-selector-gallery`, `keyvisual-prompt`, `keyvisual-closing`
- Branding Campaigns/Nachtwäsche: `nachtwaesche-intro`, `nachtwaesche-moodboard`, `nachtwaesche-product-concept`, `nachtwaesche-try-on`, `nachtwaesche-render-gallery`, `nachtwaesche-graphic-generation`, `nachtwaesche-placement`, `nachtwaesche-mixed-gallery`, `nachtwaesche-closing`

`WorkflowRenderer` maps each `kind` to a template.

## Cover / Screensaver Screens

The cover screen is shown at:

```text
/workflow/[workflowId]
```

It is rendered by `AttractScreen`, not by a regular workflow step.

Legacy screensaver URLs redirect to cover screens:

```text
/workflow/workwear/screensaver -> /workflow/workwear
```

Cover screens use local videos from `workflow.attract.videoSrc` and posters from `workflow.attract.posterSrc`.

## Intro Screens

First workflow screens are regular step routes, usually `step-1`.

They use intro-specific templates:

- Workwear and Outdoor share the base `IntroTemplate`
- Retail/Brand uses `MantelIntroTemplate`
- Branding Campaigns uses `NachtwaescheIntroTemplate`

Intro screens use full-bleed background layers and foreground content positioned in a desktop-safe area.

## Final Screens

Final screens are bespoke closing templates:

- `closing`
- `mantel-closing`
- `keyvisual-closing`
- `nachtwaesche-closing`

They render final copy, restart/overview actions, and in some cases booking CTA or QR content.

Final backgrounds use viewport-level full-bleed layers so media and dim overlays reach browser edges.

## Progress Indicators

Most workflow steps define:

```ts
footer: { label: "Step label", current: 1, total: 6 }
```

Regular workflow module screens pass this footer into `WorkflowChrome`, which anchors the step label bottom-left and progress bottom-right.

Intro, closing, and overview screens do not use the same fixed footer path. Some closing screens render custom progress controls.

## Localization

Language support is handled by:

```text
src/lib/workflow-language.tsx
src/lib/workflow-localization.ts
```

Current languages:

```ts
type WorkflowLanguage = "de" | "en";
```

Default language is English. If a URL contains `?lang=de` or `?lang=en`, that value wins and is persisted to `localStorage`.

The selection screen appends the selected language to workflow links.

Use `workflow-localization.ts` for:

- workflow title overrides
- selection-card text
- attract title text
- step copy
- CTA labels
- footer labels
- overview cards

## Adding a New Workflow

Recommended steps:

1. Create a new asset folder under `public/assets/[workflow-id]`.
2. Add all asset paths to `kioskAssets`.
3. Define screen objects with existing screen kinds where possible.
4. If a new layout is required, add a new screen kind and renderer template.
5. Add a workflow object with `id`, `title`, `selectionCard`, `attract`, `screens`, and `overview`.
6. Add the workflow to the `workflows` map and `getWorkflowSelectionEntries()`.
7. Add localization patches in `workflow-localization.ts`.
8. Run:

```bash
npm run lint
npm run build
```

9. Manually check:

- `/`
- `/workflow/[workflowId]`
- every new `/workflow/[workflowId]/[screenId]`
- `/workflow/[workflowId]/overview`

## Replacing Media

Best practice is to keep the existing file path stable when replacing an asset. This avoids code changes.

If the file path changes:

1. Add the new file under `public/assets`.
2. Update the matching `kioskAssets` entry.
3. Check every screen that references that entry.
4. Run lint/build.
5. Visually verify the affected route at laptop and desktop sizes.

## Best Practices for Future Workflows

- Reuse existing screen kinds and templates before adding new ones.
- Keep asset naming stable and descriptive.
- Keep screen IDs route-friendly: `step-1`, `step-2`, `overview`.
- Use full-bleed layers only for cover, intro, final, or intentionally full-background screens.
- Keep regular module screens inside their existing stage/card layout.
- Do not introduce page scrolling inside workflow screens.
- Test at `1024`, `1280`, `1440`, and `1920` widths.
- Avoid global CSS changes for one workflow issue.
