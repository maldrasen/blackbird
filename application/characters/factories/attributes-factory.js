global.AttributesFactory = (function() {

  const attributeBaseline = 5;

  function build() {
    const state = CharacterFactory.getState();
    const actor = state.getActor();
    const aspects = state.getAspects();
    const attributes = {};

    Object.keys(Attrib).forEach(code => {
      attributes[code] = attributeBaseline + CharacterMath.attributeIncrease(code, actor, aspects);
    });

    state.setAttributes(attributes);
  }

  return Object.freeze({ build });

})();
