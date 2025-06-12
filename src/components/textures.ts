import * as THREE from 'three';

export function loadTextures() {
  const loader = new THREE.TextureLoader();
  const base = import.meta.env.BASE_URL;

  return {
    earthDay: loader.load(base + 'assets/2k_earth_daymap.jpg'),
    earthNight: loader.load(base + 'assets/2k_earth_nightmap.jpg'),
    specularMap: loader.load(base + 'assets/2k_earth_daymap.jpg'),
    cloudMap: loader.load(base + 'assets/2k_earth_clouds.jpg'),
    sunTexture: loader.load(base + 'assets/2k_sun.jpg'),
    moonTexture: loader.load(base + 'assets/2k_moon.jpg'),
    fakeMoonTexture: loader.load(base +'assets/2k_makemake_fictional.jpg')
  };
}
