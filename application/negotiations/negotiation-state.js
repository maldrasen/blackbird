global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getMonsters().find(id => battleState.isAlive(id));
  const context = { A:GameSystem.getState().getPlayer(), T:monster };

  let stage = 'greeting';
  let index = 0;
  let affection = 0;
  let fear = 0;
  let respect = 0;

  // reactions = NegotiationReaction.resolve(context);
  // questions = selectQuestions(Object.keys(reactions));


  return Object.freeze({
    getContext: () => { return {...context}; },
  });

};
