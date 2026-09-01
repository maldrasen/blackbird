Ability.register('monster-use-article', {
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getAbilityEntry();
    round.addTime(750);
    EffectSystem.applyDuringBattle(Consumable.lookup(ability.article));
  },
});
