import './style.css';
import { startApp } from './app';

const canvas = document.querySelector<HTMLCanvasElement>('#scene');

if (!canvas) {
  throw new Error('Canvas element #scene was not found.');
}

const app = startApp(canvas);

if (import.meta.hot) {
  import.meta.hot.dispose(() => app.dispose());
}
