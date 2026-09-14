BattleCommand.register(BattleCommandCode.hide, {
  name: 'Hide',
  category: 'basic',
  buildAbility: () => { return Ability.Hide(); },
});
