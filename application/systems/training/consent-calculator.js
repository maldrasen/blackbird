global.ConsentCalculator = (function() {

  function calculate(characterId, actionCode, actorId=null) {
    const actor = actorId || GameState.getPlayer();
    const sexAction = SexAction.lookup(actionCode);
    let consentValue = 0;

    sexAction.getConsentFactors().forEach(factor => {
      consentValue = applyFactor(characterId, sexAction, factor, actor);
    })
  }

  function applyFactor(characterId, sexAction, factor) {
    if (factor.type === 'base') { return applyBaseFactor(characterId, sexAction, factor, actor); }
    throw `Unrecognized consent factor type: ${factor.type}`;
  }

  function applyBaseFactor(characterId, sexAction, factor, actor) {
    const feelings = Registry.lookupFeelingsComponent(characterId);

    console.log("Feelings:",feelings);
    return 1;
  }

  return Object.freeze({ calculate });

})()
