/*
 * lamppost
 */

const _colour = 0xffff00
const _intensity = 1
const _decay = 1.9
const _penumbra = .9
const _angle = Math.PI/4
const _distance = 15

const bRadius = .3
const bHeight = .05
const rRadius = .05
const rHeight = 1
const sRadius = .2

class Lamppost {
  constructor(factor, wireframe, inputColor, parentObj) {
    this.obj = new THREE.Object3D();
    this.spotlight = new THREE.SpotLight(_colour, _intensity);
    this.spotlight.angle = _angle
    this.spotlight.decay = _decay
    this.spotlight.penumbra = _penumbra
    this.spotlight.distance = _distance * factor

    this.spotlight.castShadow = true;
    this.spotlight.shadow.mapSize.width = 1024;
    this.spotlight.shadow.mapSize.height = 1024;
    this.spotlight.shadow.camera.near = 500;
    this.spotlight.shadow.camera.far = 4000;
    this.spotlight.shadow.camera.fov = 10;

    this.spotlight.position.y = factor * (rHeight + bHeight + sRadius/2)

    this.obj.add(this.spotlight)
    this.spotlight.lookAt(parentObj)
    this.material = genMaterials(inputColor, wireframe);
    this.lampMaterial = genMaterials(_colour, wireframe);
    this.index = 1;
    this.oldIndex = 0;

    this.meshes = constructMesh(factor, this.material[this.index], this.lampMaterial[this.index])
    for (var i = 0; i < this.meshes.length; i++)
      this.obj.add(this.meshes[i])


    parentObj.add(this.obj);
  }

  toggle() {
    this.spotlight.visible = !this.spotlight.visible;
  }

  toggleLightingCalc() {
    var tmp = this.oldIndex;
    this.oldIndex = this.index;
    this.index = tmp;
    this.updateMaterial();
  }

  togglePhongGouraud() {
    if (this.index == 0) {
      this.oldIndex = (this.oldIndex == 1) ? 2 : 1;
    }
    else {
      this.index = (this.index == 1) ? 2 : 1;
      this.updateMaterial();
    }
  }

  updateMaterial() {
    for (var i = 0; i < this.meshes.length - 1; i++) {
      this.material[this.index].wireframe = this.meshes[i].material.wireframe
      this.meshes[i].material = this.material[this.index]
    }
    this.lampMaterial[this.index].wireframe = this.meshes[2].material.wireframe
    this.meshes[2].material = this.lampMaterial[this.index]
  }
}


function constructMesh(factor, material, lampMaterial) {
  var baseG = new THREE.CylinderGeometry(factor * bRadius, factor * bRadius, factor * bHeight, 10, 40)
  var rodG = new THREE.CylinderGeometry(factor * rRadius, factor * rRadius, factor * rHeight, 40, 10)
  var bulbG = new THREE.SphereGeometry(factor * sRadius, 20, 20)
  baseG.computeVertexNormals();
  rodG.computeVertexNormals();
  bulbG.computeVertexNormals();

  var base = new THREE.Mesh(baseG, material)
  var rod = new THREE.Mesh(rodG, material)
  var bulb = new THREE.Mesh(bulbG, lampMaterial)
  base.position.y += factor * bHeight;
  rod.position.y += factor * (bHeight + rHeight/2);
  bulb.position.y += factor * (bHeight + rHeight + sRadius/2);
  return [base, rod, bulb];
}
