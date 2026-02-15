global.ConsentResult = (function() {

  function create(characterId, targetId=null) {
    const $characterId = characterId;
    const $targetId = targetId || GameState.getPlayer();
    const factors = [];

    let $consentValue = 0;
    let $sexAction;

    function setSexAction(code) {
      $sexAction = SexAction.lookup(code);
      $sexAction.getConsentFactors().forEach(factor => {
        applyFactor(factor);
      });
    }

    function applyFactor(factor) {
      if (factor.type === 'base') { return applyBaseFactor(factor); }
      throw `Unrecognized consent factor type: ${factor.type}`;
    }

    function applyBaseFactor(factor) {
      const feelings = FeelingsComponent.findByTarget($characterId, $targetId);
      console.log("Feelings:",feelings);
    }

    return Object.freeze({
      getCharacter: () => { return $characterId; },
      getTarget: () => { return $targetId; },
      setSexAction,
    });
  }

  return Object.freeze({
    create
  });

})();
