BattleCommand.register(BattleCommandCode.sneakAttack, {
  name: 'Sneak Attack',
  category: 'basic',
  buildAbility: () => { return Ability.SneakAttack(); },
});
