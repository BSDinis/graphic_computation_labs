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
const lampX = 0;
const lampZ = 0;

// position of the center of the chair
const chairX = 0;
const chairZ = 0;


class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    // private
    this._table = new Table(tableDimensions, 0x00ff00, this.scene);
  }
}
