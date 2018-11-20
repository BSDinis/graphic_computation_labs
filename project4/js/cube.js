function generateFace(i, side, material) {
  var face = new THREE.PlaneGeometry(side, side, 5, 5);
  var plane = new THREE.Mesh(face, material);

  if (i % 2 == 0) 
    plane.rotateY(Math.PI);

  switch (i) {
    case 0:
    case 1:
      var f = (i % 2 == 0) ? -1 : 1;
      plane.position.z += f * side/2;
      break;

    case 2:
    case 3:
      plane.rotateY(Math.PI/2);
      var f = (i % 2 == 0) ? -1 : 1;
      plane.position.x += f * side/2;
      break;

    case 4:
    case 5:
      if (i % 2 == 0) 
        plane.rotateX(Math.PI/2);
      else 
        plane.rotateX(-Math.PI/2);
      var f = (i % 2 == 0) ? -1 : 1;
      plane.position.y += f * side/2;
      break;

    default:
      break;

  }

  return plane;
}

