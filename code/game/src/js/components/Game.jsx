
import * as THREE from 'three';
import {Ground} from '../components/gameElements/';

let scene, camera, renderer;

const init = () => {
  createScene();
  requestAnimationFrame(render);
};

const createScene = () => {
  // set the scene size
  const WIDTH = 640,
    HEIGHT = 360;

  // set some camera attributes
  const VIEW_ANGLE = 50,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.01,
    FAR = 16000;

  // ThreeJS
  scene = new THREE.Scene(); //scene aanmaken

  camera = new THREE.PerspectiveCamera(
		VIEW_ANGLE,
		ASPECT,
		NEAR,
		FAR);

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(
    window.innerWidth,
    window.innerHeight
  );

  console.log(document.querySelector(`main`));

  scene.add(camera);

  camera.position.z = 320;
  document.querySelector(`main`).appendChild(renderer.domElement);

  const ground = new Ground(scene);
  scene.add(ground);
};


const render = () => {

  renderer.render(scene, camera);

  requestAnimationFrame(render); //meest performante manier voor animatie

};

init();
