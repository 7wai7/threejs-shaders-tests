import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { DemoScene, FrameState } from './types';

type ViewerOptions = {
  canvas: HTMLCanvasElement;
  background?: THREE.ColorRepresentation;
  camera?: {
    fov?: number;
    position?: THREE.Vector3Tuple;
    target?: THREE.Vector3Tuple;
  };
};

export function createViewer({
  canvas,
  background = 0x07090f,
  camera: cameraOptions = {},
}: ViewerOptions) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    preserveDrawingBuffer: true,
  });

  renderer.setClearColor(background, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = createCamera(cameraOptions);
  const controls = createControls(camera, renderer.domElement);
  const clock = new THREE.Clock();

  let activeDemo: DemoScene | null = null;
  let animationFrameId: number | null = null;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
  }

  function render() {
    const deltaTime = clock.getDelta();
    const state: FrameState = {
      deltaTime,
      elapsedTime: clock.elapsedTime,
    };

    controls.update();
    activeDemo?.update?.(state);
    renderer.render(scene, camera);

    animationFrameId = requestAnimationFrame(render);
  }

  function unmountActiveDemo() {
    if (!activeDemo) {
      return;
    }

    scene.remove(activeDemo.root);
    activeDemo.dispose?.();
    activeDemo = null;
  }

  function mount(demo: DemoScene) {
    unmountActiveDemo();
    activeDemo = demo;
    scene.add(demo.root);
  }

  function start() {
    if (animationFrameId !== null) {
      return;
    }

    clock.start();
    render();
  }

  function dispose() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    window.removeEventListener('resize', resize);
    unmountActiveDemo();
    controls.dispose();
    renderer.dispose();
  }

  window.addEventListener('resize', resize);
  resize();

  return {
    renderer,
    scene,
    camera,
    controls,
    mount,
    start,
    dispose,
  };
}

function createCamera({
  fov = 70,
  position = [-3, 5, 1],
  target = [0, 0, 0],
}: NonNullable<ViewerOptions['camera']>) {
  const camera = new THREE.PerspectiveCamera(
    fov,
    window.innerWidth / Math.max(window.innerHeight, 1),
    0.1,
    100,
  );

  camera.position.set(...position);
  camera.lookAt(...target);

  return camera;
}

function createControls(
  camera: THREE.PerspectiveCamera,
  canvas: HTMLCanvasElement,
) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  return controls;
}
