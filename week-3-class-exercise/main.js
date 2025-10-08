import * as THREE from 'three';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 2, 5);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Plane (floor)
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -1;
scene.add(plane);

// Phong-style shiny material factory
function createPhongMaterial(color) {
  return new THREE.MeshPhongMaterial({
    color: color,
    specular: 0xffffff, 
    shininess: 100,     
  });
}

// Materials 
const boxMaterial = createPhongMaterial(0x00aa66);   
const sphereMaterial = createPhongMaterial(0x8844ff); 
const coneMaterial = createPhongMaterial(0xff5522); 

// Geometries
const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), boxMaterial);
box.position.set(-2, 0, 0);
scene.add(box);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), sphereMaterial);
sphere.position.set(0, 0, 0);
scene.add(sphere);

const cone = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.5, 32), coneMaterial);
cone.position.set(2, 0, 0);
scene.add(cone);

// Lights
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);


// Light helpers
const dirHelper = new THREE.DirectionalLightHelper(directionalLight, 0.4);
scene.add(dirHelper);

// Ambient light
const ambient = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambient);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  sphere.rotation.y += 0.01;

  cone.rotation.x += 0.01;
  cone.rotation.z += 0.01;

  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
