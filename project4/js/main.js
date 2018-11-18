/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, renderer;
var orbitControls;
var clock;
var old_width;
var old_height;

var toggleBallMov = false;
var toggleWireframe = false;
var toggleDirLight = false;
var togglePointLight = false;
var toggleCalc = false;
var pause = false;
var paused = false;
var refresh = false;
var sceneIndex = 0;

function render()
{
  'use strict';
  renderer.render(scene[sceneIndex].scene, scene[sceneIndex].getCamera());
}

function animate() {
  'use strict';

  if (toggleBallMov) { scene[sceneIndex].toggleBallMove(); toggleBallMov = false; }
  if (toggleWireframe) { scene[sceneIndex].toggleWireframe(); toggleWireframe = false; }
  if (toggleDirLight) { scene[sceneIndex].toggleDirLight(); toggleDirLight = false; }
  if (togglePointLight) { scene[sceneIndex].togglePointLight(); togglePointLight = false; }
  if (toggleCalc) { scene[sceneIndex].toggleCalc(); toggleCalc = false; }
  if (pause) {
    paused = ! paused;
    sceneIndex = (paused) ? 1 : 0;
    pause = false;
  }
  if (refresh) { 
    sceneIndex = 0;
    scene[sceneIndex].reset(); 
    refresh = false; 
    paused = false; 
  }

  var delta = clock.getDelta();
  if (paused) delta = 0;
  scene[sceneIndex].updateScene(delta);
  render();
  requestAnimationFrame(animate);
}

function init()
{
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = []
  scene.push(new MainScene(1000));
  scene.push(new MessageScene(1000));
  sceneIndex = 0;
  clock = new THREE.Clock(true);
  orbitControls = new THREE.OrbitControls(scene[sceneIndex].getCamera());
  orbitControls = new THREE.OrbitControls(scene[sceneIndex].getCamera(), renderer.domElement );
  orbitControls.enabled = true;
  orbitControls.enableZoom = false;
  orbitControls.enablePan = false;
  orbitControls.enableDamping = false;
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = 10;
  render();

  window.addEventListener('resize', onResize, false);
  window.addEventListener('keydown', onKeyDown, false);
}                     

function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  scene[0].resize(window.innerWidth, window.innerHeight);
  scene[1].resize(window.innerWidth, window.innerHeight);
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 66: // B
    case 98: // b 
      toggleBallMov=true;
      break;

    case 68: // D
    case 100: // d
      toggleDirLight=true
      break;

    case 76: // L
    case 108: // l
      toggleCalc=true;
      break;

    case 80: // P
    case 112: // p
      togglePointLight=true
      break;

    case 82: // R
    case 114: // r
      refresh = true && paused;
      break;

    case 83: // S
    case 115: // s
      pause = true;
      break;


    case 87: // W
    case 119: // w 
      toggleWireframe=true;
      break;


    default:
      break;
  }
}


