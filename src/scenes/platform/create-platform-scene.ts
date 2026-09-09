import * as THREE from 'three';
import type { DemoScene } from '../../core/types';
import fragmentShader from './fragment.glsl?raw';
import vertexShader from './vertex.glsl?raw';

export function createPlatformScene(): DemoScene {
  const root = new THREE.Group();
  const geometry = new THREE.BoxGeometry(2, 0.15, 2);
  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
  });

  const platform = new THREE.Mesh(geometry, material);

  root.add(platform);

  return {
    root,
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}

