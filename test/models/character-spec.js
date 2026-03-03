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

  describe("rollForOrgasm()", function() {
    it("always orgasms when pleasure is above threshold (for now)", function() {
      const lady = Character(CharacterFixtures.genericFemale({ arousal:{ arousal:1, pleasure:10001 } }));
      const ladyboy = Character(CharacterFixtures.genericMale({ arousal:{ arousal:99, pleasure:9999 } }));
      expect(lady.rollForOrgasm({})).to.be.true;
      expect(ladyboy.rollForOrgasm({})).to.be.false;
    });
  });

  describe("rollRefectoryPeriod()", function() {
    it("just randomly picks a number (for now)", function() {
      Random.stubBetween(10);
      expect(Character(CharacterFixtures.genericMale({})).rollRefectoryPeriod()).to.equal(10);
    });
  });

});