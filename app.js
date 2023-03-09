import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import GUI from 'lil-gui';
import fragment from './shaders/fragment.glsl';
import vertex from './shaders/vertex.glsl';

const canvas = document.querySelector('.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Add scene
const scene = new THREE.Scene();

// Add helper
const helper = new THREE.AxesHelper();
scene.add(helper);

// Add Objects
const geometry = new THREE.BoxGeometry(1, 1, 1, 100, 100);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms: {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() },
  },

  vertexShader: vertex,
  fragmentShader: fragment,
});

const mesh = new THREE.Mesh(geometry, shaderMaterial);
scene.add(mesh);

// Add camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 5;

// Add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Add renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(new THREE.Color(1, 1, 0));

const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime * 0.2;
  shaderMaterial.uniforms.time.value = elapsedTime;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();

const resize = () => {
  sizes.width = innerWidth;
  sizes.height = innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
};

window.addEventListener('resize', resize);

// Add gui controls
const gui = new GUI();
gui.addColor(material, 'color');
gui.addColor(renderer, 'state').onChange((value) => {
  console.log(renderer);
  console.log(value);
  renderer.setClearColor(value);
});
gui.add(mesh.position, 'x', -3, 3, 0.1).name('x-position');
