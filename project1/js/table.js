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
    /**
     * Auxiliar constructor
     *
     * @param dimensions dimension of the table top
     * @param material material of the tabletop
     */
    function construct_top(dimensions, material) {

      var geometry = new THREE.CubeGeometry( dimensions.width, dimensions.topDepth, dimensions.height);
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));

      // move to location 
      mesh.position.set(dimensions.width/2, dimensions.baseHeight/2 + dimensions.topDepth/2, dimensions.height/2);
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
     * @param legNo 	 the number of the leg, according to the scheme above
     * @param dimensions dimensions of the table
     * @param material
     */
    function construct_leg(legNo, dimensions, material) {
      var radius = .1 * dimensions.height; // radius of the table leg
      var leg_positions = [
        {x: 2 * radius, z: 2 * radius},
        {x: dimensions.width - 2 * radius, z: 2 * radius},
        {x: 2 * radius, z: dimensions.height - 2 * radius},
        {x: dimensions.width - 2 * radius, z: dimensions.height - 2 * radius},
      ]
      

      var geometry = new THREE.CylinderGeometry(radius, radius, dimensions.baseHeight, 10, 10, false);
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial(material));
      mesh.position.x = leg_positions[legNo].x;
      mesh.position.y = 0;
      mesh.position.z = leg_positions[legNo].z;

      return mesh
    }


    /****************************************/

    this._table = new THREE.Object3D();
    this._material = new THREE.MeshBasicMaterial({color: inputColor, wireframe: true});


    this._legs = [];
    for (var i = 0; i < 4; i++) {
      this._legs[i] = construct_leg(i, dimensions, this._material);
      this._table.add(this._legs[i]);
    }

    this._top = construct_top(dimensions, this._material);
    this._table.add(this._top);

    scene.add(this._table);
    this._table.position.x = -dimensions.width / 2;
    this._table.position.y = 0;
    this._table.position.z = -dimensions.height / 2;
  }
}
