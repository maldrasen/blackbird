describe("CharacterFactory", function() {

  describe("build()", function() {
    it("makes a completely random character when no options are given", function() {
      const id = CharacterFactory.build({});
      const actor = Registry.lookupActorComponent(id);
      const control = Registry.lookupControlledComponent(id);
      const health = Registry.lookupHealthComponent(id);
      const situated = Registry.lookupSituatedComponent(id);

      expect(actor.firstName).to.exist
      expect(actor.lastName).to.exist
      expect(control.control).to.equal(50)
      expect(health.currentStamina).to.equal(1000)
      expect(health.maxStamina).to.equal(1000)
      expect(situated.currentLocation).to.equal('filthy-hovel') // For now.
    });
  });

});
