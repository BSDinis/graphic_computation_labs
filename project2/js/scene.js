/**
 * scene.js
 *
 * define the scene class
 */

const nBalls = 10;

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
      this.ballArr[i] = new Ball(radius, genRandomColor(), this.scene);
      this.ballArr[i].obj.position.x = initialPosition[i].x
      this.ballArr[i].obj.position.z = initialPosition[i].z
      this.ballArr[i].obj.position.y += radius;
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
    // FIXME
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
