import * as THREE from 'three';

const canvas = document.querySelector('.webgl');

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Add scene
const scene = new THREE.Scene();

// Add Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Add camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);
camera.position.z = 5;

// Add renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
