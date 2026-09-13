Ability.UseArticle = function(code) {
  const ability = Ability(`Use ${Article.lookup(code).getName()}`);
  return ability;
}

/*
Ability.register('monster-use-article', {
  execute: () => {
    const round = BattleSystem.getRound();
    const ability = round.getAbilityData();
    round.addTime(750);
    EffectSystem.applyDuringBattle(Consumable.lookup(ability.article));
  },
});
*/
