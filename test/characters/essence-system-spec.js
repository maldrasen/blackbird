describe("EssenceSystem", function() {

  describe("spellEssence()", function() {
    it("weights damage by the size of each hit and the damage per second", function() {
      // Ember at power level 1: 1d4 averages 2.5, and the medium cast takes 1000ms plus the 500ms release.
      expect(EssenceSystem.spellEssence({ spell:'ember', powerLevel:1 })).to.be.closeTo(0.1875, 0.0001);
      // Searing lance at power level 3: 3d8 averages 13.5 every 1500ms.
      expect(EssenceSystem.spellEssence({ spell:'searing-lance', powerLevel:3 })).to.be.closeTo(5.4675, 0.0001);
    });

    it("uses the cooldown as the period only when it outlasts the cast", function() {
      expect(EssenceSystem.spellEssence({ spell:'searing-lance', powerLevel:3, cooldown:2000 })).to.be.closeTo(4.1006, 0.0001);
      expect(EssenceSystem.spellEssence({ spell:'searing-lance', powerLevel:3, cooldown:1000 })).to.be.closeTo(5.4675, 0.0001);
    });

    it("scores a status effect by its type essence, land chance, and targets", function() {
      // Overwhelming effulgence at power level 2 blinds the whole enemy formation at strength 15 for 3000ms and can be
      // cast every 1400ms, so the effect covers the whole fight: 15 * 0.5498 * 3.
      expect(EssenceSystem.spellEssence({ spell:'overwhelming-effulgence', powerLevel:2 })).to.be.closeTo(24.7425, 0.001);
    });

    it("discounts a status effect by the share of the period it covers", function() {
      expect(EssenceSystem.spellEssence({ spell:'overwhelming-effulgence', powerLevel:2, cooldown:4000 })).to.be.closeTo(18.5569, 0.001);
    });
  });

});
