import * as THREE from 'three';

const scene=new THREE.Scene();
scene.background=new THREE.Color(0x202020);

const camera=
new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z=3;

const renderer=new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry=new THREE.TorusGeometry(1,0.4,16,100);

//const geometry=new THREE.SphereGeometry(1,32,32);
//const geometry=new THREE.CylinderGeometry(1,1,2,32);

//const geometry=new THREE.ConeGeometry(1,2,10);


//const material=new THREE.MeshLambertMaterial({color:0x00ff88});

//const material=new THREE.MeshStandardMaterial({
  //  color:0x8844ff,
    //metalness:0.4,
    //roughness:0.3,
//emissive:0x220044,
//});

const material=new THREE.MeshPhongMaterial({
    color:0x8844ff,
    specular:0xffffff,
shininess:100
});


const object=new THREE.Mesh(geometry,material);
scene.add(object);


const light=new THREE.DirectionalLight(0xffffff,1);
light.position.set(2,2,5);
scene.add(light);

const LightHelper=new THREE.DirectionalLightHelper(light,0.4);
scene.add(LightHelper);
//cubeMesh.rotation.x=10;

function animate(){
    requestAnimationFrame(animate);
    object.rotation.x +=0.01;
    renderer.render(scene,camera);
}

animate()