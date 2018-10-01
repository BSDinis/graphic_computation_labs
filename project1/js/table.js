/*
 * table.js
 *
 * define table class
 */

/**
 * Table is the class that encapsulates the design of a table
 * 
 * @author BSDinis
 */
class Table {
  /**
   * Class constructor for table
   *
   * @param tableX the xx coordinate of the table
   * @param tableZ the zz coordinate of the table
   * @param colour the colour of the table.
   *
   * @author BSDinis
   */
  constructor(position, dimensions, inputColor, scene) {
    this._table = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});

    this.tableTop = new TableTop(
      {x: 0, y: dimensions.baseHeight, z: 0},
      dimensions,
      this._material,
      this._table
    );
    this._table.position.set(position.x, position.y, position.z);
    scene.add(this._table);
  }
}


class TableTop {
  constructor(position, dimensions, material, parentObj) {
    var geometry = new THREE.CubeGeometry(dimensions.width, dimensions.topDepth, dimensions.height);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

    var radius = .1 * dimensions.height; // radius of the table leg
    var x0 = -dimensions.width/2 + 2 * radius;
    var y0 = -dimensions.baseHeight/2 - dimensions.topDepth/2
    var z0 = -dimensions.height/2 + 2 * radius;

    this.leg = [];
    this.leg[0] = new TableLeg(radius, {x: x0, y: y0, z: z0}, dimensions, material, this.mesh);
    this.leg[1] = new TableLeg(radius, {x: -x0, y: y0, z: z0}, dimensions, material, this.mesh);
    this.leg[2] = new TableLeg(radius, {x: x0, y: y0, z: -z0}, dimensions, material, this.mesh);
    this.leg[3] = new TableLeg(radius, {x: -x0, y: y0, z: -z0}, dimensions, material, this.mesh);

    // move to location 
    this.mesh.position.set(position.x, position.y + dimensions.topDepth/2, position.z);
    parentObj.add(this.mesh);
  }
}


class TableLeg {
  constructor(radius, position, dimensions, material, parentObj) {
    var geometry = new THREE.CylinderGeometry(radius, radius, dimensions.baseHeight, 10, 10, false);
    this.mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
    this.mesh.position.set(position.x, position.y, position.z);
    parentObj.add(this.mesh);
  }
}
