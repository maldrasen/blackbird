Ability.register('monster-use-article', {
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getActingMonster().getAbility('monster-use-article');
    BattleConsumableSystem.useConsumable(ability.article);
  },
});
