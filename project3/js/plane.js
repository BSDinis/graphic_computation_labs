/*
 * plane.js
 *
 * define a plane
 */

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
    this.meshes[0].material = this.materials.wing[this.index]
    this.meshes[1].material = this.materials.wing[this.index]
    this.meshes[2].material = this.materials.fuselage[this.index]
    this.meshes[3].material = this.materials.fuselage[this.index]
    this.meshes[4].material = this.materials.cockpit[this.index]
    this.meshes[5].material = this.materials.cockpit[this.index]
    this.meshes[6].material = this.materials.vertstab[this.index]
    this.meshes[7].material = this.materials.vertstab[this.index]
    this.meshes[8].material = this.materials.horizstab[this.index]
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
  faceOrder[0] = orderVertices(0, 2, 1, flip);  
  faceOrder[1] = orderVertices(0, 9, 10, flip);  
  faceOrder[2] = orderVertices(0, 10, 2, flip);  

  faceOrder[3] = orderVertices(1, 4, 3, flip);  
  faceOrder[4] = orderVertices(1, 2, 4, flip);  
  faceOrder[5] = orderVertices(2, 10, 4, flip);  
  faceOrder[6] = orderVertices(10, 12, 4, flip);  
  faceOrder[7] = orderVertices(9, 11, 12, flip);  
  faceOrder[8] = orderVertices(9, 12, 10, flip);  

  faceOrder[9] = orderVertices(3, 6, 5, flip);  
  faceOrder[10] = orderVertices(3, 4, 6, flip);  
  faceOrder[11] = orderVertices(4, 12, 6, flip);  
  faceOrder[12] = orderVertices(12, 14, 6, flip);  
  faceOrder[13] = orderVertices(11, 13, 14, flip);  
  faceOrder[14] = orderVertices(11, 14, 12, flip);  

  faceOrder[15] = orderVertices(5, 8, 7, flip);  
  faceOrder[16] = orderVertices(5, 6, 8, flip);  
  faceOrder[17] = orderVertices(6, 14, 8, flip);  
  faceOrder[18] = orderVertices(14, 16, 8, flip);  
  faceOrder[19] = orderVertices(13, 15, 16, flip);  
  faceOrder[20] = orderVertices(13, 16, 14, flip);  
  faceOrder[21] = orderVertices(7, 8, 16, flip);  
  faceOrder[22] = orderVertices(16, 15, 7, flip);  

  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));

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
  faceOrder[0] = orderVertices(0, 1, 2, flip);  
  faceOrder[1] = orderVertices(0, 2, 3, flip);

  faceOrder[2] = orderVertices(4, 6, 5, flip);  
  faceOrder[3] = orderVertices(4, 7, 6, flip);

  faceOrder[4] = orderVertices(1, 5, 6, flip);  
  faceOrder[5] = orderVertices(1, 6, 2, flip);

  faceOrder[6] = orderVertices(2, 6, 7, flip);  
  faceOrder[7] = orderVertices(2, 7, 3, flip);

  faceOrder[8] = orderVertices(3, 7, 4, flip);  
  faceOrder[9] = orderVertices(3, 4, 0, flip);

  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));

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
  faceOrder[0] = orderVertices(0, 1, 2, flip);  
  faceOrder[1] = orderVertices(0, 2, 3, flip);

  faceOrder[2] = orderVertices(6, 8, 7, flip);  
  faceOrder[3] = orderVertices(6, 9, 8, flip);

  faceOrder[4] = orderVertices(0, 3, 9, flip);  
  faceOrder[5] = orderVertices(0, 9, 6, flip);

  faceOrder[6] = orderVertices(2, 8, 9, flip);  
  faceOrder[7] = orderVertices(2, 9, 3, flip);

  faceOrder[8] = orderVertices(1, 4, 5, flip);  
  faceOrder[9] = orderVertices(1, 5, 2, flip);

  faceOrder[10] = orderVertices(7, 5, 4, flip);  
  faceOrder[11] = orderVertices(7, 8, 5, flip);

  faceOrder[12] = orderVertices(5, 8, 2, flip);  

  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));

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

  var faceOrder = []
  faceOrder[0] = orderVertices(0, 1, 2, flip);  
  faceOrder[1] = orderVertices(0, 2, 3, flip);

  faceOrder[2] = orderVertices(4, 6, 5, flip);  
  faceOrder[3] = orderVertices(4, 7, 6, flip);

  faceOrder[4] = orderVertices(1, 5, 6, flip);  
  faceOrder[5] = orderVertices(1, 6, 2, flip);

  faceOrder[6] = orderVertices(2, 6, 7, flip);  
  faceOrder[7] = orderVertices(2, 7, 3, flip);

  faceOrder[8] = orderVertices(3, 7, 4, flip);  
  faceOrder[9] = orderVertices(3, 4, 0, flip);

  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));

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

  var faceOrder = []
  faceOrder[0] = orderVertices(0, 1, 2, flip);  
  faceOrder[1] = orderVertices(0, 2, 3, flip);

  faceOrder[2] = orderVertices(4, 6, 5, flip);  
  faceOrder[3] = orderVertices(4, 7, 6, flip);

  faceOrder[4] = orderVertices(1, 5, 6, flip);  
  faceOrder[5] = orderVertices(1, 6, 2, flip);

  faceOrder[6] = orderVertices(2, 6, 7, flip);  
  faceOrder[7] = orderVertices(2, 7, 3, flip);

  faceOrder[8] = orderVertices(3, 7, 4, flip);  
  faceOrder[9] = orderVertices(3, 4, 0, flip);

  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));

  geometry.translate(0, 3/10, -2.70)
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, material);
}

function orderVertices(one, two, three, flip = false)
{
  if (!flip) 
    return {a: one, b: two, c: three}
  else 
    return {a: two, b: one, c: three}
}
