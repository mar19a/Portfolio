import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// Avatar

const marTexture = new THREE.TextureLoader().load('IMG_0699.png');

const mar = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: marTexture }));

scene.add(mar);

// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

mar.position.z = -5;
mar.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  mar.rotation.y += 0.01;
  mar.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

const projectDescriptions = document.querySelectorAll('.project-description');

function moveProjectDescriptions() {
  // Get the scroll position
  const t = document.body.getBoundingClientRect().top;

  // Loop through each project description
  projectDescriptions.forEach((description) => {
    // Adjust the translateY property based on the scroll position
    description.style.transform = `translateY(${t * -0.5}px)`;
  });
}

document.body.onscroll = () => {
  moveCamera();
  moveProjectDescriptions();
};
document.addEventListener('scroll', function() {
  var scrollPosition = window.pageYOffset;
  var quoteBlock = document.getElementById('scrollQuote');

  if (scrollPosition > 4200) {  // you can adjust this value
    quoteBlock.style.transform = 'translate3d(0, 0, 0)';
  } else {
    quoteBlock.style.transform = 'translate3d(100%, 0, 0)';
  }
});


function moveHeader() {
  const t = document.body.getBoundingClientRect().top;
  const header = document.querySelector('#main-header');
  header.style.transform = `translateZ(${t * 0.01}px) scale(${1 - t * 0.00005})`;
}

function scrollHandler() {
  moveCamera();
  moveProjectDescriptions();
  moveHeader();

  var scrollPosition = window.pageYOffset;
  var quoteBlock = document.getElementById('scrollQuote');

  if (scrollPosition > 4200) {  // you can adjust this value
    quoteBlock.style.transform = 'translate3d(0, 0, 0)';
  } else {
    quoteBlock.style.transform = 'translate3d(100%, 0, 0)';
  }
}

document.body.onscroll = () => {
  moveCamera();
  moveProjectDescriptions();
  moveHeader(); // Call moveHeader function during scroll
};
animate();
