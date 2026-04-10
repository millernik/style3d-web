# Style3D Expo Kiosk

Next.js App Router kiosk scaffold based on the Figma demo canvas.

## Current flow

- `/workflow/workwear` intro screen
- `/workflow/workwear/outfit-try-on`
- `/workflow/workwear/style-redraw`
- `/workflow/workwear/ai-graphic`
- `/workflow/workwear/review`

## Notes

- The screen system is data-driven in `src/lib/workflows.ts`.
- Additional Figma workflows can be added by extending the workflow registry and reusing the existing screen templates.
- The current build uses the Figma-hosted image assets directly for speed while the kiosk UI is being assembled.
# style3d-app
