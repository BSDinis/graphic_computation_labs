class RotatingCamera{
  constructor(factor, parentObj) {
    this.capsule = new THREE.Object3D();
    this.obj =  new THREE.Object3D();
    this.factor = factor;
    this.angle = 0;

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    this.camerawidth = window.innerWidth;
    this.cameraheight = window.innerHeight
    this.camera.position.set(this.factor,this.factor,this.factor);
    this.obj.add(this.camera);
    this.camera.lookAt(this.obj.position);
    parentObj.add(this.obj);
  }

  reset() {
    this.obj.rotateY(-this.angle);
    this.angle = 0;
  }

  resizeCamera(w, h) {
    let old_aspect = this.camera.aspect
    this.camera.aspect = w / h;
    if (w != this.camerawidth && h == this.cameraheight) //Math.abs(h - this.cameraheight) <= 5)
      this.camera.fov = 2 * Math.atan(Math.tan((this.camera.fov * Math.PI/180) / 2) * (old_aspect/this.camera.aspect)) * 180 / Math.PI

    this.camerawidth = w;
    this.cameraheight = h;
    this.camera.updateProjectionMatrix();
  }

  updateCamera(delta) {
    /*
    this.angle += delta * angSpeed;
    this.obj.rotateY(delta * angSpeed);
    */
  }
}

