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
const tableY = 0;

// position of the center of the lamp
const lampX = 0;
const lampY = 0;

// position of the center of the chair
const chairX = 0;
const chairY = 0;


class Scene {
  constructor() {
    this.lamp = new Lamp(lampX, lampY, #ff0000);
    this.table = new Table(tableX, tableY, #00ff00);
    this.chair = new Chair(chairX, chairY, #0000ff);
  }
}
