import * as THREE from 'three';
import type { DemoScene } from '../../core/types';
import fragmentShader from './fragment.glsl?raw';
import vertexShader from './vertex.glsl?raw';

export function createGradientSphereScene(): DemoScene {
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

  return {
    root: sphere,
    update({ elapsedTime }) {
      uniforms.uTime.value = elapsedTime;
      sphere.rotation.y = elapsedTime * 0.22;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
