
// The punch is the simplest of the natural attack abilities, used by monsters that fight without weapons.

NaturalAttackAbility.register('punch', {
  name: 'Punch',
  essence: 10,
  attack: {
    skill: 'martial-arts',
    name: 'fist',
    textKey: 'punch',
    damageType: DamageType.crush,
    low: 25,
    high: 50,
    speed: 500,
    reach: WeaponReach.short,
  },
});
