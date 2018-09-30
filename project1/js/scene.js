/**
 * scene.js
 *
 * define the scene class
 *   - lamp
 *   - table
 *   - chair
 */

// position of the center of the table
const tableDimensions = {
  width: 180,
  height: 100,
  baseHeight: 100,
  topDepth: 10
}

// position of the center of the lamp
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

// position of the center of the chair
const chairDimensions = {
  seatRadius: 30,
  seatThickness: 5,
  rodHeight: 50,
  rodRadius: 3,
  legLength: 30,
  legRadius: 3,
  wheelRadius: 5,
  backRodHeight: 30,
  backRodRadius: 3,
  backWidth: 80,
  backHeight: 50,
  backThickness: 5,
  noLegs: 4
}


class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    var axis = new THREE.AxisHelper(50);
    axis.visible = false;
    this.scene.add(axis);

    // private
    this._table = new Table({x: 0, y: 0, z: 0}, tableDimensions, 0x00ff00, this.scene);
    this._lamp = new Lamp({x: - 3 * tableDimensions.width / 4, y: 0, z: 0}, lampDimensions, 0x0000ff, this.scene);
  }
}
