describe("Actor Scrutinizers", function() {

  describe("BreastsScrutinizer", function() {
    it("handles A:has-breasts", function() {
      const horse = CharacterFactory.build({ species:'equian', gender:'male' });
      const elf = CharacterFactory.build({ species:'elf', gender:'female' });
      const scrutinizer = CentralScrutinizer({ H:horse, E:elf });
      expect(scrutinizer.allConditionsPass(['H:has-breasts'])).to.be.false;
      expect(scrutinizer.allConditionsPass(['E:has-breasts'])).to.be.true;
    });
  });

  describe("CockScrutinizer", function() {
    it("handles A:has-cock", function() {
      const horse = CharacterFactory.build({ species:'equian', gender:'male' });
      const elf = CharacterFactory.build({ species:'elf', gender:'female' });
      const scrutinizer = CentralScrutinizer({ H:horse, E:elf });
      expect(scrutinizer.allConditionsPass(['H:has-cock'])).to.be.true;
      expect(scrutinizer.allConditionsPass(['E:has-cock'])).to.be.false;
    });
  });

  describe("PussyScrutinizer", function() {
    it("handles A:has-pussy", function() {
      const horse = CharacterFactory.build({ species:'equian', gender:'male' });
      const elf = CharacterFactory.build({ species:'elf', gender:'female' });
      const scrutinizer = CentralScrutinizer({ H:horse, E:elf });
      expect(scrutinizer.allConditionsPass(['H:has-pussy'])).to.be.false;
      expect(scrutinizer.allConditionsPass(['E:has-pussy'])).to.be.true;
    });
  });

});
