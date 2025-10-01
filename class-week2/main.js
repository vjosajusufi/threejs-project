import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.add(new THREE.AxesHelper(14));

const group = new THREE.Group();
scene.add(group);

// Shape 1 - Cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(0.7, 0.7, 1.5, 32),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
);
cylinder.position.x = -3; 
group.add(cylinder);

// Shape 2 - Cone
const cone = new THREE.Mesh(
  new THREE.ConeGeometry(0.7, 1.5, 32),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
cone.position.x = 0; // center
group.add(cone);

// Shape 3 - Tetrahedron
const tetrahedron = new THREE.Mesh(
  new THREE.TetrahedronGeometry(1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false })
);
tetrahedron.position.x = 3;
group.add(tetrahedron);

// Light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.01;
  group.rotation.x += 0.005;
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
