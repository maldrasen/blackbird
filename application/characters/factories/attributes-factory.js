global.AttributesFactory = (function() {

  function build() {
    const state = CharacterFactory.getState();
    const actor = state.getActor();
    const aspects = state.getAspects();
    const grades = Species.lookup(actor.species).getAttributes();
    const attributes = {};

    Object.keys(Attrib).forEach(code => {
      attributes[code] = AttributeMath.attributeBaseline + AttributeMath.attributeIncrease(code, grades, actor, aspects);
    });

    state.setAttributes(attributes);
  }

  return { build };

})();
