const rubiksSide = .2 
class Rubiks {
  constructor(factor, parentObj) {

    const rubiksShininess = 100;
    function generateBasicMaterial() {
      var material = [];
      var bmap = new THREE.TextureLoader().load('resources/cubeMap.bmp'); 
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/1.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/2.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/3.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/4.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/5.gif' ), bumpMap: bmap,  reflectivity: 2}))
      material.push(new THREE.MeshBasicMaterial({color: 0xffffff, map: new THREE.ImageUtils.loadTexture( 'resources/6.gif' ), bumpMap: bmap,  reflectivity: 2}))
      return new THREE.MeshFaceMaterial(material);
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
      return new THREE.MeshFaceMaterial(material);
    }
    this.obj = new THREE.Object3D();
    this.geometry = new THREE.BoxGeometry(factor*rubiksSide,factor*rubiksSide,factor*rubiksSide, 1, 1, 1);
    this.material = [];
    this.material.push(generateBasicMaterial())
    this.material.push(generatePhongMaterial())
    this.index = 1;
    this.mesh = new THREE.Mesh(this.geometry, this.material[this.index]);
    this.mesh.position.y = factor * rubiksSide / 2;
    this.mesh.rotateY(Math.PI/-1);
    this.mesh.rotateX(Math.PI/-2);
    this.obj.add(this.mesh);
    parentObj.add(this.obj);
  }

  toggleWireframe() {
    this.material[this.index].wireframe = ! this.material[this.index].wireframe;
  }

  toggleLighting() {
    var wireframe = this.material[this.index].wireframe;
    this.index = (this.index == 0) ? 1 : 0;
    this.material[this.index].wireframe = wireframe
    this.mesh.material = this.material[this.index];
  }
}
