/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, camera, renderer;
var cameras, cameraNo, updateCamera;
var cameraFactor, cameraArea;
var viewSize;
var clock;

var old_h = window.innerWidth;


function render()
{
  'use strict';
  renderer.render(scene.scene, camera);
}

function animate() {
  'use strict';
  camera = cameras[cameraNo];
  if (updateCamera) {
    switch(cameraNo) {
      case 0:
        updateTopOrtographic(window.innerWidth, window.innerHeight);
        break;
      case 1:
        updateFixedPerspective(window.innerWidth, window.innerHeight);
        break;
      case 2:
        updateAttachedPerspective(window.innerWidth, window.innerHeight);
        break;
    }
    updateCamera = false;
  }

  var delta = clock.getDelta();
  scene.updateScene(delta);
  render();
  requestAnimationFrame(animate);
}

function init()
{
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  scene = new Scene();
  cameras = initCameras(scene);
  camera = cameras[cameraNo];
  clock = new THREE.Clock(true);
  updateCamera = false;

  render();

  window.addEventListener('resize', onResize);
  window.addEventListener('keydown', onKeyDown);
}                     


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 49: // 1
    case 50: // 2
    //case 51: // 3
      var old_cameraNo = cameraNo;
      cameraNo = e.keyCode - 48 - 1;
      if (old_cameraNo != cameraNo) {
        updateCamera = true;
      }
      break;

    case 65: // A
    case 97: // a
      scene.scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
        }
      });
      break;

    case 69: // E
    case 101: // e
      scene.scene.traverse(function (node) {
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

  var cameras = [
    initTopOrtographicCamera(scene),
    initFixedPerspective(scene),
  ];

  cameraNo = 0;
  return cameras;
}

function initTopOrtographicCamera(scene) {
  'use strict';
  var camera = new THREE.OrthographicCamera(0, 0, 0, 0, -10000, 10000);
  setOrtographicCamera(camera)
  camera.position.y = 1000
  camera.lookAt(scene.scene.position)
  camera.updateProjectionMatrix();

  scene.scene.add(camera)
  return camera;
}

function setOrtographicCamera(camera)
{
  var factor = 2
  var w = scene.getWidth()
  var h = scene.getHeight()
  var aspect = window.innerWidth / window.innerHeight
  if (aspect < w / h) {
    camera.left = - w / factor
    camera.right = + w / factor
    camera.top = w / (aspect * factor);
    camera.bottom = -w / (aspect * factor);
  }
  else {
    camera.left = - h * aspect / factor
    camera.right = + h * aspect / factor
    camera.top = h / factor;
    camera.bottom = - h / factor;
  }
  camera.updateProjectionMatrix();
}

function initFixedPerspective(scene) {
  'use strict';
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.set(-scene.getWidth(), 50, scene.getHeight())
  camera.lookAt(scene.scene.position)
  scene.scene.add(camera)
  return camera;
}

function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  switch (cameraNo) {
    case 0:
      updateTopOrtographic(window.innerWidth, window.innerHeight);
      break;
    case 1:
      updateFixedPerspective(window.innerWidth, window.innerHeight);
      break;
  }
}

function updateTopOrtographic(w, h) {
  setOrtographicCamera(cameras[0])
}

function updateFixedPerspective(w, h) {
  if (w > 0 && h > 0) {                                                                                   
    let val = 1400 / window.innerWidth;
    let vector = new THREE.Vector3(-scene.getWidth(), 50, scene.getHeight())
    vector.multiplyScalar(val);
    camera.aspect = w / h;
    camera.position.x = vector.x
    camera.position.y = vector.y
    camera.position.z = vector.z
    camera.updateProjectionMatrix();
      
  }
}
