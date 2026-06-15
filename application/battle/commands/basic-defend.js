global.BasicDefend = (function() {

  // TODO: How long should a character be defending for? Should haste effect how long you choose to defend for?
  function execute() {
    const state = BattleSystem.getState();
    const id = state.getActingCharacter();
    const text = Weaver({ A:id }).weave(
      `{S/act}{A:baseName}{/S} takes a defensive stance, becoming {S/pst}Poised{/S}.`);

    state.addStatus(BattleStatusEffect(id, 'poised', { duration:1 }));
    BattleSystem.finishCharacterTurn({
      time: 1000,
      messages: [{ text }],
    });
  }

  return Object.freeze({
    execute,
  });

})();
