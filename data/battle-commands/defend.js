BattleCommand.register(StandardAbility.defend, {
  name: 'Defend',
  category: 'basic',
  buildAbility: () => { return Ability.Defend(); },
});
