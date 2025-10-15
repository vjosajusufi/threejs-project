import * as THREE from 'three'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
import {OrbitControls}from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'


const gui=new GUI()

const scene=new THREE.Scene()

const material=new THREE.MeshStandardMaterial()

const sphere=new THREE.Mesh(

new THREE.SphereGeometry(0.5,32,32), material
)

sphere.position.x=-1.5

const cube=new THREE.Mesh(
    new THREE.BoxGeometry(0.75,0.75,0.75), material
)


const torus= new THREE.Mesh(
    new THREE.TorusGeometry(0.3,0.2,32,64),material
)

torus.position.x=1.5

const plane=new THREE.Mesh(
    new THREE.PlaneGeometry(5,3),material
)
plane.rotation.x=-Math.PI*0.5
plane.position.y=-0.65

scene.add(sphere,cube,torus,plane)

const ambientLight=new THREE.AmbientLight(0xffffff,1)
scene.add(ambientLight)
gui.add(ambientLight,'intensity').min(0).max(3).step(0.001)

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.9)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)

const hemisphereLight=new THREE.HemisphereLight(0xff0000,0x0000ff,0.9)
scene.add(hemisphereLight)

const hemisphereLightHelper=new THREE.HemisphereLightHelper(hemisphereLight,0.3)
scene.add(hemisphereLightHelper)

const pointLight=new THREE.PointLight(0xff9000,1.5,0,2)
pointLight.position.set(1,-0.5,1)
scene.add(pointLight)

const pointLightHelper=new THREE.PointLightHelper(pointLight,0.3)
scene.add(pointLightHelper)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 6, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

const spotLight=new THREE.SpotLight(0x78ff00,4.5,10,Math.PI*0.1,0.25,1)
scene.add(spotLight)
spotLight.position.set(0,2,3)
spotLight.target.position.x=-0.75
scene.add(spotLight)
scene.add(spotLight.target)

const spotLightHelper=new THREE.SpotLightHelper(spotLight,0.4)
scene.add(spotLightHelper)

const sizes={
    width:window.innerWidth,
    height:window.innerHeight
}

window.addEventListener('resize',()=>{

    sizes.width=window.innerWidth
    sizes.height=window.innerHeight
    camera.aspect=sizes.width/sizes.height
    renderer.setSize(sizes.width,sizes.height)
})

const camera=new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
camera.position.set(1,1,4)
scene.add(camera)

const renderer=new THREE.WebGLRenderer({antialias:true})
renderer.setSize(sizes.width,sizes.height)
document.body.appendChild(renderer.domElement)

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
}

animate()