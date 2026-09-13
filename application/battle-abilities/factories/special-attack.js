Ability.SpecialAttack = function(options) {
  const ability = Ability();

  return ability;
}

// We may need this for abilities that are too different from other natural attacks. SneakAttack may be a type of
// special attack with its own conditions and such, but uses the character's weapon. SneakAttack could also be its own
// factory.
