class Base {
  constructor(factor, inputColour, parentObj) {
    var material = new THREE.MeshStandardMaterial({color: inputColour, wireframe: false});
    var geometry = new THREE.Geometry();
    this.width = this.height = factor;
    geometry.vertices.push(new THREE.Vector3(-factor / 2, 0, -factor / 2));
    geometry.vertices.push(new THREE.Vector3(factor / 2, 0, -factor / 2));
    geometry.vertices.push(new THREE.Vector3(-factor / 2, 0, factor / 2));
    geometry.vertices.push(new THREE.Vector3(factor / 2, 0, factor / 2));
    geometry.faces.push(new THREE.Face3(0, 2, 1));
    geometry.faces.push(new THREE.Face3(1, 2, 3));

    geometry.computeVertexNormals();

    this.mesh = new THREE.Mesh(geometry, material)
    parentObj.add(this.mesh)
  }

  getHeight() {
    return this.height;
  }
  getWidth() {
    return this.width;
  }
}

