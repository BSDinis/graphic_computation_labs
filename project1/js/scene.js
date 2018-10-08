/**
 * scene.js
 *
 * define the scene class
 *   - lamp
 *   - table
 *   - chair
 */

// dimensions of the table
const tableDimensions = {
  width: 180,
  height: 100,
  baseHeight: 100,
  topDepth: 10
}

// dimensions of the lamp
const lampDimensions = {
  baseRadius: 25,
  baseHeight: 5,
  rodHeight: 150,
  rodRadius: 2.5,
  bulbRadius: 7.5,
  shadeSmallRadius: 25,
  shadeBigRadius: 30,
  shadeHeight: 35
}

// dimensions of the chair
const chairDimensions = {
  seatRadius: 40,
  seatThickness: 5,
  armRestRadius: 2,
  rodHeight: 40,
  rodRadius: 3,
  legLength: 30,
  legRadius: 3,
  wheelRadius: 3,
  backWidth: 80,
  backHeight: 105,
  backThickness: 5,
  noLegs: 5
}

const maxSpeed = 500;
const maxAngularSpeed = 2 * Math.PI;

// dimensions of the rug
const rugDimensions = {
  width: 550,
  height: 300,
  thickness: 10
}


class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    var axis = new THREE.AxisHelper(50);
    axis.visible = false;
    this.scene.add(axis);

    this.rug = new Rug(rugDimensions, this.scene);
    // private
    this.chair = new Chair({x: 0, y: rugDimensions.thickness, z: 100}, chairDimensions, 0xff0000, this.rug);
    this.table = new Table({x: 0, y: rugDimensions.thickness, z: 0}, tableDimensions, 0x00ff00, this.rug);
    this.lamp = new Lamp({x: - 3 * tableDimensions.width / 4, y: rugDimensions.thickness, z: 0}, lampDimensions, 0x0000ff, this.rug);
  }

  getChair() {
    return this.chair;
  }

  getTable() {
    return this.table;
  }

  getLamp() {
    return this.lamp;
  }
}


class Rug {
  constructor(dimensions, parentObj) {
    this.obj = new THREE.Object3D();
    var material = new THREE.MeshBasicMaterial({color: 0xbbbb00, wireframe: true});
    var geometry = new THREE.CubeGeometry(dimensions.width, dimensions.thickness, dimensions.height);
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y += dimensions.thickness / 2;
    this.obj.add(this.mesh);
    parentObj.add(this.obj);
  }

  add(child) {
    this.obj.add(child);
  }
}
