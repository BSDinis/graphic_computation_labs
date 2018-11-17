/**
 * define wrapper do define several materials at once
 */

function genMaterials(inputColor, _wireframe) {
  var materials = []
  materials.push(new THREE.MeshBasicMaterial({color: inputColor, wireframe: _wireframe}));
  materials.push(new THREE.MeshStandardMaterial({color: inputColor, wireframe: _wireframe}));
  return materials
 }
