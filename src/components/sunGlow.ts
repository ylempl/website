import * as THREE from 'three';

function generateSunGlowCanvas() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

  gradient.addColorStop(0, 'rgba(255, 255, 200, 0.7)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 150, 0.5)');
  gradient.addColorStop(0.4, 'rgba(255, 200, 0, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 200, 0, 0.001)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

export function createSunGlow(scene: THREE.Scene, sunPosition: THREE.Vector3) {
  const sunGlowTexture = new THREE.Texture(generateSunGlowCanvas());
  sunGlowTexture.needsUpdate = true;

  const sunGlowMaterial = new THREE.SpriteMaterial({
    map: sunGlowTexture,
    color: 0xffffaa,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.75,
    depthWrite: false,
  });

  const sunGlow = new THREE.Sprite(sunGlowMaterial);
  sunGlow.scale.set(100, 100, 1);
  sunGlow.position.copy(sunPosition);
  scene.add(sunGlow);

  return sunGlow;
}
