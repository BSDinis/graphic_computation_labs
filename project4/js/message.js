class Message {
  constructor(factor, messageImg, parentObj) {
    this.obj = new THREE.Object3D();
    this.texture = new THREE.TextureLoader().load(messageImg);
    this.material = new THREE.MeshBasicMaterial({color:0xffffff, wireframe: false, map: this.texture});
    this.base = new THREE.PlaneGeometry(factor,factor,90);         
    this.mesh = new THREE.Mesh(this.base, this.material);  
    this.mesh.rotateX(-Math.PI/2)
    this.obj.add(this.mesh);
    parentObj.add(this.obj);
  }

  toggleWireframe() {
    this.material.wireframe = ! this.material.wireframe;
  }
}
