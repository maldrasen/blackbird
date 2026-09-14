Ability.Punch = function(options) {
  return Ability.NaturalAttack({
    name: 'Punch',
    skill: 'martial-arts',
    textKey: 'punch',
    damageType: DamageType.crush,
    ...options
  });
}