describe("EffectMath", function() {

  describe("averageDamage()", function() {
    it("sums the average of every damage effect and ignores the rest", function() {
      const effects = [
        Effect.damage(DamageType.fire, { x:2, d:6 }),
        Effect.blind({ strength:10, duration:1000 }),
        Effect.damage(DamageType.pierce, { x:1, d:4, p:2 }),
      ];
      expect(EffectMath.averageDamage(effects)).to.equal(11.5);
      expect(EffectMath.averageDamage([])).to.equal(0);
    });
  });

  describe("landChance()", function() {
    it("is a coin flip at no strength and climbs with it", function() {
      expect(EffectMath.landChance(0)).to.equal(0.5);
      expect(EffectMath.landChance(undefined)).to.equal(0.5);
      expect(EffectMath.landChance(100)).to.be.closeTo(0.7914, 0.0001);
    });
  });

  describe("statusDurationSeconds()", function() {
    it("reads a fixed time effect's duration", function() {
      expect(EffectMath.statusDurationSeconds(Effect.blind({ strength:10, duration:3000 }))).to.equal(3);
    });

    it("counts a turn per second for a turn count effect", function() {
      expect(EffectMath.statusDurationSeconds(Effect.stun({ strength:10, count:2 }))).to.equal(2);
      expect(EffectMath.statusDurationSeconds(Effect.stun({ strength:10 }))).to.equal(1);
    });

    it("expects an until resisted effect to tick until the victim wins a resist roll", function() {
      // Poison ticks every 800ms. At strength 10 the victim loses each roll 53.3% of the time, for 2.14 ticks.
      const poison = Effect.poison({ strength:10, damage:{ x:1, d:6, p:2 } });
      expect(EffectMath.expectedTicks(poison)).to.be.closeTo(2.1426, 0.0001);
      expect(EffectMath.statusDurationSeconds(poison)).to.be.closeTo(1.7141, 0.0001);
    });

    it("lets the effect override the type's interval", function() {
      const poison = Effect.poison({ strength:0, interval:1000 });
      expect(EffectMath.expectedTicks(poison)).to.equal(2);
      expect(EffectMath.statusDurationSeconds(poison)).to.equal(2);
    });
  });

});
