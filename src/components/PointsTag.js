import * as THREE from 'three';

export default function CreatePointsTag(obj) {
  const spriteMaterial = new THREE.SpriteMaterial({
    map: new THREE.TextureLoader().load('./mark/light-point.png'),
    transparent: true,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(30, 30, 1);

  const pos = new THREE.Vector3();
  obj.getWorldPosition(pos);
  sprite.position.copy(pos);
  return sprite;
}
