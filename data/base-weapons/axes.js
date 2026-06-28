
BaseWeapon.register('hatchet', {
  name: 'hatchet',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 20,
  high: 40,
  speed: 1000,
  textKey: 'basic-swing',
});

BaseWeapon.register('cleaver', {
  name: 'cleaver',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 30,
  high: 60,
  speed: 1000,
  textKey: 'basic-swing',
});

BaseWeapon.register('hand-axe', {
  name: 'hand axe',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.one,
  low: 40,
  high: 80,
  speed: 1000,
  textKey: 'basic-swing',
});

BaseWeapon.register('broad-axe', {
  name: 'broad axe',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  low: 60,
  high: 120,
  speed: 1200,
  textKey: 'basic-swing',
});

BaseWeapon.register('war-axe', {
  name: 'war axe',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.main,
  low: 80,
  high: 160,
  speed: 1200,
  textKey: 'basic-swing',
});

BaseWeapon.register('goosewing', {
  name: 'goosewing',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 200,
  speed: 1800,
  textKey: 'heavy-axe',
});

BaseWeapon.register('battle-axe', {
  name: 'battle axe',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 300,
  speed: 1800,
  textKey: 'heavy-axe',
});

BaseWeapon.register('labrys', {
  name: 'labrys',
  type: 'axe',
  damageType: DamageType.slash,
  hands: WeaponHandedness.two,
  low: 100,
  high: 400,
  speed: 2000,
  textKey: 'heavy-axe',
});
