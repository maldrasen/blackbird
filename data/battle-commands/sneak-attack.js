BattleCommand.register(StandardAbility.sneakAttack, {
  name: 'Sneak Attack',
  category: 'basic',
  buildAbility: () => { return Ability.SneakAttack(); },
});
