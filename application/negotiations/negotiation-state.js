global.NegotiationState = function() {

  const QUESTION_COUNT = 3;

  const battleState = BattleSystem.getState();
  const monster = battleState.getMonsters().find(id => battleState.isAlive(id));
  const context = { A:GameSystem.getState().getPlayer(), T:monster };
  const opening = NegotiationOpening(monster);
  const questions = selectQuestions(opening.getQuestions());

  let $stage = 'greeting';
  let $index = 0;
  let $responseText = null;
  const $feelings = { affection:0, fear:0, respect:0 };

  // Picks with Random.from() rather than Random.shuffle() so that specs can stub each pick. The coverage validation
  // guarantees a monster can always be asked every question, but requirements could thin the list below the usual
  // count, in which case the negotiation just gets shorter.
  function selectQuestions(available) {
    const remaining = [...available];
    const selected = [];
    while (selected.length < QUESTION_COUNT && remaining.length > 0) {
      const pick = Random.from(remaining);
      selected.push(pick);
      ArrayHelper.remove(remaining, pick);
    }
    return selected;
  }

  function addFeelings(response) {
    $feelings.affection += response.affection || 0;
    $feelings.fear += response.fear || 0;
    $feelings.respect += response.respect || 0;
  }

  function clampedFeelings() {
    return {
      affection: clamp($feelings.affection),
      fear: clamp($feelings.fear),
      respect: clamp($feelings.respect),
    };
  }

  function clamp(value) { return Math.max(0, Math.min(1000, value)); }

  return Object.freeze({
    getContext: () => { return {...context}; },
    getMonster: () => { return monster; },
    getQuestions: () => { return questions; },
    getCurrentQuestion: () => { return questions[$index]; },
    getStage: () => { return $stage; },
    setStage: stage => { $stage = stage; },
    getIndex: () => { return $index; },
    advanceIndex: () => { $index += 1; },
    getResponseText: () => { return $responseText; },
    setResponseText: text => { $responseText = text; },
    addFeelings,
    clampedFeelings,
  });

};
