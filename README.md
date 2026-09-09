# shaders-tests

Test repository for writing and testing GLSL shaders in Three.js with Vite.

## Scripts

```sh
npm install
npm run dev
npm run build
```

The current shader demo lives in `src/scenes/gradient-sphere`.

## Structure

- `src/main.ts` is only the browser entry point.
- `src/app.ts` wires the selected shader scene into the viewer.
- `src/core/create-viewer.ts` owns the renderer, camera, controls, resize, and render loop.
- `src/core/types.ts` defines the small reusable scene contract.
- `src/scenes/*` is where shader experiments should live.

To add another shader experiment, create a folder in `src/scenes`, return a `DemoScene`, and mount it from `src/app.ts`.
