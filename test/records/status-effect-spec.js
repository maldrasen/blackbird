describe("StatusEffect", function() {

  describe("lookup()", function() {
    it("throws on a bad status effect code", function() {
      expect(function() { StatusEffect.lookup('wobbly'); }).to.throw('Bad status effect code');
    });

    it("registers every code in kebab-case", function() {
      StatusEffect.getAllCodes().forEach(code => {
        expect(code).to.equal(code.toLowerCase());
      });
    });
  });

  describe("isClearedAfterBattle()", function() {
    it("is true for battle only effects", function() {
      expect(StatusEffect.lookup('poised').isClearedAfterBattle()).to.be.true;
      expect(StatusEffect.lookup('stun').isClearedAfterBattle()).to.be.true;
    });

    it("is false when the flag is omitted", function() {
      expect(StatusEffect.lookup('paralysis').isClearedAfterBattle()).to.be.false;
      expect(StatusEffect.lookup('infestation').isClearedAfterBattle()).to.be.false;
    });
  });

});
