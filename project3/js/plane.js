/*
 * plane.js
 *
 * define a plane
 */

const big_surface_tesselate_factor = 3
const small_surface_tesselate_factor = 1

class Plane {
  constructor(factor, wireframe, parentObj) {
    this.obj = new THREE.Object3D();

    this.axis = new THREE.AxisHelper(1.5 * factor);
    this.axis.visible = true;
    this.obj.add(this.axis)
    this.factor = factor

    this.index = 1;
    this.oldIndex = 0;

    this.materials = constructMaterial(wireframe)
    this.meshes = constructMeshes(this.materials, this.index);

    for (var i = 0; i < this.meshes.length; i++) {
      this.meshes[i].scale.set(factor/2, factor/2, factor/2);
      this.obj.add(this.meshes[i])
    }
    parentObj.add(this.obj);
  }

  getAspect() {
    return getWidth() / getHeight();
  }
  getHeight() {
    return this.factor * 5;
  }
  getWidth() {
    return this.factor * 2 * 4;
  }
  getDepth() {
    return this.factor * 1/5;
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
    this.materials.wing[this.index].wireframe = this.meshes[0].material.wireframe
    this.meshes[0].material = this.materials.wing[this.index]
    this.materials.wing[this.index].wireframe = this.meshes[1].material.wireframe
    this.meshes[1].material = this.materials.wing[this.index]
    this.materials.fuselage[this.index].wireframe = this.meshes[2].material.wireframe
    this.meshes[2].material = this.materials.fuselage[this.index]
    this.materials.fuselage[this.index].wireframe = this.meshes[3].material.wireframe
    this.meshes[3].material = this.materials.fuselage[this.index]
    this.materials.cockpit[this.index].wireframe = this.meshes[4].material.wireframe
    this.meshes[4].material = this.materials.cockpit[this.index]
    this.materials.cockpit[this.index].wireframe = this.meshes[5].material.wireframe
    this.meshes[5].material = this.materials.cockpit[this.index]
    this.materials.vertstab[this.index].wireframe = this.meshes[6].material.wireframe
    this.meshes[6].material = this.materials.vertstab[this.index]
    this.materials.vertstab[this.index].wireframe = this.meshes[7].material.wireframe
    this.meshes[7].material = this.materials.vertstab[this.index]
    this.materials.horizstab[this.index].wireframe = this.meshes[8].material.wireframe
    this.meshes[8].material = this.materials.horizstab[this.index]
    this.materials.horizstab[this.index].wireframe = this.meshes[9].material.wireframe
    this.meshes[9].material = this.materials.horizstab[this.index]
  }
}

function constructMaterial(_wireframe) {
  var mat = {}
  mat.wing = genMaterials(0x004400, _wireframe)
  mat.fuselage = genMaterials(0x005500, _wireframe)
  mat.cockpit = genMaterials(0xcccccc, _wireframe)
  mat.vertstab = genMaterials(0x009900, _wireframe)
  mat.horizstab = genMaterials(0x00aa00, _wireframe)
  return mat
}

function constructMeshes(materials, i) {
  'use strict'
  var mesh = []

  mesh[0] = constructWing(materials.wing[i]);
  mesh[1] = constructWing(materials.wing[i], true);
  mesh[2] = constructFuselage(materials.fuselage[i]);
  mesh[3] = constructFuselage(materials.fuselage[i], true);
  mesh[4] = constructCockPit(materials.cockpit[i]);
  mesh[5] = constructCockPit(materials.cockpit[i], true);
  mesh[6] = constructVerticalStabilizer(materials.vertstab[i]);
  mesh[7] = constructVerticalStabilizer(materials.vertstab[i], true);
  mesh[8] = constructHorizStabilizer(materials.horizstab[i]);
  mesh[9] = constructHorizStabilizer(materials.horizstab[i], true);

  return mesh
}


