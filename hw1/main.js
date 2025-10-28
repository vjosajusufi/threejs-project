import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/**
 * Basic Scene Setup
 */
//Scene: The container for all objects
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); 

// 2. Camera:
const camera = new THREE.PerspectiveCamera(
    75, 
    window.innerWidth / window.innerHeight,
    0.1, 
    1000 
);

camera.position.set(0, 25, 25); 

// 3. Renderer: 
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows

/**
 * OrbitControls
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.target.set(0, 0, 0); 

/**
 * Lights
 * Using two types as required: Ambient and Directional.
 */
// Light 1: AmbientLight 
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); 
scene.add(ambientLight);

// Light 2: DirectionalLight 
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
directionalLight.position.set(15, 25, 20); 
directionalLight.castShadow = true; 
scene.add(directionalLight);


directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;

/**
 * Ground
 * We model the ground using planes to show grass vs. road.
 */
// Grass Plane (Lime Green)
const grassGeometry = new THREE.PlaneGeometry(40, 40);

const grassMaterial = new THREE.MeshLambertMaterial({ color: 0x99ff00 }); 
const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = -Math.PI / 2; 
grass.receiveShadow = true; 
scene.add(grass);

// Road Planes (Gray)
const roadMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });

// Road 1 (Horizontal part of the 'T')
const roadGeo1 = new THREE.PlaneGeometry(40, 10);
const road1 = new THREE.Mesh(roadGeo1, roadMaterial);
road1.rotation.x = -Math.PI / 2;
road1.position.y = 0.01; 
road1.position.z = 10; 
road1.receiveShadow = true;
scene.add(road1);

// Road 2 (Vertical part of the 'T')
const roadGeo2 = new THREE.PlaneGeometry(8, 25); 
const road2 = new THREE.Mesh(roadGeo2, roadMaterial);
road2.rotation.x = -Math.PI / 2;
road2.position.y = 0.01; 
road2.position.z = -2.5;
road2.receiveShadow = true;
scene.add(road2);

/**
 * Buildings
 */
const buildingGeometry = new THREE.BoxGeometry(1, 1, 1);

// Building 1 (White)
const buildingMatWhite = new THREE.MeshPhongMaterial({ color: 0xeeeeee });
const building1 = new THREE.Mesh(buildingGeometry, buildingMatWhite);

building1.scale.set(6, 12, 6);
building1.position.set(-10, 6, -5); 
building1.castShadow = true;
scene.add(building1);

// Building 2 (White)
const building2 = new THREE.Mesh(buildingGeometry, buildingMatWhite);

building2.scale.set(6, 12, 6);
building2.position.set(-18, 6, -5); 
building2.castShadow = true;
scene.add(building2);

// Building 3 (Blue)

const buildingMatBlue = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const building3 = new THREE.Mesh(buildingGeometry, buildingMatBlue);

building3.scale.set(12, 5, 6); 
building3.position.set(10, 2.5, -5); 
building3.castShadow = true;
scene.add(building3);


/**
 * Handle Window Resizing
 */
window.addEventListener('resize', () => {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Animation Loop
 */
function animate() {
    requestAnimationFrame(animate); 

    controls.update();

 
    renderer.render(scene, camera);
}

// Start the animation loop
animate();