/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var myScene, camera, renderer;

function render()
{
  'use strict';
  renderer.render(myScene.scene, camera);
}

function init()
{
  'use strict';

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  myScene = new Scene();
  var cameras = initCameras();
  camera = cameras[1];
  camera.lookAt(myScene.scene.position);

  render();
}


function initCameras() {
  'use strict';
  var topCamera, frontalCamera, leftCamera;
  var factor = 4;

  topCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  topCamera.position.set(0, 1000, 0);

  frontalCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  frontalCamera.position.set(0, 0, 1000);

  leftCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  leftCamera.position.set(-1000, 0, 0);

  var cameras = [
    topCamera,
    frontalCamera,
    leftCamera
  ];

  return cameras
}

