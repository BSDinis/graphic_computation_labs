/**
 * main.js
 *
 * main file for the project
 *
 * define the render and init functions
 */

var scene, renderer;
var orbitControls;
var clock;
var old_width;
var old_height;
var wireframe = false;


function render()
{
  'use strict';
  renderer.render(scene.scene, scene.getCamera());
}

function animate() {
  'use strict';

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

  scene = new Scene(1000, wireframe);
  clock = new THREE.Clock(true);
  orbitControls = new THREE.OrbitControls(scene.getCamera());
  orbitControls = new THREE.OrbitControls(scene.getCamera(), renderer.domElement );
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
  scene.resize(window.innerWidth, window.innerHeight);
}


function onKeyDown(e) {
  'use strict';

  switch (e.keyCode) {
    case 69: // E
    case 101: // e 
      // FIXME
      scene.scene.traverse(function (node) {
        if (node instanceof THREE.AxisHelper) {
          node.visible = !node.visible;
        }
      });
      break;

    case 68: // d
      scene.toggleDirlight();
      break;

    case 71: // G
    case 103: // g
      //scene.togglePhongGouraud();
      break;

    case 76: // H
    case 108: // h
      //scene.toggleLightingCalc();
      break;

    case 49: // 1
    case 50: // 2
    case 51: // 3
    case 52: // 4
      var n = e.keyCode - 48 - 1
      //scene.toggleLamp(n)
      break;

    default:
      break;
  }
}


