describe("Character", function() {

  describe("getOrgasmThreshold()", function() {
    it("when normal", function() {
      const lady = Character(CharacterFixtures.genericFemale({}));
      expect(lady.getOrgasmThreshold()).to.equal(10000);
    });

    it("when premature", function() {
      const lady = Character(CharacterFixtures.genericFemale({ aspects:{ premature:2 } }));
      expect(lady.getOrgasmThreshold()).to.equal(5000);
    });
  });

});