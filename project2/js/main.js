/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, camera, renderer;
var cameras, cameraNo, updateCamera;
var clock;

function render()
{
  'use strict';
  renderer.render(myScene.scene, camera);
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
    case 51: // 3
      var old_cameraNo = cameraNo;
      cameraNo = e.keyCode - 48 - 1;
      if (old_cameraNo != cameraNo) {
        updateCamera = true;
      }
      break;

    case 69: // E
    case 101: // 3
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

  // FIXME
  // how to initialize the camera
  var camera = new THREE.OrthographicCamera(-scene.getWidth()/2, scene.getHeight()/2, 0, 0, -10000, 10000 );
  camera.left = - height * camera.aspect / 2;
  camera.right = height * camera.aspect / 2
  camera.top = height / 2 + (vert) ? height / 5 : 0; 
  camera.bottom = - height / 2 + (vert) ? height / 5 : 0;
  return camera;
}

function initFixedPerspective(scene) {
  'use strict';

  // FIXME
  // fill
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
  // FIXME
}
function updateFixedPerspective(w, h) {
  // FIXME
}
function updateAttachedPerspective(w, h) {
  // FIXME
}
