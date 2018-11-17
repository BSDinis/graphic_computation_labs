/**
 * define wrapper do define several materials at once
 */

function genMaterials(inputColor, _wireframe, _texture = null, _opacity = 0.5, _reflectivity = 1, _shininess = 30, _transparent = false) {
  var materials = []
  materials.push(new THREE.MeshBasicMaterial({color: inputColor, wireframe: _wireframe}));
  if (_texture === null) 
    materials.push(new THREE.MeshPhongMaterial({color: inputColor, wireframe: _wireframe, opacity:_opacity, transparent: _transparent, reflectivity: _reflectivity, shininess: _shininess}));
  else
    materials.push(new THREE.MeshPhongMaterial({color: inputColor, wireframe: _wireframe, map: _texture, opacity:_opacity, transparent: _transparent, reflectivity: _reflectivity, shininess: _shininess}));

  return materials
 }
