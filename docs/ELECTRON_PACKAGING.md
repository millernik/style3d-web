# Electron Packaging

## Current State

This repository is currently web-first.

There is no active Electron implementation:

- no `electron/` directory
- no Electron dependency in `package.json`
- no Electron Builder config
- no Windows packaging scripts
- no forced fullscreen code
- no Electron IPC/API usage

The project was originally derived from a kiosk app, so some names remain for continuity:

- `KioskViewport`
- `kioskAssets`
- `bg-kiosk-gradient`
- `text-kiosk-*`

These are now web showcase primitives, not active Electron packaging code.

## Recommended Reintroduction Strategy

If Electron packaging is needed again, add it as a wrapper around the web app. Do not move workflow logic into Electron.

Recommended structure:

```text
electron/
├── main.ts
├── preload.ts
└── tsconfig.json
```

Recommended responsibilities:

- Electron main process owns window creation.
- Next.js app owns UI, workflow logic, routing, and content.
- Preload should be minimal or omitted unless a real native bridge is required.
- Kiosk restrictions should be configuration-driven, not mixed into React components.

## Hosting Modes

### Option 1: Local Next Server

Run the Next.js production server locally and point Electron to:

```text
http://localhost:[port]
```

Pros:

- closest to current Next.js behavior
- supports App Router without export constraints
- easier debugging

Cons:

- requires process supervision
- packaging must start/stop the server
- slightly more moving parts

### Option 2: Static Export

Build a static export and load local files.

Pros:

- better offline packaging story
- simple file distribution
- no local web server required

Cons:

- requires enabling `output: "export"`
- compatibility redirects may need replacement
- must verify every route as static HTML
- local file routing can be more fragile

Static export is not currently enabled.

## Static Export Checklist

Before choosing static export:

1. Add `output: "export"` to `next.config.ts`.
2. Build with `npm run build`.
3. Verify output in `out/`.
4. Replace `redirect()`-based screensaver routes if needed.
5. Confirm deep links load from local files or configure Electron protocol handling.
6. Confirm all `/assets/...` paths resolve.
7. Confirm videos play from local files.
8. Confirm language query strings and localStorage work.

## Fullscreen Kiosk Considerations

If packaging for a physical kiosk, decide explicitly which restrictions to enable.

Possible Electron `BrowserWindow` options:

```ts
new BrowserWindow({
  fullscreen: true,
  kiosk: true,
  autoHideMenuBar: true,
  backgroundColor: "#000000",
  webPreferences: {
    contextIsolation: true,
    nodeIntegration: false,
  },
});
```

Do not add these restrictions to the web app:

- reload blocking
- right-click blocking
- forced fullscreen calls
- close prevention
- global shortcuts
- Electron-only navigation paths

Keep kiosk policy in Electron, not in React.

## Offline Deployment

For offline deployment:

- keep all assets local under `public/assets`
- avoid remote fonts, scripts, images, or videos
- pre-test video playback from packaged files
- keep a copy of the exact production build artifact
- document the display resolution and OS version used

## Windows Kiosk Notes

For Windows kiosk deployment:

- test on the actual target GPU/display
- verify video decode performance
- disable OS sleep/screensaver externally if required
- configure auto-start outside the React app
- keep an escape/maintenance procedure outside public UI
- avoid storing client-specific content only inside the packaged executable without source control

## Build and Package Recommendations

Recommended tools if Electron is reintroduced:

- Electron
- Electron Builder or Electron Forge
- TypeScript for `electron/main.ts`
- separate package scripts for web build and Electron packaging

Example script shape:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "electron:dev": "...",
    "electron:build": "npm run build && ..."
  }
}
```

Do not add packaging scripts until an Electron implementation exists.

## Known Constraints

- The current project is optimized for desktop/laptop browser presentation, not mobile.
- Below `900px`, the app UI is blocked.
- Workflows rely on no-scroll immersive layouts.
- Full-bleed cover/intro/final media should remain viewport-level.
- Static export may require changes to compatibility redirect routes.
- Large local videos can create large installers.

## Recommended Future Electron Tasks

1. Decide local-server vs static-export packaging.
2. Add an isolated `electron/` folder.
3. Keep package scripts separate from web scripts.
4. Add Windows build config only after a successful prototype.
5. Test packaged app on target hardware.
6. Document kiosk launch and recovery procedure for the operations team.
