describe("SexualityFactory", function() {

  afterEach(function() { CharacterFactory.endBuild(); });

  describe("build()", function() {
    it("uses the triggers if they exist", function() {
      const state = CharacterFactory.startBuild({
        species: SpeciesCode.human,
        gender: Gender.male,
        triggers: ['androphilic[20]','gynophilic[-30]'],
      });

      SexualityFactory.build();
      const preferences = state.getSexualPreferences();

      expect(preferences.androphilic).to.be.within(10,30);
      expect(preferences.gynophilic).to.be.within(-40,-20);
    });

    it("randomly assigns the second value if only one trigger exists", function() {
      const state = CharacterFactory.startBuild({
        species: SpeciesCode.equian,
        gender: Gender.male,
        sexuality: 'gay',
        triggers: ['androphilic[20]'],
      });

      SexualityFactory.build();
      const preferences = state.getSexualPreferences();

      expect(preferences.androphilic).to.be.within(10,30);
      expect(preferences.gynophilic).to.be.lessThan(-9)
    });

    it("randomly assigns sexuality given the archetype", function() {
      const state = CharacterFactory.startBuild({
        species: SpeciesCode.equian,
        gender: Gender.futa,
        triggers: [],
      });
      state.setPersonality({ archetype:ArchetypeCode.slut });

      SexualityFactory.build();
      const preferences = state.getSexualPreferences();

      expect(preferences.gynophilic).to.be.greaterThan(9)
      expect(preferences.gynophilic).to.be.greaterThan(9)
    });
  });
});
