
BaseWeapon.register('hammer', {
  name: 'Hammer',
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.one,
  low: 10,
  high: 50,
  attackText:'basic-swing',
});

BaseWeapon.register('mace', {
  name: 'Mace',
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.one,
  low: 20,
  high: 100,
  attackText:'basic-swing',
});

BaseWeapon.register('warhammer', {
  name: 'Warhammer',
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.primary,
  low: 30,
  high: 150,
  attackText:'basic-swing',
});

BaseWeapon.register('morning-star', {
  name: 'Morning Star',
  type: 'mace',
  damageTypes: [
    { type:DamageType.crush, percent:50 },
    { type:DamageType.pierce, percent:50 }
  ],
  hands: WeaponHandedness.primary,
  low: 50,
  high: 200,
  attackText:'basic-swing',
});

BaseWeapon.register('maul', {
  name: 'Maul',
  type: 'mace',
  damageType: DamageType.crush,
  hands: WeaponHandedness.two,
  low: 100,
  high: 500,
  attackText:'basic-swing',
});
