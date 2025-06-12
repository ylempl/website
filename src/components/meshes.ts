import * as THREE from 'three';

export function createEarth(textures: {
  earthDay: THREE.Texture;
  earthNight: THREE.Texture;
  specularMap: THREE.Texture;
}) {
  const earthMaterial = new THREE.MeshPhongMaterial({
    map: textures.earthDay,
    specularMap: textures.specularMap,
    specular: new THREE.Color('grey'),
    emissiveMap: textures.earthNight,
    emissive: new THREE.Color(0x444444),
    emissiveIntensity: 1,
  });

  const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
  const earth = new THREE.Mesh(earthGeometry, earthMaterial);

  return earth;
}

export function createClouds(cloudTexture: THREE.Texture) {
  const cloudGeometry = new THREE.SphereGeometry(5.03, 64, 64);
  const cloudMaterial = new THREE.MeshLambertMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.4,
  });

  const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
  return clouds;
}

export function createSun(sunTexture: THREE.Texture, sunDistance: number) {
  // Sun geometry and material with transparency and reduced opacity
  const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
  const sunMaterial = new THREE.MeshBasicMaterial({
    map: sunTexture,
    transparent: true,
    opacity: 0.5,  // adjust opacity here
  });

  const sun = new THREE.Mesh(sunGeometry, sunMaterial);

  // White sphere slightly smaller as background
  const whiteBackgroundGeometry = new THREE.SphereGeometry(2.95, 32, 32);
  const whiteBackgroundMaterial = new THREE.MeshBasicMaterial({
    color: 0xffd700,
  });
  const whiteBackground = new THREE.Mesh(whiteBackgroundGeometry, whiteBackgroundMaterial);

  // Group them together
  const sunGroup = new THREE.Group();
  sunGroup.add(whiteBackground);
  sunGroup.add(sun);

  const sunDirection = new THREE.Vector3(1, 0, 1).normalize();
  sunGroup.position.copy(sunDirection.multiplyScalar(sunDistance));

  return sunGroup;
}