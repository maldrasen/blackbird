BattleCommand.register(StandardAbility.pass, {
  name: 'Pass',
  category: 'basic',
  buildAbility: () => { return Ability.Pass(); },
});
