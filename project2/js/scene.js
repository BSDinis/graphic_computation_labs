/**
 * scene.js
 *
 * define the scene class
 */

const nBalls = 1;
const initMaxSpeed = 5;

class Scene {
  constructor() {
    // public
    this.scene = new THREE.Scene();

    this.ring = new Ring(100, 0xff0000, this.scene);

    var innerWidth = this.ring.getWidth() - this.ring.getDepth() * 1.1
    var innerHeight = this.ring.getHeight() - this.ring.getDepth() * 1.1
    var radius = this.ring.getDepth()/2
    var initialPosition = genInitialPositions(innerWidth, innerHeight, radius, nBalls);

    this.ballArr = [];    
    for (var i = 0; i < nBalls; i++) {
      this.ballArr[i] = new Ball(radius, initMaxSpeed, genRandomColor(), this.scene);
      this.ballArr[i].capsule.position.x = initialPosition[i].x
      this.ballArr[i].capsule.position.z = initialPosition[i].z
      this.ballArr[i].capsule.position.y += radius;
      this.ballArr[i].rotate(genRandomAngle())
    }
  }

  getAspect() {
    return this.getWidth() / this.getHeight();
  }

  getWidth() {
    return this.ring.getWidth() * 1.15;
  }

  getHeight() {
    return this.ring.getHeight() * 1.15;
  }

  getDepth() {
    return this.ring.getDepth() * 1.15;
  }

  updateScene(delta) {
    for (var i = 0; i < nBalls; i++) {
      this.ballArr[i].updateBall(delta);

      var col = [];
      col.push(this.ballArr[i].checkWallCollision(this.ring.left))
      col.push(this.ballArr[i].checkWallCollision(this.ring.right))
      col.push(this.ballArr[i].checkWallCollision(this.ring.top))
      col.push(this.ballArr[i].checkWallCollision(this.ring.bottom))

      for (var j = 0; j < 4; j++) {
        if (col[j].happened) {
          this.ballArr[i].treatWallCollision(col[j]);
        }
      }

      var x_disp = delta * this.ballArr[i].getSpeed() * Math.sin(this.ballArr[i].getAngle());
      var z_disp = delta * this.ballArr[i].getSpeed() * Math.cos(this.ballArr[i].getAngle());
      this.ballArr[i].capsule.position.x += x_disp
      this.ballArr[i].capsule.position.z += z_disp
    }
  }
}


function genInitialPositions(w, h, radius, n)
{

  function conflict(list, len, new_el, r) {
    function el_conflict(el1, el2, r) {
      var w = el1.x - el2.x;
      var h = el1.z - el2.z;
      return w * w + h * h <= radius * radius * 4
    }
    for (var j = 0; j < len; j++) {
      if (el_conflict(list[j], new_el, r)) return true
    }

    return false
  }
  pos = [];
  for (var i = 0; i < n; i++) {
    var _x;
    var _z;
    var p;
    do {
      _x = Math.floor(Math.random() * w) - w/2;
      _z = Math.floor(Math.random() * h) - h/2;
      p = {x: _x, z: _z};
    } while (conflict(pos, i, p, radius));
    pos[i] = p;
  }
  return pos;
}

function genRandomColor()
{
  var r = Math.floor(Math.random() * 200) + 56;
  var g = Math.floor(Math.random() * 200) + 56;
  var b = Math.floor(Math.random() * 200) + 56;
  return (r * 256 + g) * 256 + b;
}

function genRandomAngle() 
{
  return Math.random() * 2 * Math.PI 
}
