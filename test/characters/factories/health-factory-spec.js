describe("HealthFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  it("rolls health from vitality and the species health factor", function() {
    const state = CharacterFactory.startBuild({ species:SpeciesCode.equian, gender:Gender.male, triggers:[] });
    state.setAttributes({ strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });

    HealthFactory.build();
    const health = state.getHealth();

    expect(health.maxHealth).to.be.within(16,160);
    expect(health.currentHealth).to.equal(health.maxHealth);
  });

});
