import * as THREE from 'three';

function generateStarCanvas() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);

  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.4)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return canvas;
}

export function createStars(scene: THREE.Scene, count: number) {
  const starGroup = new THREE.Group();
  const starTexture = new THREE.Texture(generateStarCanvas());
  starTexture.needsUpdate = true;

  for (let i = 0; i < count; i++) {
    const color = new THREE.Color();
    color.setHSL(Math.random(), 0.7, 0.8);

    const starMaterial = new THREE.SpriteMaterial({
      map: starTexture,
      color,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });

    const star = new THREE.Sprite(starMaterial);

    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    const radius = 1500;

    star.position.set(
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi)
    );

    const scale = THREE.MathUtils.randFloat(2, 7);
    star.scale.set(scale, scale, 1);

    starGroup.add(star);
  }

  scene.add(starGroup);
}
