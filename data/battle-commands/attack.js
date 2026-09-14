BattleCommand.register(BattleCommandCode.basicAttack, {
  name: 'Attack',
  category: 'basic',
  buildAbility: () => { return Ability.WeaponAttack(); },
});
