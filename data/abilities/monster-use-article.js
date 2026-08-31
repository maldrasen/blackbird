Ability.register('monster-use-article', {
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getActingMonster().getAbility('monster-use-article');
    round.addTime(750);
    EffectSystem.applyDuringBattle(Consumable.lookup(ability.article));
  },
});
