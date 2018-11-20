class MessageCamera{
  constructor(factor, w, h, parentObj) {
    this.camera = new THREE.OrthographicCamera(0, 0, 0, 0, -10000, 10000);
    this.width = w;
    this.height = h;
    this.resizeCamera(window.innerWidth, window.innerHeight);
    this.camera.position.y = factor * 2
    this.camera.lookAt(parentObj.position)
    this.camera.updateProjectionMatrix();
    parentObj.add(this.camera)
  }

  resizeCamera(width, height) {
    var w = this.width
    var h = this.height
    var aspect = width / height
    if (aspect < w / h) {
      this.camera.left = - w / 2
      this.camera.right = + w / 2
      this.camera.top = w / (aspect * 2);
      this.camera.bottom = -w / (aspect * 2);
    }
    else {
      this.camera.left = - h * aspect / 2
      this.camera.right = + h * aspect / 2
      this.camera.top = h / 2;
      this.camera.bottom = - h / 2;
    }
    this.camera.updateProjectionMatrix();
  }
}

