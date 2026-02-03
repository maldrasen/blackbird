describe("CharacterFactory", function() {

  describe("build()", function() {

    it("makes a completely random character when no options are given", function() {
      const id = CharacterFactory.build({});

      const attributes = Attributes.createWrapper({ id });
      expect(attributes.getStrength()).to.be.within(1,100);
      expect(attributes.getDexterity()).to.be.within(1,100);
      expect(attributes.getVitality()).to.be.within(1,100);
      expect(attributes.getIntelligence()).to.be.within(1,100);
      expect(attributes.getBeauty()).to.be.within(1,100);
      expect(attributes.getMaxStamina()).to.be.within(1000,10000);

      const health = Registry.lookupHealthComponent(id);
      expect(health.currentHealth).to.be.within(1,1000);
      expect(health.currentHealth).to.equal(health.maxHealth);

      expect(Registry.lookupArousalComponent(id).arousal).to.equal(0);
    });

    it("can make a bunch of random characters quickly without crashing", function() {
      for(let i=0; i<100; i++) { CharacterFactory.build({}); }
    });

  });

});
