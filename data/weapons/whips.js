
// The chain weapons are filed under hard rather than heavy because a whip's slash damage runs on the lash factor, which
// only the metals define. Nothing in MaterialType singles out leather, so the leather whips use pliable for now.

BaseWeapon.register('bullwhip', {
  nameFunction: () => { return `Bullwhip`; },
  icon: 'weapons/whip-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  damageRange: [20,50],
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  speed: 1000,
  materials: { leather:2 },
  effort: 3,
  textKey: 'basic-swing',
});

BaseWeapon.register('chain-whip', {
  nameFunction: names => { return `${names[0]} Chain Whip`; },
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  damageRange: [30,70],
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  speed: 1100,
  materials: { hard:2 },
  effort: 4,
  textKey: 'basic-swing',
});

// TODO: Need a better sickle and chain
BaseWeapon.register('sickle-and-chain', {
  nameFunction: names => { return `${names[0]} Sickle and Chain`; },
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  damageRange: [40,90],
  hands: WeaponHandedness.two,
  reach: WeaponReach.extended,
  speed: 1200,
  materials: { hard:2 },
  effort: 5,
  textKey: 'basic-swing',
});

// TODO: Need a better ball and chain
BaseWeapon.register('ball-and-chain', {
  nameFunction: (names, materials) => {
    if (materials.bone) { return `Skull and Chain`; }
    if (materials.stone) { return `Stone and Chain`; }
    return `${names[0]} Ball and Chain`;
  },
  icon: 'weapons/chain-01.png',
  type: 'whip',
  damageType: DamageType.crush,
  damageRange: [40,100],
  hands: WeaponHandedness.main,
  reach: WeaponReach.extended,
  speed: 1300,
  materials: { heavy:3, hard:1 },
  effort: 4,
  textKey: 'heavy-mace',
});

BaseWeapon.register('flail', {
  nameFunction: names => { return `${names[0]} Flail`; },
  icon: 'weapons/flail-01.png',
  type: 'whip',
  damageType: DamageType.crush,
  damageRange: [35,90],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1200,
  materials: { heavy:3, hard:1 },
  effort: 4,
  textKey: 'heavy-mace',
});

// TODO: Needs a better icon.
BaseWeapon.register('cat-o-nine-tails', {
  nameFunction: () => { return `Cat o' Nine Tails`; },
  icon: 'weapons/whip-01.png',
  type: 'whip',
  damageType: DamageType.slash,
  damageRange: [15,45],
  hands: WeaponHandedness.main,
  reach: WeaponReach.close,
  speed: 1000,
  materials: { leather:2 },
  effort: 3,
  textKey: 'basic-swing',
});
