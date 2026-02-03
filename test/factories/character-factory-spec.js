describe("CharacterFactory", function() {

  describe.only("build()", function() {
    it("makes a completely random character when no options are given", function() {
      const id = CharacterFactory.build({ control:50 });
      const actor = Registry.lookupActorComponent(id);
      const attributes = Registry.lookupAttributesComponent(id);
      const control = Registry.lookupControlledComponent(id);
      const health = Registry.lookupHealthComponent(id);
      const situated = Registry.lookupSituatedComponent(id);

      expect(actor.firstName).to.exist
      expect(actor.lastName).to.exist

      expect(attributes.strength).to.be.within(1,100);
      expect(attributes.dexterity).to.be.within(1,100);
      expect(attributes.vitality).to.be.within(1,100);
      expect(attributes.intelligence).to.be.within(1,100);
      expect(attributes.beauty).to.be.within(1,100);

      expect(control.control).to.equal(50)
      expect(health.currentStamina).to.equal(1000)
      expect(health.maxStamina).to.equal(1000)
      expect(situated.currentLocation).to.equal('filthy-hovel') // For now.
    });
  });

});
