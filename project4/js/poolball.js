const maxSpeed = 3;
const radius = 0.1
const orbitRadius = 0.35

class PoolBall{
  constructor(factor, inputColor, parentObj) {
    this.capsule = new THREE.Object3D();
    this.obj =  new THREE.Object3D();
    this.radius = radius * factor;
    this.orbitRadius = orbitRadius * factor;

    this.texture =  new THREE.TextureLoader().load( 'resources/16079.jpg' );
    this.materials = genMaterials(inputColor, false, this.texture, 0.5, 1, 100);
    var geometry = new THREE.SphereGeometry(this.radius, 20, 20);
    this.angle = 0;
    this.rotAngle = 0;

    this.mesh = new THREE.Mesh(geometry, this.materials[1]);
    this.capsule.add(this.mesh);
    this.reset();
    this.obj.add(this.capsule);

    parentObj.add(this.obj);
  }

  reset() {
    this.index = 1;
    this.materials[this.index].wireframe = false;
    this.speed = 0;
    this.moving = 1;
    this.mesh.material = this.materials[this.index];
    this.capsule.position.x = this.orbitRadius;
    this.capsule.position.y = this.radius;
    this.capsule.position.z = 0;
    this.obj.rotateY(-this.angle);
    this.angle = 0;
    this.capsule.rotateX(-this.rotAngle);
    this.rotAngle = 0;
  }

  toggleWireframe() {
    this.materials[this.index].wireframe = ! this.materials[this.index].wireframe;
  }

  toggleLighting() {
    var wireframe = this.materials[this.index].wireframe;
    this.index = (this.index == 0) ? 1 : 0;
    this.materials[this.index].wireframe = wireframe
    this.mesh.material = this.materials[this.index];
  }

  toggleMovement() {
    this.moving = (this.moving == 0) ? 1 : 0;
  }

  updateBall(delta) {
    this.angle += delta * this.speed
    this.obj.rotateY(delta * this.speed);
    this.rotAngle += -delta * this.orbitRadius/this.radius * this.speed;
    this.capsule.rotateX(-delta * this.orbitRadius/this.radius * this.speed);
    this.speed += delta * (this.moving * maxSpeed - this.speed) 
  }

  getDepth() { return 2* this.radius; }
  getPos() { return this.capsule.position; }
}

