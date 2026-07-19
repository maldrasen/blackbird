describe("ExperienceComponent", function() {
  describe("validate()", function() {

    it("rejects a character with less essence than their level requires", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      expect(function() {
        ExperienceComponent.update(id, { level:2, essence:100 });
      }).to.throw('Experience.essence is less than');
    });

    it("accepts a character with enough essence for their level", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      ExperienceComponent.update(id, { level:1, essence:780 });
      expect(ExperienceComponent.lookup(id).level).to.equal(1);
    });

  });
});
