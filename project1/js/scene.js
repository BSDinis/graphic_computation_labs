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
  baseHeight: 10,
  rodHeight: 150,
  rodRadius: 5,
  bulbRadius: 7.5,
  shadeSmallRadius: 20,
  shadeBigRadius: 40
}

// position of the center of the chair
const chairX = 0;
const chairZ = 0;


class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    // private
    this._table = new Table(tableDimensions, 0x00ff00, this.scene);
    this._lamp = new Lamp(lampDimensions, 0x0000ff, this.scene);
  }
}
