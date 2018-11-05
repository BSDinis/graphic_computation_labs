/*
 *
 * tesselate a face
 */

function orderVertices(one, two, three, flip = false)
{
  if (!flip) 
    return {a: one, b: two, c: three}
  else 
    return {a: two, b: one, c: three}
}

function faceTesselate(geometry, one, two, three, horizSeg, vertSeg, flip = false)
{
  faceOrder = orderVertices(one, two, three, flip)
  geometry.faces.push(new THREE.Face3(faceOrder.a, faceOrder.b, faceOrder.c));
}
