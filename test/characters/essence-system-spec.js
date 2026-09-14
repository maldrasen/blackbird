describe("EssenceSystem", function() {

  describe("effectsEssenceBreakdown()", function() {
    it("prices a damaging status effect's expected damage as one burst, discounted by its land chance", function() {
      // Poison at strength 10 lands 53.3% of the time and ticks 2.14 times, so 1d6+2 does 11.78 expected damage.
      const poison = Effect.poison({ strength:10, damage:{ x:1, d:6, p:2 } });
      const breakdown = EssenceSystem.effectsEssenceBreakdown({ effects:[poison], targets:1, period:2500 });

      expect(breakdown.spike).to.equal(0);
      expect(breakdown.damage).to.equal(0);
      expect(breakdown.status).to.be.closeTo(1.3331, 0.0001);
      expect(breakdown.total).to.equal(breakdown.status);
    });

    it("scales every term by the target count", function() {
      const effects = [Effect.poison({ strength:10, damage:{ x:1, d:6, p:2 } }), Effect.damage(DamageType.pierce, { x:1, d:4 })];
      const breakdown = EssenceSystem.effectsEssenceBreakdown({ effects, targets:2, period:2500 });

      expect(breakdown.spike).to.equal(2.5);
      expect(breakdown.damage).to.be.closeTo(0.225, 0.0001);
      expect(breakdown.status).to.be.closeTo(2.6661, 0.0001);
    });
  });

  describe("attackEssenceBreakdown()", function() {
    it("weights a swing by its average damage and swings per second", function() {
      const breakdown = EssenceSystem.attackEssenceBreakdown({ low:25, high:50, speed:1500 });
      expect(breakdown.spike).to.equal(37.5);
      expect(breakdown.total).to.be.closeTo(42.1875, 0.0001);
    });

    it("uses the cooldown as the period when it outlasts the swing", function() {
      expect(EssenceSystem.attackEssenceBreakdown({ low:10, high:20, speed:1000 }).total).to.be.closeTo(10.125, 0.0001);
      expect(EssenceSystem.attackEssenceBreakdown({ low:10, high:20, speed:1000, cooldown:2500 }).total).to.be.closeTo(4.05, 0.0001);
    });
  });

  // These wait on the ability appraiser pricing the compiled ability models. The old records gave these values:
  // the emerald yeek's [10,20] venomous bite every 2500ms is worth 4.05, and its strength 15 venom's 2d6+2 over 2.22
  // ticks adds 3.96, for 8.0059 in all; a plain [10,20] bite every 1000ms is worth 10.125; and the dick punch keeps
  // its hand-set 75.
  describe("appraised abilities", function() {
    it("calculate a natural attack's essence from its damage, speed, cooldown, and effects");
    it("keep a hand-set essence when the ability has one");
  });

  describe("spellEssenceBreakdown()", function() {
    const spellEssence = entry => EssenceSystem.spellEssenceBreakdown(entry).total;

    it("weights damage by the size of each hit and the damage per second", function() {
      // Ember at power level 1: 1d4 averages 2.5, and the medium cast takes 1000ms plus the 500ms release.
      expect(spellEssence({ spell:'ember', powerLevel:1 })).to.be.closeTo(0.1875, 0.0001);
      // Searing lance at power level 3: 3d8 averages 13.5 every 1500ms.
      expect(spellEssence({ spell:'searing-lance', powerLevel:3 })).to.be.closeTo(5.4675, 0.0001);
    });

    it("uses the cooldown as the period only when it outlasts the cast", function() {
      expect(spellEssence({ spell:'searing-lance', powerLevel:3, cooldown:2000 })).to.be.closeTo(4.1006, 0.0001);
      expect(spellEssence({ spell:'searing-lance', powerLevel:3, cooldown:1000 })).to.be.closeTo(5.4675, 0.0001);
    });

    it("scores a status effect by its type essence, land chance, and targets", function() {
      // Overwhelming effulgence at power level 2 blinds the whole enemy formation at strength 15 for 3000ms and can be
      // cast every 1400ms, so the effect covers the whole fight: 15 * 0.5498 * 3.
      expect(spellEssence({ spell:'overwhelming-effulgence', powerLevel:2 })).to.be.closeTo(24.7425, 0.001);
    });

    it("discounts a status effect by the share of the period it covers", function() {
      expect(spellEssence({ spell:'overwhelming-effulgence', powerLevel:2, cooldown:4000 })).to.be.closeTo(18.5569, 0.001);
    });
  });

});
