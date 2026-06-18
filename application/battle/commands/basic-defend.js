global.BasicDefend = (function() {

  // TODO: We could add more variety to the "take a defensive stance" message...
  function execute(id) {
    BattleSystem.getState().addStatus(BattleStatusEffect(id, 'poised', { duration:1 }));
    const text = Weaver({ A:id }).weave(`{S/act}{A:baseName}{/S} takes a defensive stance, becoming {S/pst}Poised{/S}.`);
    return { messages:[{ text }], time:1000 };
  }

  return Object.freeze({
    execute,
  });

})();
