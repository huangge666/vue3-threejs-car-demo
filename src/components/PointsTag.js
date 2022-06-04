import * as THREE from 'three';

const CreatePointsTag = (obj) => {
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
};

let s = 0.0;
const waveAnimation = (arr) => {
  s += 0.01;
  if (s < 0.5) {
    arr.forEach((item) => {
      item.scale.x = 30 * (1 + s);
      item.scale.y = 30 * (1 + s);
    });
  } else if (s >= 0.5 && s < 1.0) {
    arr.forEach((item) => {
      item.scale.x = 30 * (2 - s);
      item.scale.y = 30 * (2 - s);
    });
  } else {
    s = 0.0;
  }
  requestAnimationFrame(() => waveAnimation(arr));
};

const CreatePointsTags = (obj) => {
  const LFDoorGroup = new THREE.Group();
  LFDoorGroup.name = 'LFDoorGroup';
  const RFDoorGroup = new THREE.Group();
  RFDoorGroup.name = 'RFDoorGroup';
  const LBDoorGroup = new THREE.Group();
  LBDoorGroup.name = 'LBDoorGroup';
  const RBDoorGroup = new THREE.Group();
  RBDoorGroup.name = 'RBDoorGroup';
  const TrunkDoorGroup = new THREE.Group();
  TrunkDoorGroup.name = 'TrunkDoorGroup';

  const LFDoor = obj.getObjectByName('左前门');
  const RFDoor = obj.getObjectByName('右车门');
  const LBDoor = obj.getObjectByName('左后门');
  const RBDoor = obj.getObjectByName('右后门');
  const TrunkDoor = obj.getObjectByName('后备箱');

  const LFSprite = CreatePointsTag(LFDoor);
  LFSprite.name = 'LFSprite';
  LFSprite.position.x += 340;
  LFSprite.position.y += -70;
  LFSprite.position.z += -80;
  LFDoorGroup.add(LFSprite);

  const RFSprite = CreatePointsTag(RFDoor);
  RFSprite.name = 'RFSprite';
  RFSprite.position.x += 340;
  RFSprite.position.y += -70;
  RFSprite.position.z += 80;
  RFDoorGroup.add(RFSprite);

  const LBSprite = CreatePointsTag(LBDoor);
  LBSprite.name = 'LBSprite';
  LBSprite.position.x += 200;
  LBSprite.position.y += -100;
  LBSprite.position.z += -70;
  LBDoorGroup.add(LBSprite);

  const RBSprite = CreatePointsTag(RBDoor);
  RBSprite.name = 'RBSprite';
  RBSprite.position.x += 200;
  RBSprite.position.y += -100;
  RBSprite.position.z += 70;
  RBDoorGroup.add(RBSprite);

  const TrunkSprite = CreatePointsTag(TrunkDoor);
  TrunkSprite.name = 'TrunkSprite';
  TrunkSprite.position.x += 0;
  TrunkSprite.position.y += -300;
  TrunkSprite.position.z += 0;
  TrunkDoorGroup.add(TrunkSprite);

  waveAnimation([LFSprite, RFSprite, LBSprite, RBSprite, TrunkSprite]);

  LFDoor.add(LFDoorGroup);
  RFDoor.add(RFDoorGroup);
  LBDoor.add(LBDoorGroup);
  RBDoor.add(RBDoorGroup);
  TrunkDoor.add(TrunkDoorGroup);
};

export {
  CreatePointsTag,
  CreatePointsTags,
};
