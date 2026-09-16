BattleCommand.register(StandardAbility.attack, {
  name: 'Attack',
  category: 'basic',
  buildAbility: () => { return Ability.WeaponAttack(); },
});
