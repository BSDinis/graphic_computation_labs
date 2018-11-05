/*
 * lamppost
 */

const ccolour = 0xffffff
const iintensity = .3

const bRadius = .3
const bHeight = .05
const rRadius = .05
const rHeight = 1
const sRadius = .2

class Lamppost {
  constructor(factor, wireframe, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.spotlight = new THREE.SpotLight(ccolour, iintensity);
    this.spotlight.castShadow = true;

    this.spotlight.shadow.mapSize.width = 1024;
    this.spotlight.shadow.mapSize.height = 1024;

    this.spotlight.shadow.camera.near = 500;
    this.spotlight.shadow.camera.far = 4000;
    this.spotlight.shadow.camera.fov = 10;
    this.spotlight.position.y = factor * (rHeight + bHeight + sRadius/2)

    this.obj.add(this.spotlight)
    parentObj.add(this.obj);
    this.spotlight.lookAt(parentObj)

    constructMesh(this.obj, factor, wireframe, inputColor)
  }
}


function constructMesh(parentObj, factor, _wireframe, inputColor) {
  var baseG = new THREE.CylinderGeometry(factor * bRadius, factor * bRadius, factor * bHeight, 10, 40)
  var rodG = new THREE.CylinderGeometry(factor * rRadius, factor * rRadius, factor * rHeight, 40, 10)
  var bulbG = new THREE.SphereGeometry(factor * sRadius, 40, 40)
  baseG.computeVertexNormals();
  rodG.computeVertexNormals();
  bulbG.computeVertexNormals();

  var base = new THREE.Mesh(baseG, new THREE.MeshStandardMaterial({color: inputColor, wireframe: _wireframe}))
  var rod = new THREE.Mesh(rodG, new THREE.MeshStandardMaterial({color: inputColor, wireframe: _wireframe}))
  var bulb = new THREE.Mesh(bulbG, new THREE.MeshStandardMaterial({color: inputColor, wireframe: _wireframe}))
  base.position.y += factor * bHeight/2;
  rod.position.y += factor * (bHeight + rHeight/2);
  bulb.position.y += factor * (bHeight + rHeight + sRadius/2);
  parentObj.add(base)
  parentObj.add(rod)
  parentObj.add(bulb)
}
