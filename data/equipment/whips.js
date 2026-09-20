
// The chain whips are filed under hard rather than heavy because a whip's slash damage runs on the lash factor, which
// only the metals define.

// TODO: Some "whips" like the flails or the chain whips have their damage scaled by the welder's strength. Other
//       flogger like whips though shouldn't scale at all, and should instead have a flat damage. Bullwhips and Cats
//       aren't great weapons, but they can hold interesting enchantments or have certain special abilities.

BaseEquipment.register('bullwhip', {
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

BaseEquipment.register('chain-whip', {
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
BaseEquipment.register('sickle-and-chain', {
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
BaseEquipment.register('ball-and-chain', {
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

BaseEquipment.register('flail', {
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
BaseEquipment.register('cat-o-nine-tails', {
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
