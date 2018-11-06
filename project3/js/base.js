class Base {
  constructor(factor, _wireframe, inputColour, parentObj) {
    this.width = this.height = factor;
    this.material1 = genMaterials(inputColour, _wireframe);
    this.material2 = genMaterials(0x000000, _wireframe); // black
    this.index = 1;
    this.oldIndex = 0;

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-factor / 2, 0, -factor / 2));
    geometry.vertices.push(new THREE.Vector3(factor / 2, 0, -factor / 2));
    geometry.vertices.push(new THREE.Vector3(-factor / 2, 0, factor / 2));
    geometry.vertices.push(new THREE.Vector3(factor / 2, 0, factor / 2));
    faceTesselate(geometry, 0, 2, 1, 5, false);
    faceTesselate(geometry, 1, 2, 3, 5, false);
    geometry.computeVertexNormals();

    var backGeometry = new THREE.Geometry();
    backGeometry.vertices.push(new THREE.Vector3(-factor / 2, 0, -factor / 2));
    backGeometry.vertices.push(new THREE.Vector3(factor / 2, 0, -factor / 2));
    backGeometry.vertices.push(new THREE.Vector3(-factor / 2, 0, factor / 2));
    backGeometry.vertices.push(new THREE.Vector3(factor / 2, 0, factor / 2));

    faceTesselate(backGeometry, 0, 2, 1, 1, true);
    faceTesselate(backGeometry, 1, 2, 3, 1, true);
    backGeometry.computeVertexNormals();

    this.mesh1 = new THREE.Mesh(geometry, this.material1[1])
    this.mesh2 = new THREE.Mesh(backGeometry, this.material2[1])
    parentObj.add(this.mesh1)
    parentObj.add(this.mesh2)
  }

  getHeight() {
    return this.height;
  }
  getWidth() {
    return this.width;
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
    this.material1[this.index].wireframe = this.mesh1.material.wireframe
    this.mesh1.material = this.material1[this.index]
    this.material2[this.index].wireframe = this.mesh2.material.wireframe
    this.mesh2.material = this.material2[this.index]
  }
}

