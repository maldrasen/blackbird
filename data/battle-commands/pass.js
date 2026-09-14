BattleCommand.register(BattleCommandCode.pass, {
  name: 'Pass',
  category: 'basic',
  buildAbility: () => { return Ability.Pass(); },
});
