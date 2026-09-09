import { createViewer } from './core/create-viewer';
import { createPlatformScene } from './scenes/platform';

export function startApp(canvas: HTMLCanvasElement) {
  const viewer = createViewer({ canvas });

  viewer.mount(createPlatformScene());
  viewer.start();

  return viewer;
}
