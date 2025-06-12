import * as THREE from 'three';

export function loadTextures() {
  const loader = new THREE.TextureLoader();

  return {
    earthDay: loader.load('/assets/2k_earth_daymap.jpg'),
    earthNight: loader.load('/assets/2k_earth_nightmap.jpg'),
    specularMap: loader.load('/assets/2k_earth_daymap.jpg'),
    cloudMap: loader.load('/assets/2k_earth_clouds.jpg'),
    sunTexture: loader.load('/assets/2k_sun.jpg'),
    moonTexture: loader.load('/assets/2k_moon.jpg'),
    fakeMoonTexture: loader.load('/assets/2k_makemake_fictional.jpg')
  };
}
