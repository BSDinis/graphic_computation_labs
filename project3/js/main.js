/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, camera, renderer;
var orbitControls;
var clock;

var arrows = {
  up: false,
  down: false,
  left: false,
  right: false
}

var old_val = 1;
var orig_height;
var wireframe = false;


function render()
{
  'use strict';
  renderer.render(scene.scene, camera);
}

function animate() {
  'use strict';

  var delta = clock.getDelta();
  scene.updateScene(delta, arrows);
  render();
  requestAnimationFrame(animate);
}

function init()
{
  'use strict';
  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  orig_height = window.innerHeight;

  scene = new Scene(wireframe);
  camera = initCamera(scene);
  clock = new THREE.Clock(true);
  orbitControls = new THREE.OrbitControls(camera, );
  orbitControls = new THREE.OrbitControls( camera, renderer.domElement );
  orbitControls.enabled = true;
  orbitControls.enableZoom = false;
  orbitControls.enablePan = false;
  orbitControls.enableDamping = false;
  orbitControls.autoRotate = true;
  orbitControls.autoRotateSpeed = 10;
  render();

  window.addEventListener('resize', onResize, false);
  window.addEventListener('keydown', onKeyDown, false);
  window.addEventListener('keyup', onKeyUp, false);
}                     

function onResize() {
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateFixedPerspective(window.innerWidth, window.innerHeight);
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 65: // A
    case 97: // a
      wireframe = !wireframe
      scene.scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = wireframe
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

    case 78: // N
    case 110: // n
      scene.toggleSunlight();
      break;

    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
      var n = e.keyCode - 48 - 1
      scene.toggleLamp(n)
      break;

    case 37:
      arrows.left = true;
      break;
    case 38:
      arrows.up = true;
      break;
    case 39:
      arrows.right = true;
      break;
    case 40:
      arrows.down = true;
      break;
    default:
      break;
  }
}

function onKeyUp(e) {
  'use strict';

  switch (e.keyCode) {
    case 37: // left arrow
      arrows.left = false;
      break;
    case 38:// up arrow
      arrows.up = false;
      break;
    case 39: // right arrow
      arrows.right = false;
      break;
    case 40: // down arrow
      arrows.down = false;
      break;

    default:
      break;
  }
}

function initCamera(scene) {
  'use strict';

  var camera = initFixedPerspective(scene)
  return camera;
}

function initFixedPerspective(scene) {
  'use strict';
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.set(-scene.getWidth() * .8, scene.getDepth() * 1.5, scene.getHeight() * .8)
  camera.lookAt(scene.scene.position)
  scene.scene.add(camera)
  return camera;
}

function updateFixedPerspective(w, h) {
  if (w > 0 && h > 0) {                                                                                   
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    orbitControls.update();
  }
}
