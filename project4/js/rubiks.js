const rubiksSide = .2 
class Rubiks {
  constructor(factor, parentObj) {

    const rubiksShininess = 500;
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
    this.geometry = new THREE.CubeGeometry(factor*rubiksSide,factor*rubiksSide,factor*rubiksSide, 10, 10, 10);
    this.material = []
    this.material.push(generateBasicMaterial())
    this.material.push(generatePhongMaterial())
    this.index = 1;
    this.mat = new THREE.MeshFaceMaterial(this.material[this.index]);
    this.mesh = new THREE.Mesh(this.geometry, this.mat);
    this.mesh.position.y = factor * rubiksSide / 2;
    this.mesh.rotateY(Math.PI/-1);
    this.mesh.rotateX(Math.PI/-2);
    this.obj.add(this.mesh);
    parentObj.add(this.obj);
  }

  toggleWireframe() {
    for (var i = 0; i < 6 ; i++) 
      this.mesh.material.materials[i].wireframe = ! this.mesh.material.materials[i].wireframe 
  }

  toggleLighting() {
    var wireframe = this.mesh.material.materials[0].wireframe 
    this.index = (this.index == 0) ? 1 : 0;

    for (var i = 0; i < 6 ; i++) {
      this.mesh.material.materials[i] = this.material[this.index][i];
      this.mesh.material.materials[i].wireframe = wireframe
    }
  }
}
