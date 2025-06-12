import * as THREE from 'three';

interface MoonParams {
  radius: number;
  minDistance: number;
  maxDistance: number;
  texture: THREE.Texture;
  name: string;
  orbitSpeed: number; // radians per frame
}

/**
 * Create a moon mesh using the Earth texture.
 * Position and speed are randomized within given ranges.
 */
export function createMoon(params: MoonParams) {
  const geometry = new THREE.SphereGeometry(params.radius, 32, 32);
  const material = new THREE.MeshPhongMaterial({
    map: params.texture,
    specular: new THREE.Color('grey'),
  });

  const moon = new THREE.Mesh(geometry, material);
  moon.name = params.name;

  // Random distance between min and max
  const distance = THREE.MathUtils.lerp(params.minDistance, params.maxDistance, Math.random());

  // Random initial angle (radians)
  const angle = Math.random() * Math.PI * 2;

  // Save orbit data on the moon userData for animation use
  moon.userData = {
    orbitRadius: distance,
    orbitAngle: angle,
    orbitSpeed: params.orbitSpeed,
  };

  // Set initial position using polar coordinates on x-z plane
  moon.position.set(
    distance * Math.cos(angle),
    0,
    distance * Math.sin(angle)
  );

  return moon;
}

/**
 * Add 2 moons with randomized position & speed.
 */
export function addMoons(scene: THREE.Scene, earthPosition: THREE.Vector3, texture: any) {
  // Real Moon params - smaller radius, closer orbit
  const realMoon = createMoon({
    radius: 1.35,
    minDistance: 15,
    maxDistance: 15,
    texture: texture.moonTexture,
    name: 'realMoon',
    orbitSpeed: 0.00025,
  });

  // Fake Moon params - larger radius, further orbit
  const fakeMoon = createMoon({
    radius: 0.5,
    minDistance: 21,
    maxDistance: 21,
    texture: texture.fakeMoonTexture,
    name: 'fakeMoon',
    orbitSpeed: 0.00017,
  });

  scene.add(realMoon);
  scene.add(fakeMoon);

  return { realMoon, fakeMoon };
}
