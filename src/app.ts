import { createViewer } from './core/create-viewer';
import { createGradientSphereScene } from './scenes/gradient-sphere';

export function startApp(canvas: HTMLCanvasElement) {
  const viewer = createViewer({ canvas });

  viewer.mount(createGradientSphereScene());
  viewer.start();

  return viewer;
}
