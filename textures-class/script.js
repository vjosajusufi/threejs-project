import * as THREE from 'three';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('texture/360_F_146032217_JW5bqxByxQztiMniOYdOi6OjEq69AqdK.jpg');


const points = [];
points.push(new THREE.Vector2(0.0, -1.0));  // bottom tip
points.push(new THREE.Vector2(0.35, -0.5));
points.push(new THREE.Vector2(0.55, 0.0));
points.push(new THREE.Vector2(0.40, 0.6));
points.push(new THREE.Vector2(0.15, 1.0));
points.push(new THREE.Vector2(0.0, 1.2));  // top tip

const geometry = new THREE.LatheGeometry(points, 64);

const material = new THREE.MeshBasicMaterial({
    map: texture
});


const waterDrop = new THREE.Mesh(geometry, material);
scene.add(waterDrop);

function animate() {
    requestAnimationFrame(animate);
    waterDrop.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();
