Ability.Bite = function(options) {
  return Ability.NaturalAttack({
    name: 'Bite',
    skill: 'daggers',
    textKey: 'bite',
    damageType: DamageType.pierce,
    ...options
  });
}
