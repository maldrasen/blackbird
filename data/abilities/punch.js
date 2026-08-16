
// The punch is the simplest of the natural attack abilities, used by monsters that fight without weapons.

NaturalAttackAbility.register('punch', {
  name: 'Punch',
  essence: 10,
  attack: {
    skill: 'martial-arts',
    name: 'fist',
    textKey: 'punch',
    damage: [20,30],
    damageType: DamageType.crush,
    speed: 500,
    reach: WeaponReach.short,
  },
});
