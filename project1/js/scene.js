/**
 * scene.js
 *
 * define the scene class
 *   - lamp
 *   - table
 *   - chair
 */

// position of the center of the table
const tableX = 0;
const tableZ = 0;

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
    this._table = new Table(tableX, tableZ, #00ff00, this._scene);
  }
}
