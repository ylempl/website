import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function setupControls(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;
  controls.enableRotate = true;
  controls.enablePan = false;
  return controls;
}

export function animate(
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  earth: THREE.Mesh,
  clouds: THREE.Mesh,
  controls: OrbitControls,
  cameraDistance: number,
  animationSpeed: number,
  moons: THREE.Mesh[] // Add moons array
) {
  let angle = 0;

  function loop() {
    requestAnimationFrame(loop);

    earth.rotation.y += 0.001;
    clouds.rotation.y += 0.0012;

    angle += animationSpeed;

    // Update moons orbits
    moons.forEach((moon) => {
      const data = moon.userData;
      if (data && data.orbitRadius !== undefined && data.orbitAngle !== undefined && data.orbitSpeed !== undefined) {
        data.orbitAngle += data.orbitSpeed;

        moon.position.set(
          earth.position.x + data.orbitRadius * Math.cos(data.orbitAngle),
          0,
          earth.position.z + data.orbitRadius * Math.sin(data.orbitAngle)
        );
      }
    });

    camera.position.x = cameraDistance * Math.sin(angle);
    camera.position.z = cameraDistance * Math.cos(angle);
    camera.position.y = 5;

    camera.lookAt(0, 0, 0);

    controls.update();


    renderer.render(scene, camera);
  }

  loop();
}
