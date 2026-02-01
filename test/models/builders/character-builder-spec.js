describe("CharacterBuilder", function() {

  describe("build()", function() {
    it("makes a completely random character when no options are given", function() {
      const id = CharacterBuilder.build({});
      const character = Character(id);

      expect(character.id).to.equal(id);
      expect(character.getFirstName()).to.exist
      expect(character.getLastName()).to.exist
      expect(character.getControlValue()).to.equal(50)
      expect(character.getCurrentStamina()).to.equal(1000)
      expect(character.getMaxStamina()).to.equal(1000)
      expect(character.getCurrentLocation()).to.equal('filthy-hovel') // For now.
    });
  });

});
