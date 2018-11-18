const angSpeed = -0.5;


class RotatingCamera{
  constructor(factor, parentObj) {
    this.capsule = new THREE.Object3D();
    this.obj =  new THREE.Object3D();
    this.axis = new THREE.AxisHelper(2 * radius);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
    this.camera.position.set( factor,factor,factor);
    this.camerawidth = window.innerWidth;
    this.obj.add(this.camera);
    this.camera.lookAt(this.obj.position);
    parentObj.add(this.obj);
  }

  resizeCamera(w, h) {
    let old_aspect = this.camera.aspect
    this.camera.aspect = w / h;
    if (w != this.camerawidth)
      this.camera.fov = 2 * Math.atan(Math.tan((this.camera.fov * Math.PI/180) / 2) * (old_aspect/this.camera.aspect)) * 180 / Math.PI

    this.camerawidth = w;
    this.camera.updateProjectionMatrix();
  }

  updateCamera(delta) {
    this.obj.rotateY(delta * angSpeed);
  }
}

