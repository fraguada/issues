import * as THREE from 'three'
import { OrbitControls } from 'orbit'


let camera, scene, renderer, dLight, controls

let width = window.innerWidth
let height = window.innerHeight

init()
create()
animate()

function create() {

    const geometry = new THREE.DodecahedronGeometry( 250, 5 )
    const material = new THREE.MeshStandardMaterial()
    const mesh = new THREE.Mesh( geometry, material )
    mesh.castShadow = true
    mesh.receiveShadow = true

    scene.add(mesh)

    const mesh2 = mesh.clone()
    mesh2.position.z = 150

    scene.add(mesh2)

}

function init() {

    //renderer

    renderer = new THREE.WebGLRenderer( { antialias: true } )
    renderer.setPixelRatio( window.devicePixelRatio )
    renderer.setSize( window.innerWidth, window.innerHeight )
    renderer.shadowMap.enabled = true
    document.body.appendChild( renderer.domElement )

    //scene

    scene = new THREE.Scene()
    scene.background = new THREE.Color( 0.5, 0.5, 0.5 )

    //camera

    camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 0, 2000 )
    camera.position.x = 500
    camera.position.y = 0
    camera.position.z = 0

    //controls
    controls = new OrbitControls(camera, renderer.domElement)

    //lights
    dLight = new THREE.DirectionalLight( 0xffffff )
    dLight.position.set( -250, 500, 500 )
    dLight.intensity = 10.0
    dLight.castShadow = true

    dLight.shadow.mapSize.width = 4096
    dLight.shadow.mapSize.height = 4096
    dLight.shadow.camera.near = 1
    dLight.shadow.camera.far = 1500
    dLight.shadow.camera.left = - width / 2
    dLight.shadow.camera.right = width / 2
    dLight.shadow.camera.top = height / 2
    dLight.shadow.camera.bottom = - height / 2
    dLight.shadow.bias = 0.0001
    scene.add( dLight )
  
    window.addEventListener( 'resize', onWindowResize, false )
  
}

function animate () {
  requestAnimationFrame( animate )
  renderer.render( scene, camera )
}
  
function onWindowResize() {

  width = window.innerWidth
  height = window.innerHeight

  camera.left = width / - 2
  camera.right = width / 2
  camera.top = height / 2
  camera.bottom = height / - 2

  camera.updateProjectionMatrix()

  renderer.setSize( width, height )
  animate()
}