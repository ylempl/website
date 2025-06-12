import * as THREE from 'three';
import { createLights, createSunLight } from './components/lights';
import { loadTextures } from './components/textures';
import { createEarth, createClouds, createSun } from './components/meshes';
import { createStars } from './components/stars';
import { createSunGlow } from './components/sunGlow';
import { createEarthGlow } from './components/earthGlow';
import { setupControls, animate } from './components/animate';
import { addMoons } from './components/moons';

// Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const cameraDistance = 50;
const sunDistance = 150;
const animationSpeed = 0.0005;

// Lights
createLights(scene);

// Stars
createStars(scene, 3000);

// Textures
const textures = loadTextures();

// Meshes
const earth = createEarth(textures);
const clouds = createClouds(textures.cloudMap);
const { realMoon, fakeMoon } = addMoons(scene, earth.position, textures);

const sun = createSun(textures.sunTexture, sunDistance);

scene.add(earth);
scene.add(clouds);
scene.add(sun);

// Sunlight
createSunLight(scene, sun.position);

// Sun Glow
createSunGlow(scene, sun.position);

createEarthGlow(scene, earth.position);

// Controls
const controls = setupControls(camera, renderer);

// Animation
animate(
  camera,
  renderer,
  scene,
  earth,
  clouds,
  controls,
  cameraDistance,
  animationSpeed,
  [realMoon, fakeMoon]
);


// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
