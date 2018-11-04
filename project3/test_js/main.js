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

function render()
{
  'use strict';
  renderer.render(scene, camera);
}

function animate() {
  'use strict';

  var delta = clock.getDelta();
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
  var plane = new Plane(300, 0xffaa00, scene);
  plane.obj.position.y += plane.getDepth() / 2;

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
  camera.position.set(-300, 100, 300)
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
      scene.traverse(function (node) {
        if (node instanceof THREE.Mesh) {
          node.material.wireframe = !node.material.wireframe;
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
  }
}

