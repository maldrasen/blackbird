global.MouthFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const body = state.getBody();
    if (body == null) { throw new Error(`The mouth cannot be built before the body.`); }

    const species = state.getSpecies();
    const lengthRatio = species.getLengthRatio();
    const mouthDef = species.getBody().mouth || {};

    const mouthData = {
      placement:      'normal',
      maxMouthWidth:  Math.max(32,Math.round(Random.normalDistribution(60,3) * lengthRatio)),
      maxThroatWidth: Math.max(26,Math.round(Random.normalDistribution(35,2) * lengthRatio)),
      tongueLength:   Math.max(50,Math.round(Random.normalDistribution(65,15) * lengthRatio)),
      tongueShape:    mouthDef.tongueShape || 'normal',
    };

    if (mouthDef.mouthWidth) {
      mouthData.maxMouthWidth = Math.max(32,Math.round(Random.normalDistribution(mouthDef.mouthWidth,mouthDef.mouthWidthDev)));
    }
    if (mouthDef.throatWidth) {
      mouthData.maxThroatWidth = Math.max(26,Math.round(Random.normalDistribution(mouthDef.throatWidth,mouthDef.throatWidthDev)));
    }
    if (mouthDef.tongueLength) {
      mouthData.tongueLength = Math.max(50,Math.round(Random.normalDistribution(mouthDef.tongueLength,mouthDef.tongueLengthDev)));
    }

    const throatDepth = BodyComponent.createWrapper({ data:body }).getThroatDepth();
    const gagReflex = Math.min(100,Math.max(0,mouthDef.gagReflex ?
        Random.normalDistribution(mouthDef.gagReflex,mouthDef.gagReflexDev) :
        Random.normalDistribution(60,10)
    ));

    // The comfortable throat depth is the distance an insertion can comfortably be thrust down the throat. The total
    // comfortable cock sucking depth is the mouthDepth + comfortableThroatDepth. Beyond this length a chance of
    // gagging/puking should happen. At mouthDepth + throatDepth the cock enters into the stomach.
    mouthData.comfortableThroatDepth = Math.round((100-gagReflex)/100 * throatDepth);

    state.setMouth(mouthData);
  }

  // === Triggers ======================================================================================================

  // Seems overkill for one trigger, but it follows the same pattern as the others, and it will be easy to add more if
  // necessary.
  function applyTriggers() {
    const state = CharacterFactory.getState();
    const mouthData = state.getMouth();

    function andRemove(trigger) {
      Console.log(`Applied ${trigger}`,{ system:'MouthFactory', level:3 });
      state.removeTrigger(trigger);
    }

    state.getTriggers().forEach(trigger => {

      if (trigger === 'forked-tongue') {
        mouthData.tongueShape = 'forked';
        andRemove(trigger);
      }

    });

    state.setMouth(mouthData);
  }

  return {
    build,
    applyTriggers
  };

})();
