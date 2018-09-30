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
  var factor = 16
  var topCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  topCamera.position.set(0, 60, 0);
  topCamera.lookAt(myScene.scene.position);

  render();
}
