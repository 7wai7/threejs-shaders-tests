precision highp float;

uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec3 blue = vec3(0.08, 0.36, 1.0);
  vec3 pink = vec3(1.0, 0.18, 0.46);
  vec3 yellow = vec3(1.0, 0.86, 0.22);

  float waveA = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
  float waveB = sin(vUv.y * 8.0 - uTime * 1.2) * 0.5 + 0.5;

  vec3 color = mix(blue, pink, waveA);
  color = mix(color, yellow, waveB * 0.45);

  float light = dot(normalize(vNormal), normalize(vec3(0.4, 0.6, 1.0)));
  light = light * 0.5 + 0.5;

  gl_FragColor = vec4(color * (0.45 + light * 0.75), 1.0);
}
