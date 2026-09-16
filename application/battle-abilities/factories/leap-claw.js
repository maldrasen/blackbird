Ability.LeapClaw = function(options) {
  return Ability.NaturalAttack({
    name: 'Leap Claw',
    skill: 'daggers',
    textKey: 'leap-claw',
    damageType: DamageType.slash,
    ...options
  });
}
