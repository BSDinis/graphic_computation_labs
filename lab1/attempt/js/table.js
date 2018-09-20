/* global THREE */

var camera, scene, renderer;

var geometry, material, mesh;

var ball;

function render () 
{
  'use strict';
  renderer.render(scene, camera);
}

function init()
{
  'use strict';

  renderer = new THREE.WebGLRenderer({ antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  createScene();
  createCamera();

  render();

  window.addEventListener("resize", onResize);
}

function createScene()
{
  'use strict';
  scene = new THREE.Scene();
  scene.add(new THREE.AxisHelper(10)); // prints axis

  createTable(0, 8, 0);
  createBall(0, 0, 15);
}

function onResize()
{
  'use strict';
  renderer.setSize(window.innerWidth, window.innerHeight);

  if (window.innerHeight > 0 && window.innerWidth > 0) {
    camera.aspect = renderer.getSize().width / renderer.getSize().height;
    camera.updateProjectionMatrix();
  }
}

function createCamera()
{
  'use strict';
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.x = 50;
  camera.position.y = 50;
  camera.position.z = 50;
  camera.lookAt(scene.position);
}

function createTable(x, y, z)
{
  'use strict';
  var table = new THREE.Object3D();
  material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true });

  addTableTop(table, 0, 0, 0);
  addTableLeg(table, -25, -1, -8);
  addTableLeg(table, -25, -1, 8);
  addTableLeg(table, 25, -1, -8);
  addTableLeg(table, 25, -1, 8);

  scene.add(table);

  table.position.x = x;
  table.position.y = y;
  table.position.z = z;
}


function addTableTop(obj, x, y, z)
{
  'use strict';
  geometry = new THREE.CubeGeometry(60, 2, 20);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y, z);

  obj.add(mesh);
}


function addTableLeg(obj, x, y, z)
{
  'use strict';
  geometry = new THREE.CubeGeometry(2, 6, 2);
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(x, y - 3, z);
  obj.add(mesh);
}


function createBall(x, y, z)
{
  'use strict';
  
  ball = new THREE.Object3D();
  ball.userData = {jumping: true, step: 0};

  material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true});
  geometry = new THREE.SphereGeometry(4, 10, 10);
  mesh = new THREE.Mesh(geometry, material);

  ball.add(mesh);
  ball.position.set(x, y, z);

  scene.add(ball);
}
