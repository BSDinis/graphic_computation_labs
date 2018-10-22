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
        break; // @FIXME
        updateFixedPerspective(window.innerWidth, window.innerHeight);
        break;
      case 2:
        break; // @FIXME
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
      var old_cameraNo = cameraNo;
      cameraNo = e.keyCode - 48 - 1;
      if (old_cameraNo != cameraNo) {
        updateCamera = true;
      }
      // @FIXME 
    case 51: // 3
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
    initAttachedCamera(scene)
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
  var view_size = scene.getHeight()
  var aspect = window.innerWidth / window.innerHeight
  console.log(scene.getHeight())
  if (window.innerWidth > scene.getWidth()) {
    camera.left = - view_size * aspect / factor
    camera.right = view_size * aspect / factor
  }
  else { console.log("the width is smaller than the scene: resize ! ") }
  camera.top = view_size / factor
  camera.bottom = - view_size / factor
  camera.updateProjectionMatrix();
}

function initFixedPerspective(scene) {
  'use strict';
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.set(-scene.getWidth(), 100, scene.getHeight())
  camera.lookAt(scene.scene.position)
  scene.scene.add(camera)
  return camera;
}

function initAttachedCamera(scene) {
  'use strict';

  // FIXME
  // fill
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
    case 2:
      updateAttachedPerspective(window.innerWidth, window.innerHeight);
      break;
  }
}

function updateTopOrtographic(w, h) {
  setOrtographicCamera(cameras[0])
}

function updateFixedPerspective(w, h) {
  if (w > 0 && h > 0) {                                                                                   
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
  }
}
function updateAttachedPerspective(w, h) {
  // FIXME
}
