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
var wireframe = false;

var arrows = {
  up: false,
  down: false,
  left: false,
  right: false
}

function render()
{
  'use strict';
  renderer.render(scene, camera);
}

function animate() {
  'use strict';

  var delta = clock.getDelta();
  const angle = Math.PI/4;
  if (arrows.up) {
    plane.obj.rotateX(angle * delta);
  }
  if (arrows.down) {
    plane.obj.rotateX(- angle * delta);
  }
  if (arrows.left) {
    plane.obj.rotateY(+ angle * delta);
  }
  if (arrows.right) {
    plane.obj.rotateY(- angle * delta);
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

  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0xffffff));

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


function initCamera(scene) {
  'use strict';

  var camera = initFixedPerspective(scene)
  return camera;
}

function initFixedPerspective(scene) {
  'use strict';
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
  camera.position.set(-400, 400, 400)
  camera.lookAt(scene.position)
  scene.add(camera)
  return camera;
}

function updateFixedPerspective(w, h) {
  if (w > 0 && h > 0) {                                                                                   
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    orbitControls.update();
  }
}

function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 65: // A
    case 97: // a
      wireframe = !wireframe
      scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = wireframe
        }
      });
      break;

    case 69: // E
    case 101: // e
      scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible;
        }
      });
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
