import type * as THREE from 'three';

export type FrameState = {
  elapsedTime: number;
  deltaTime: number;
};

export type DemoScene = {
  root: THREE.Object3D;
  update?: (state: FrameState) => void;
  dispose?: () => void;
};
