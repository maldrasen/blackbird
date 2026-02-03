describe("CharacterFactory", function() {

  describe.only("build()", function() {
    it("makes a completely random character when no options are given", function() {
      const id = CharacterFactory.build({ control:50 });

      const actor = Registry.lookupActorComponent(id);
      expect(actor.firstName).to.exist
      expect(actor.lastName).to.exist

      const attributes = Attributes.createWrapper(id);
      expect(attributes.getStrength()).to.be.within(1,100);
      expect(attributes.getDexterity()).to.be.within(1,100);
      expect(attributes.getVitality()).to.be.within(1,100);
      expect(attributes.getIntelligence()).to.be.within(1,100);
      expect(attributes.getBeauty()).to.be.within(1,100);
      expect(attributes.getMaxStamina()).to.be.within(1000,10000);

      const health = Registry.lookupHealthComponent(id);
      expect(health.currentHealth).to.be.within(1,1000);
      expect(health.currentHealth).to.equal(health.maxHealth);
    });
  });

});
