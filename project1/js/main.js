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
  var factor = 4;
  camera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  camera.position.set(0, 1000, 0);
  camera.lookAt(myScene.scene.position);

  render();
}
