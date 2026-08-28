Ability.register('monster-use-article', {
  execute: () => {
    // First we need to get the article from the ability as defined on the base monster.

    const round = BattleSystem.getRound();
    round.addTime(800);
    round.addMessage({ text:`TODO: Monster uses article.` });

  },
});
