import * as THREE from 'three';
import './style.css';
import fragmentShader from './shaders/fragment.glsl?raw';
import vertexShader from './shaders/vertex.glsl?raw';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import setupResizeHandler from './listeners/setup-resize-listener';

const canvas = document.querySelector<HTMLCanvasElement>('#scene');

if (!canvas) {
  throw new Error('Canvas element #scene was not found.');
}

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  preserveDrawingBuffer: true,
});

renderer.setClearColor(0x07090f, 1);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();

const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(70, aspect);
camera.position.x = -3;
camera.position.z = 1;
camera.position.y = 5;
camera.updateProjectionMatrix();
camera.lookAt(new THREE.Vector3());


const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true; // Adds inertia/smoothness to camera movement
controls.dampingFactor = 0.05;

const uniforms = {
  uTime: { value: 0 },
};

const geometry = new THREE.SphereGeometry(1.4, 96, 96);
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader,
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const clock = new THREE.Clock();

function render() {
  const elapsedTime = clock.getElapsedTime();

  controls.update();
  uniforms.uTime.value = elapsedTime;
  sphere.rotation.y = elapsedTime * 0.22;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

setupResizeHandler(renderer, camera);

render();
