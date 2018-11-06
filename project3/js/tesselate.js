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

function faceTesselate(geometry, one, two, three, segs, flip = false)
{
  faceOrder = []

  var v1 = geometry.vertices[one]
  var v2 = geometry.vertices[two]
  var v3 = geometry.vertices[three]

  var one_two = {
    x: (v2.x - v1.x)/segs, 
    y: (v2.y - v1.y)/segs,
    z: (v2.z - v1.z)/segs
  }
  var one_three = {
    x: (v3.x - v1.x)/segs, 
    y: (v3.y - v1.y)/segs,
    z: (v3.z - v1.z)/segs
  }

  var line_root = new THREE.Vector3(v1.x, v1.y, v1.z);
  for (var i = 0; i < segs ; i++) {
    root_vertex = new THREE.Vector3(line_root.x, line_root.y, line_root.z)
    for (var j = i; j < segs ; j++) {
      var sec_vertex = new THREE.Vector3(
        root_vertex.x + one_two.x,
        root_vertex.y + one_two.y,
        root_vertex.z + one_two.z
      )
      var thr_vertex = new THREE.Vector3(
        root_vertex.x + one_three.x,
        root_vertex.y + one_three.y,
        root_vertex.z + one_three.z
      )
      geometry.vertices.push(new THREE.Vector3(root_vertex.x, root_vertex.y, root_vertex.z))
      geometry.vertices.push(sec_vertex)
      geometry.vertices.push(thr_vertex)

      var base = geometry.vertices.length - 3
      faceOrder.push(orderVertices(base, base + 1, base + 2, flip))

      if (j < segs - 1 && i < segs - 1) {
        var opposite = new THREE.Vector3(
          root_vertex.x + one_two.x + one_three.x,
          root_vertex.y + one_two.y + one_three.y,
          root_vertex.z + one_two.z + one_three.z
        )

        geometry.vertices.push(opposite)
        faceOrder.push(orderVertices(base + 1, base + 3, base + 2, flip))
      }

      root_vertex = thr_vertex;
    }
    line_root.x += one_two.x
    line_root.y += one_two.y
    line_root.z += one_two.z
  }

  
  for (var i = 0; i < faceOrder.length; i++)
    geometry.faces.push(new THREE.Face3(faceOrder[i].a, faceOrder[i].b, faceOrder[i].c));
}
