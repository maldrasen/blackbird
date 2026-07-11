global.NegotiationState = function() {
  const battleState = BattleSystem.getState();
  const monster = battleState.getMonsters().find(id => battleState.isAlive(id));
  const context = { A:GameSystem.getState().getPlayer(), T:monster };
  const opening = NegotiationOpening(monster);

  let stage = 'greeting';
  let index = 0;
  let affection = 0;
  let fear = 0;
  let respect = 0;

  return Object.freeze({
    getContext: () => { return {...context}; },
    pickQuestion: () => { return Random.from(opening.getQuestions()); }
  });

};
