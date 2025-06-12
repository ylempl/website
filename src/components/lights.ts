import * as THREE from 'three';

export function createLights(scene: THREE.Scene) {
  const hemiLight = new THREE.HemisphereLight(0x111122, 0x000000, 0.15);
  scene.add(hemiLight);

  const ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return ambientLight;
}

export function createSunLight(scene: THREE.Scene, sunPosition: THREE.Vector3) {
  const sunLight = new THREE.DirectionalLight(0xffffff, 0.5);
  sunLight.position.copy(sunPosition);
  scene.add(sunLight);

  return sunLight;
}
