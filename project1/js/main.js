/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var myScene, camera, renderer;
var cameras, cameraNo;
var lamp, table, chair;
var clock;

const camFactor = 2

var keys = {
  left: {code: 37, pressed: false},
  up: {code: 38, pressed: false},
  right: {code: 39, pressed: false},
  down: {code: 40, pressed: false}
}


function render()
{
  'use strict';
  renderer.render(myScene.scene, camera);
}

function animate() {
  'use strict';
  camera = cameras[cameraNo];
  var delta = clock.getDelta();

  var linear = 0;
  var angular = 0;
  if(keys.left.pressed){
    angular += 5;
  }
  if(keys.right.pressed){
    angular -= 5;
  }
  if(keys.up.pressed){
    linear -= 400;
  }
  if(keys.down.pressed){
    linear += 400;
  }
  chair.setAcceleration(linear + chair.getFriction())
  chair.setAngularAcceleration(angular + chair.getAngularFriction())

  if (chair.isMoving() || chair.hasAcceleration()){
    chair.updateSpeed(delta);
    chair.updateAngularSpeed(delta);
    chair.updatePosition(delta);
    chair.updateRotation(delta);
  }

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
  chair = myScene.getChair();
  table = myScene.getTable();
  lamp = myScene.getLamp();

  cameras = initCameras(myScene.scene);
  camera = cameras[cameraNo];
  clock = new THREE.Clock(true);

  render();

  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
}


function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    for (var i = 0; i < 3; i++) {
      var step = (i == 0) ? 0 : window.innerHeight * 0.2;
      cameras[i].left = -window.innerWidth / camFactor;
      cameras[i].right = window.innerWidth / camFactor;
      cameras[i].top = window.innerHeight / camFactor + step;
      cameras[i].bottom = -window.innerHeight / camFactor + step;
      cameras[i].updateProjectionMatrix();
    }
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

    case keys.left.code: // left arrow
      keys.left.pressed = true;
      break;
    case keys.up.code: // up arrow
      keys.up.pressed = true;
      break;
    case keys.right.code: // right arrow
      keys.right.pressed = true;
      break;
    case keys.down.code: // down arrow
      keys.down.pressed = true;
      break;
      break;

    default:
      break;
  }
}

function onKeyUp(e) {
  'use strict';

  switch (e.keyCode) {
    case keys.left.code: // left arrow
      keys.left.pressed = false;
      break;
    case keys.up.code: // up arrow
      keys.up.pressed = false;
      break;
    case keys.right.code: // right arrow
      keys.right.pressed = false;
      break;
    case keys.down.code: // down arrow
      keys.down.pressed = false;
      break;

    default:
      break;
  }
}

function initCameras(scene) {
  'use strict';
  var topCamera, frontalCamera, leftCamera;
  var width = 1000 / 2;
  var height = 500 / 2;
  var aspectRatio = window.innerWidth / window.innerHeigth;

  topCamera = createCamera(0);
  topCamera.position.set(0, 1000, 0);
  topCamera.lookAt(scene.position);
  topCamera.updateProjectionMatrix();

  frontalCamera = createCamera(0.2);
  frontalCamera.position.set(0, 0, 2000);
  frontalCamera.lookAt(scene.position);
  frontalCamera.updateProjectionMatrix();

  leftCamera = createCamera(0.2);
  leftCamera.position.set(-1000, 0, 0);
  leftCamera.lookAt(scene.position);
  leftCamera.updateProjectionMatrix();

  var cameras = [
    topCamera,
    frontalCamera,
    leftCamera
  ];

  cameraNo = 0;
  return cameras;
}

function createCamera(vertDisplacement) {
  'use strict';

  var camera = new THREE.OrthographicCamera(0, 0, 0, 0, -10000, 10000 );
  camera.left = -window.innerWidth / camFactor;
  camera.right = window.innerWidth / camFactor;
  camera.top = window.innerHeight / camFactor + window.innerHeight * vertDisplacement;
  camera.bottom = -window.innerHeight / camFactor + window.innerHeight * vertDisplacement;
  return camera;
}

