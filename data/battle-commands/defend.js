BattleCommand.register(BattleCommandCode.basicDefend, {
  name: 'Defend',
  category: 'basic',
  buildAbility: () => { return Ability.Defend(); },
});
