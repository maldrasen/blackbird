describe("AttributesFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  function buildAttributes(gender, aspects) {
    const state = CharacterFactory.startBuild({ species:SpeciesCode.human, gender:gender, triggers:[] });
    state.setAspects(aspects);

    AttributesFactory.build();
    return state.getAttributes();
  }

  it("rolls each attribute from the baseline plus a single creation increase", function() {
    const attributes = buildAttributes(Gender.female, {});
    expect(attributes.strength).to.be.within(9,13);
    expect(attributes.beauty).to.be.within(10,14);
  });

  it("applies the male strength bonus", function() {
    const attributes = buildAttributes(Gender.male, {});
    expect(attributes.strength).to.be.within(10,14);
    expect(attributes.beauty).to.be.within(9,13);
  });

  it("applies attribute aspect modifiers", function() {
    const attributes = buildAttributes(Gender.female, { strong:1, sickly:1 });
    expect(attributes.strength).to.be.within(11,15);
    expect(attributes.vitality).to.be.within(7,11);
  });

});
