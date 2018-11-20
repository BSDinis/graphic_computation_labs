const rubiksSide = .2 
class Rubiks {
  constructor(factor, parentObj) {

    const rubiksShininess = 500;
    function generateFace(i, material) {
      var face = new THREE.PlaneGeometry(factor*rubiksSide, factor*rubiksSide, 5, 5);
      var plane = new THREE.Mesh(face, material);

      if (i % 2 == 0) 
        plane.rotateY(Math.PI);

      switch (i) {
        case 0:
        case 1:
          var f = (i % 2 == 0) ? -1 : 1;
          plane.position.z += f * factor*rubiksSide/2;
          break;

        case 2:
        case 3:
          plane.rotateY(Math.PI/2);
          var f = (i % 2 == 0) ? -1 : 1;
          plane.position.x += f * factor*rubiksSide/2;
          break;

        case 4:
        case 5:
          if (i % 2 == 0) 
            plane.rotateX(Math.PI/2);
          else 
            plane.rotateX(-Math.PI/2);
          var f = (i % 2 == 0) ? -1 : 1;
          plane.position.y += f * factor*rubiksSide/2;
          break;

        default:
          break;

      }

      return plane;
    }

    function generateBasicMaterial() {
      var material = [];
      var bmap = new THREE.TextureLoader().load('resources/cubeMap.bmp'); 
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/1.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/2.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/3.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/4.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/5.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/6.gif' ), bumpMap: bmap,  reflectivity: 2}))
      return material;
    }

    function generatePhongMaterial() {
      var material = [];
      var bmap = new THREE.TextureLoader().load('resources/cubeMap.bmp'); 
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/1.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/2.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/3.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/4.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/5.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/6.gif' ), bumpMap: bmap, shininess: rubiksShininess, reflectivity: 2}))
      return material;
    }

    this.obj = new THREE.Object3D();
    this.geometry = new THREE.CubeGeometry(factor*rubiksSide,factor*rubiksSide,factor*rubiksSide, 100, 1, 1);
    this.material = []
    this.material.push(generateBasicMaterial())
    this.material.push(generatePhongMaterial())
    this.index = 1;

    this.meshes = [];

    for (var i = 0; i < 6; i++) {
      this.meshes.push(generateFace(i, this.material[this.index][i]));
      this.obj.add(this.meshes[i]);
    }

    this.obj.position.y = factor * rubiksSide / 2;
    parentObj.add(this.obj);
  }

  reset () {
    this.index=1;
    for (var i = 0; i < 6; i++) {
      this.material[this.index][i].wireframe = wireframeDefault;
      this.meshes[i].material = this.material[this.index][i];
    }
  }

  toggleWireframe() {
    for (var i = 0; i < 6; i++)
      this.meshes[i].material.wireframe = ! this.meshes[i].material.wireframe 
  }

  toggleLighting() {
    var wireframe = this.meshes[0].material.wireframe;
    this.index = (this.index == 0) ? 1 : 0;

    for (var i = 0; i < 6; i++) {
      this.meshes[i].material = this.material[this.index][i];
      this.meshes[i].material.wireframe = wireframe
    }
  }
}
