describe("SexualityFactory", function() {
  describe("build()", function() {
    it("uses the triggers if they exist", function() {
      const preferences = SexualityFactory.build({
        personality: { archetype:ArchetypeCode.bastard },
      },['androphilic[20]','gynophilic[-30]']);

      expect(preferences.androphilic).to.be.within(10,30);
      expect(preferences.gynophilic).to.be.within(-40,-20);
    });

    it("randomly assigns the second value if only one trigger exists", function() {
      const preferences = SexualityFactory.build({
        sexuality: 'gay',
        actor: { species:SpeciesCode.equian },
        personality: { archetype:ArchetypeCode.serious },
        sex: Gender.male,
      },['androphilic[20]']);

      expect(preferences.androphilic).to.be.within(10,30);
      expect(preferences.gynophilic).to.be.lessThan(-9)
    });

    it("randomly assigns sexuality given the archetype", function() {
      const preferences = SexualityFactory.build({
        actor: { species:SpeciesCode.equian },
        personality: { archetype:ArchetypeCode.slut },
        sex: Gender.futa,
      },[]);

      expect(preferences.gynophilic).to.be.greaterThan(9)
      expect(preferences.gynophilic).to.be.greaterThan(9)
    });
  });
});
