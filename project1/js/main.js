/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var myScene, camera, renderer;
var cameras, cameraNo;

function render()
{
  'use strict';
  renderer.render(myScene.scene, camera);
}

function animate() {
  'use strict';
  camera = cameras[cameraNo];
  render();
  requestAnimationFrame(animate);
}

function init()
{
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  myScene = new Scene();
  cameras = initCameras(myScene.scene);
  camera = cameras[cameraNo];
  render();

  window.addEventListener("resize", onResize);
  window.addEventListener("keydown", onKeyDown);
}


function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 65: // A
    case 97: // a
      myScene.scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;

    case 49: // 1
    case 50: // 2
    case 51: // 3
      cameraNo = e.keyCode - 48 - 1;
      break;

    case 69: // E
    case 101: // 3
      myScene.scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible;
        }
      });
      break;

    default:
      break;
  }
}


function initCameras(scene) {
  'use strict';
  var topCamera, frontalCamera, leftCamera;
  var factor = 4;
  var width = 1000 / 2;
  var height = 500 / 2;

  topCamera = new THREE.OrthographicCamera( 
    -width * window.innerWidth / window.innerHeight ,
    width * window.innerWidth / window.innerHeight ,
    height * window.innerWidth / window.innerHeight ,
    -height * window.innerWidth / window.innerHeight ,
    1,
    1000 
  );
  topCamera.position.set(0, 1000, 0);
  topCamera.lookAt(scene.position);

  frontalCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  frontalCamera.position.set(0, 0, 1000);
  frontalCamera.lookAt(scene.position);

  leftCamera = new THREE.OrthographicCamera( window.innerWidth / - factor, window.innerWidth / factor, window.innerHeight / factor, window.innerHeight / - factor, 1, 1000 );
  leftCamera.position.set(-1000, 0, 0);
  leftCamera.lookAt(scene.position);

  var cameras = [
    topCamera,
    frontalCamera,
    leftCamera
  ];

  cameraNo = 0;
  return cameras;
}

