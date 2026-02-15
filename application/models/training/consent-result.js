global.ConsentResult = (function() {

  function build(characterId, targetId=null) {
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

      // SexAction.BaseClass.emotional // 100% affection
      // SexAction.BaseClass.roughService // Respect / Fear
      // SexAction.BaseClass.service // Respect
      // SexAction.BaseClass.touching // Affection / fear

    }

    return Object.freeze({
      getCharacter: () => { return $characterId; },
      getTarget: () => { return $targetId; },
      setSexAction,
    });
  }

  // Feelings are measured on a scale from -1000 to 1000, with the extreme ends corresponding to extreme feelings. A
  // simple cubic curve doesn't really work well for low values, so each range of values needs to follow its own curve.
  function feelingBaseValue(rawValue) {
    return PiecewiseCurve([
      { xMin:0,   xMax:100,  yMin:0,   yMax:10,  exp:1.0  }, // Apathy
      { xMin:100, xMax:200,  yMin:10,  yMax:30,  exp:1.5  }, // Mild
      { xMin:200, xMax:400,  yMin:30,  yMax:70,  exp:2.0  }, // Moderate
      { xMin:400, xMax:600,  yMin:70,  yMax:150, exp:2.33 }, // High
      { xMin:600, xMax:800,  yMin:150, yMax:250, exp:2.66 }, // Very High
      { xMin:800, xMax:1000, yMin:250, yMax:500, exp:3.0  }, // Extreme
    ])(rawValue);
  }

  return Object.freeze({
    build,
    feelingBaseValue,
  });

})();