function constructFuselage(material, flip = false) {
  var geometry = new THREE.Geometry();

  var f = (flip) ? -1 : 1;

  var width = [1/3, 1, 1, 1/2]
  var height = [1/10, 1/5, 1/5, 1/10]
  
  geometry.vertices.push(
    new THREE.Vector3(0, 0, 3),  // 0
    new THREE.Vector3(0, height[0], 2),  // 1
    new THREE.Vector3(f*width[0], height[0], 2),  // 2
    new THREE.Vector3(0, height[1], 1),  // 3
    new THREE.Vector3(f*width[1], height[1], 1),  // 4
    new THREE.Vector3(0, height[2], -1),  // 5
    new THREE.Vector3(f*width[2], height[2], -1),  // 6
    new THREE.Vector3(0, height[3], -3),  // 7
    new THREE.Vector3(f*width[3], height[3], -3),  // 8
    new THREE.Vector3(0, -height[0], 2),  // 1 -> 9
    new THREE.Vector3(f*width[0], -height[0], 2),  // 2 -> 10
    new THREE.Vector3(0, -height[0], 1),  // 3 -> 11
    new THREE.Vector3(f*width[1], -height[0], 1),  // 4 -> 12
    new THREE.Vector3(0, -height[0], -1),  // 5 -> 13
    new THREE.Vector3(f*width[2], -height[0], -1),  // 6 -> 14
    new THREE.Vector3(0, -height[0], -3),  // 7 -> 15
    new THREE.Vector3(f*width[3], -height[0], -3),  // 8 -> 16
  )

  var faceOrder = []
  faceTesselate(geometry, 0, 2, 1, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 9, 10, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 10, 2, big_surface_tesselate_factor, flip);  

  faceTesselate(geometry, 1, 4, 3, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 1, 2, 4, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 2, 10, 4, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 10, 12, 4, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 9, 11, 12, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 9, 12, 10, big_surface_tesselate_factor, flip);  

  faceTesselate(geometry, 3, 6, 5, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 3, 4, 6, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 4, 12, 6, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 12, 14, 6, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 11, 13, 14, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 11, 14, 12, big_surface_tesselate_factor, flip);  

  faceTesselate(geometry, 5, 8, 7, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 5, 6, 8, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 6, 14, 8, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 14, 16, 8, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 13, 15, 16, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 13, 16, 14, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 7, 8, 16, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 16, 15, 7, big_surface_tesselate_factor, flip);  

  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function constructWing(material, flip = false) {
  var geometry = new THREE.Geometry();

  var f = (flip) ? -1 : 1;
  var depth = 1/20;
  var width = 2;
  
  geometry.vertices.push(
    new THREE.Vector3(0, depth, -1),  // 0
    new THREE.Vector3(0, depth, 1),  // 1
    new THREE.Vector3(width * f, depth, -1),  // 2
    new THREE.Vector3(width * f, depth, -2), // 3
    new THREE.Vector3(0, -depth, -1),  // 4
    new THREE.Vector3(0, -depth, 1),  // 5
    new THREE.Vector3(width * f, -depth, -1),  // 6
    new THREE.Vector3(width * f, -depth, -2)  // 7
  )

  var faceOrder = []
  faceTesselate(geometry, 0, 1, 2, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 2, 3, big_surface_tesselate_factor, flip);

  faceTesselate(geometry, 4, 6, 5, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 4, 7, 6, big_surface_tesselate_factor, flip);

  faceTesselate(geometry, 1, 5, 6, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 1, 6, 2, big_surface_tesselate_factor, flip);

  faceTesselate(geometry, 2, 6, 7, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 2, 7, 3, big_surface_tesselate_factor, flip);

  faceTesselate(geometry, 3, 7, 4, big_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 3, 4, 0, big_surface_tesselate_factor, flip);


  geometry.translate(f * 1, 1/20, 0)
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function constructCockPit(material, flip = false) {
  var geometry = new THREE.Geometry();

  var f = (flip) ? -1 : 1;
  var depth = 1/5;
  var width = 1/3;

  geometry.vertices.push(
    new THREE.Vector3(0, depth, 0),  // 0
    new THREE.Vector3(0, depth, 1/2),  // 1
    new THREE.Vector3(f *width, depth, 1/2),  // 2
    new THREE.Vector3(f *width, depth, 0),  // 3
    new THREE.Vector3(0, 0, 1),  // 4
    new THREE.Vector3(f *width/2, 0, 1),  // 5
    new THREE.Vector3(0, 0, 0),  // 6
    new THREE.Vector3(0, 0, 1/2),  // 7
    new THREE.Vector3(f *width, 0, 1/2),  // 8
    new THREE.Vector3(f *width, 0, 0),  // 9
  )

  var faceOrder = []
  faceTesselate(geometry, 0, 1, 2, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 2, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 6, 8, 7, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 6, 9, 8, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 0, 3, 9, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 9, 6, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 2, 8, 9, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 2, 9, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 1, 4, 5, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 1, 5, 2, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 7, 5, 4, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 7, 8, 5, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 5, 8, 2, small_surface_tesselate_factor, flip);  


  geometry.translate(0, 1/20, 1)
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function constructVerticalStabilizer(material, flip = false) {
  var geometry = new THREE.Geometry();

  var f = (flip) ? -1 : 1;
  var depth = [2/5, 3/5];
  var width = 1/20;
  
  geometry.vertices.push(
    new THREE.Vector3(0, 0, 0),  // 0
    new THREE.Vector3(0, 0, 1/2),  // 1
    new THREE.Vector3(0, depth[0], 1/3),  // 2
    new THREE.Vector3(0, depth[1], 0),  // 3
    new THREE.Vector3(f*width, 0, 0),  // 4
    new THREE.Vector3(f*width, 0, 1/2),  // 5
    new THREE.Vector3(f*width, depth[0], 1/3),  // 6
    new THREE.Vector3(f*width, depth[1], 0),  // 7
  )

  faceTesselate(geometry, 0, 1, 2, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 2, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 4, 6, 5, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 4, 7, 6, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 1, 5, 6, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 1, 6, 2, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 2, 6, 7, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 2, 7, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 3, 7, 4, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 3, 4, 0, small_surface_tesselate_factor, flip);


  geometry.translate(0, 0, -2.75)
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}



function constructHorizStabilizer(material, flip = false) {
  var geometry = new THREE.Geometry();

  var f = (flip) ? -1 : 1;
  var depth = 1/30;
  var width = 3/10;
  var height = 3/10
  
  geometry.vertices.push(
    new THREE.Vector3(0, depth, 0),  // 0
    new THREE.Vector3(0, depth, height),  // 1
    new THREE.Vector3(width * f, depth, height),  // 2
    new THREE.Vector3(1.5 * width * f, depth, 0), // 3
    new THREE.Vector3(0, -depth, 0),  // 4
    new THREE.Vector3(0, -depth, height),  // 5
    new THREE.Vector3(width * f, -depth, height),  // 6
    new THREE.Vector3(1.5 * width * f, -depth, 0), // 7
  )

  faceTesselate(geometry, 0, 1, 2, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 0, 2, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 4, 6, 5, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 4, 7, 6, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 1, 5, 6, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 1, 6, 2, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 2, 6, 7, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 2, 7, 3, small_surface_tesselate_factor, flip);

  faceTesselate(geometry, 3, 7, 4, small_surface_tesselate_factor, flip);  
  faceTesselate(geometry, 3, 4, 0, small_surface_tesselate_factor, flip);

  geometry.translate(0, 3/10, -2.70)
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

