import * as THREE from 'three';

function generateEarthGlowCanvas() {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

  gradient.addColorStop(0, 'rgba(0, 100, 255, 0.5)');    // Bright blue center
  gradient.addColorStop(0.3, 'rgba(0, 150, 255, 0.1)');  // Softer blue
  gradient.addColorStop(0.6, 'rgba(0, 100, 255, 0.2)');  // Fading out
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.1)');          // Fully transparent edge

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

export function createEarthGlow(scene: THREE.Scene, earthPosition: THREE.Vector3) {
  const glowTexture = new THREE.Texture(generateEarthGlowCanvas());
  glowTexture.needsUpdate = true;

  const glowMaterial = new THREE.SpriteMaterial({
    map: glowTexture,
    color: 0x3399ff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.9,
    depthWrite: false,
  });

  const earthGlow = new THREE.Sprite(glowMaterial);

  // Set smaller scale than sun glow (around Earth size + a bit)
  earthGlow.scale.set(15, 15, 1);

  earthGlow.position.copy(earthPosition);

  scene.add(earthGlow);

  return earthGlow;
}
