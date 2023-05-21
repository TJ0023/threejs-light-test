import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.open(true)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff,0.5)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3)
directionalLight.position.set(1,0.25,0)
scene.add(directionalLight)

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3)
scene.add(hemisphereLight)

const pointLight = new THREE.PointLight(0xff9000, 0.5,10)
pointLight.position.set(1,0.5,1)
scene.add(pointLight)

const rectAreaLight = new THREE.RectAreaLight(0x4c00ff, 2,1,1)
rectAreaLight.position.set(-1.5,0,1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 6, Math.PI * 0.2 , 0.25, 1)
scene.add(spotLight)
scene.add(spotLight.target)

//Helpers
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1)
scene.add(hemisphereLightHelper)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.1)
scene.add(directionalLightHelper)

const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.1)
scene.add(pointLightHelper)

const spotLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(spotLightHelper)

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight)
scene.add(rectAreaLightHelper)

// Gui Properties
const lightFolder = gui.addFolder('AmbientLight Properties')
lightFolder.open(false)
lightFolder.addColor(ambientLight, 'color')
lightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.01)

const directionalLightFolder = gui.addFolder('DirectionalLight Properties')
directionalLightFolder.open(false)
directionalLightFolder.addColor(directionalLight, 'color')
directionalLightFolder.add(directionalLight, 'intensity').min(0).max(1).step(0.01)
directionalLightFolder.add(directionalLight.position, 'x').min(0).max(1).step(0.01)
directionalLightFolder.add(directionalLight.position, 'y').min(0).max(1).step(0.01)
directionalLightFolder.add(directionalLight.position, 'z').min(0).max(1).step(0.01)

const hemisphereLightFolder = gui.addFolder('HemisphereLight Properties')
hemisphereLightFolder.open(false)
hemisphereLightFolder.addColor(hemisphereLight, 'color')
hemisphereLightFolder.addColor(hemisphereLight, 'groundColor')
hemisphereLightFolder.add(hemisphereLight, 'intensity').min(0).max(1).step(0.01)

const pointLightFolder = gui.addFolder('PointLight Properties')
pointLightFolder.open(false)
pointLightFolder.addColor(pointLight, 'color')
pointLightFolder.add(pointLight, 'intensity').min(0).max(1).step(0.01)
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.1)
pointLightFolder.add(pointLight, 'decay').min(0).max(10).step(0.1)
pointLightFolder.add(pointLight.position, 'x').min(0).max(1).step(0.01)
pointLightFolder.add(pointLight.position, 'y').min(0).max(1).step(0.01)
pointLightFolder.add(pointLight.position, 'z').min(0).max(1).step(0.01)

const rectAreaLightFolder = gui.addFolder('RectAreaLight Properties')
rectAreaLightFolder.open(false)
rectAreaLightFolder.addColor(rectAreaLight, 'color')
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.02)
rectAreaLightFolder.add(rectAreaLight, 'width').min(0).max(10).step(0.02)
rectAreaLightFolder.add(rectAreaLight, 'height').min(0).max(10).step(0.02)
rectAreaLightFolder.add(rectAreaLight.position, 'x').min(-3).max(3).step(0.01)
rectAreaLightFolder.add(rectAreaLight.position, 'y').min(-3).max(3).step(0.01)
rectAreaLightFolder.add(rectAreaLight.position, 'z').min(-3).max(3).step(0.01)

const spotLightFolder = gui.addFolder('Spotlight Properties')
spotLightFolder.addColor(spotLight, 'color')
spotLightFolder.add(spotLight, 'intensity').min(0).max(10).step(0.02)
spotLightFolder.add(spotLight, 'distance').min(0).max(10).step(0.02)
spotLightFolder.add(spotLight, 'angle').min(0).max(1).step(0.01)
spotLightFolder.add(spotLight, 'penumbra').min(0).max(4).step(0.01)
spotLightFolder.add(spotLight, 'decay').min(0).max(10).step(0.01)
spotLightFolder.add(spotLight.target.position, 'x').min(-3).max(3).step(0.01)
spotLightFolder.add(spotLight.target.position, 'y').min(-3).max(3).step(0.01)
spotLightFolder.add(spotLight.target.position, 'z').min(-3).max(3).step(0.01)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.position.x = - 1.5

const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.75, 0.75, 0.75),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
)
torus.position.x = 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.65

scene.add(sphere, cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    cube.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    cube.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()