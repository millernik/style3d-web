# Content Editing

## Where Content Lives

Main content registry:

```text
src/lib/workflows.ts
```

Localization:

```text
src/lib/workflow-localization.ts
```

Assets:

```text
public/assets
```

## Replacing Images

Preferred method:

1. Export the replacement image.
2. Give it the same dimensions/aspect ratio as the previous asset where possible.
3. Replace the existing file at the same path.
4. Run and visually verify the affected screen.

If the filename changes:

1. Place the file under the relevant folder in `public/assets`.
2. Update the relevant `kioskAssets` path.
3. Search for any direct references to the old filename.

```bash
rg "old-file-name" src public
```

4. Run:

```bash
npm run lint
npm run build
```

## Replacing Videos

Cover videos are referenced in each workflow's `attract` config:

```ts
attract: {
  videoSrc: kioskAssets.workwear.introVideo,
  posterSrc: kioskAssets.workwear.introPoster,
}
```

Recommended video format:

- MP4
- H.264 video
- AAC audio if audio is included, though cover videos are muted
- optimized for desktop playback
- keep duration and file size reasonable

Cover videos should be able to autoplay muted.

## Poster Images

Each video should have a poster image:

```ts
introPoster: "/assets/workflow/screensaver/poster.png"
```

Use a poster frame that matches the first seconds of the video to avoid visual jumps.

## Localized Text

Default workflow data is in `src/lib/workflows.ts`.

Localized overrides are in `src/lib/workflow-localization.ts`.

The language provider supports:

```ts
"de" | "en"
```

URL query language wins over stored language:

```text
/workflow/workwear?lang=de
/workflow/workwear?lang=en
```

Then it persists to `localStorage`.

## Editing Workflow Copy

For small copy changes:

1. Find the relevant workflow and screen in `src/lib/workflows.ts`.
2. Update the base text.
3. Update the matching localization patch if needed.
4. Verify in both languages.

Search examples:

```bash
rg "Sketch to Image" src/lib/workflows.ts src/lib/workflow-localization.ts
rg "Jetzt Demo buchen" src/lib
```

## Editing CTA Targets

CTA targets usually refer to another screen ID:

```ts
ctaTarget: "step-3"
```

The target must exist in the same workflow's `screens` array or be handled explicitly by the component.

For external links, use the relevant button/link component pattern already present in the template. Do not overload `ctaTarget` with arbitrary external URLs unless the component supports it.

## Naming Conventions

Recommended asset names:

```text
step-2-sketch.png
step-2-render.png
step-5-gallery-1.png
closing-background.png
screensaver.mp4
poster.png
```

Use:

- lowercase
- hyphens
- semantic step names
- stable filenames

Avoid:

- spaces
- temporary export names
- dates unless versioning is intentional
- uppercase/lowercase variants that differ only by case

## Asset Optimization

Images:

- Use JPG for photographic full-screen backgrounds when transparency is not needed.
- Use PNG for UI images, transparent assets, and crisp design exports.
- Use SVG for logos, QR codes, and vector marks.
- Consider WebP/AVIF only after confirming the target browser environment.

Videos:

- Prefer MP4/H.264.
- Keep cover videos short and compressed.
- Test on the actual client display hardware.

General:

- Avoid huge raw exports.
- Preserve aspect ratio expected by the template.
- Full-bleed backgrounds should tolerate cropping.
- Gallery thumbnails should match the existing thumbnail aspect ratio.

## Adding New Media Safely

1. Add files under `public/assets/[workflow]/[step-folder]`.
2. Register paths in `kioskAssets`.
3. Reference the asset through the workflow object.
4. Verify the screen in browser.
5. Run lint/build.

Example:

```ts
const kioskAssets = {
  workwear: {
    newDetailImage: "/assets/workwear/step-4/new-detail.png",
  },
};
```

## Full-Bleed Media Rules

Use full-bleed media only for screens that are intended to cover the browser viewport:

- cover / attract screens
- first intro screens
- final / closing screens
- intentional full-background screens

Full-bleed media belongs in the viewport-level `fullBleedLayer`, not inside a centered module.

Expected class pattern:

```tsx
className="absolute inset-0 h-full w-full object-cover"
```

Overlays should also use:

```tsx
className="absolute inset-0"
```

## Module Screen Media Rules

Regular workflow steps should keep media inside their designed frames/stages:

- before/after sliders
- gallery frames
- thumbnail selectors
- detail cards
- variant cards
- try-on selectors

Do not make these full-bleed unless the screen design explicitly changes.

## Content QA Checklist

After content or media changes, check:

- `/`
- affected workflow cover route
- affected workflow step route
- affected overview card if relevant
- English and German language states
- `1280x800`
- `1440x900`
- below `900px` guard if layout files changed

Run:

```bash
npm run lint
npm run build
```
