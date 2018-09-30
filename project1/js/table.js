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
  constructor(tableX, tableZ, colour, scene) {
    /**
     * Auxiliar constructor
     *
     * @param dimensions dimension of the table top
     * @param material material of the tabletop
     */
    function construct_top(dimensions, material) {

      var geometry = new THREE.CubeGeometry(
        dimensions.width,
        dimensions.depth,
        dimensions.height);

      var mesh = new THREE.Mesh(geometry, material);

      // move to location 
      mesh.position.set(0, dimensions.base_height, 0);
      return mesh;
    }

    /**
     * Construct a table leg
     *
     * from the top view:
     *
     * +----------+
     * |0        1|
     * |          |
     * |2        3|
     * +----------+
     *
     * these are the leg numbers
     *
     * @param legNo 	the number of the leg, according to the scheme above
     * @param dimension dimensions of the table
     * @param material
     */
    function construct_leg(legNo, dimensions, material) {
      var radius = .1 * dimensions.height; // radius of the table leg
      var leg_positions = [
        {x: 3 * radius, z: 3 * radius},
        {x: dimensions.width - 3 * radius, z: 3 * radius},
        {x: 3 * radius, z: dimensions.height - 3 * radius},
        {x: dimensions.width - 3 * radius, z: dimensions.height - 3 * radius},
      ]

      var geometry = new THREE.CylinderGeometry(radius, radius, dimensions.base_height, 10, 10, false);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = leg_positions[legNo].x;
      mesh.position.y = 0;
      mesh.position.z = leg_positions[legNo].z;

      return mesh
    }


    /****************************************/

    this._table = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: input_color, wireframe: true});
    this._dimensions = { width: 180, depth: 5, height: 100, base_height: 150};

    this._top = construct_top(this._dimensions, this._material);
    this._table.add(this._top);

    for (var i = 0; i < 4; i++) {
      this._legs[i] = construct_leg(i, this._height, this._material);

      this._table.add(this._legs[i]);
    }

    scene.add(this._table);
    this._table.position.set(tableX, 0, tableZ);
  }
}
