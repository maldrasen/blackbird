describe('ArticleAppraiser', function() {

  describe('valueForEffects()', function() {
    it('values restoration by the average amount restored', function() {
      expect(ArticleAppraiser.valueForEffects([Effect.restoreHealth(10,30)])).to.equal(20);
      expect(ArticleAppraiser.valueForEffects([Effect.restoreMana(Mana.red,10,30)])).to.equal(60);
    });

    it('values damage by the average dice roll', function() {
      expect(ArticleAppraiser.valueForEffects([Effect.damage(DamageType.fire,{ x:2, d:4 })])).to.equal(5);
    });

    it('values potency by level', function() {
      expect(ArticleAppraiser.valueForEffects([Effect.increasePotency(3)])).to.equal(60);
    });

    it('sums the value of every effect', function() {
      const effects = [Effect.restoreHealth(10,30), Effect.increasePotency(1)];
      expect(ArticleAppraiser.valueForEffects(effects)).to.equal(40);
    });

    it('returns nothing for an article with no effects', function() {
      expect(ArticleAppraiser.valueForEffects([])).to.equal(0);
    });

    it('scales a status effect by its duration', function() {
      const short = ArticleAppraiser.valueForEffects([Effect.blind({ strength:20, duration:1000 })]);
      const long = ArticleAppraiser.valueForEffects([Effect.blind({ strength:20, duration:3000 })]);
      expect(long).to.be.closeTo(short * 3, 0.001);

      const single = ArticleAppraiser.valueForEffects([Effect.stun({ strength:10, count:1 })]);
      const double = ArticleAppraiser.valueForEffects([Effect.stun({ strength:10, count:2 })]);
      expect(double).to.be.closeTo(single * 2, 0.001);
    });

    it('scales a status effect by its chance to land', function() {
      const weak = ArticleAppraiser.valueForEffects([Effect.stun({ strength:0, count:1 })]);
      const strong = ArticleAppraiser.valueForEffects([Effect.stun({ strength:100, count:1 })]);
      const overwhelming = ArticleAppraiser.valueForEffects([Effect.stun({ strength:500, count:1 })]);

      expect(weak).to.be.closeTo(7.5, 0.001);
      expect(strong).to.be.within(11, 13);
      expect(overwhelming).to.be.within(14, 15);
    });

    // Strength 0 lands half the time and is expected to tick twice, so a d6 poison does 7 when it lands.
    it('values a damaging status effect by the damage it is expected to do', function() {
      const poison = ArticleAppraiser.valueForEffects([Effect.poison({ strength:0, damage:{ x:1, d:6 } })]);
      expect(poison).to.be.closeTo(3.5, 0.001);
    });

    it('expects more damage from a poison that is harder to shake', function() {
      const strong = ArticleAppraiser.valueForEffects([Effect.poison({ strength:100, damage:{ x:1, d:6 } })]);
      expect(strong).to.be.within(13, 14);
    });

    it('rejects effects that have not been priced', function() {
      const unpriced = { type:'status-effect', code:'burn', strength:10 };
      expect(() => ArticleAppraiser.valueForEffects([unpriced])).to.throw(/burn/);
      expect(() => ArticleAppraiser.valueForEffects([{ type:'transmute' }])).to.throw(/transmute/);
    });
  });

  describe('valueForDamageTypes()', function() {
    it('values ammunition damage at half the rate of consumable damage', function() {
      const damageTypes = { [DamageType.pierce]:{ low:1, high:6 } };
      expect(ArticleAppraiser.valueForDamageTypes(damageTypes)).to.equal(3.5);
    });

    it('sums every damage type', function() {
      const damageTypes = { [DamageType.pierce]:{ low:1, high:6 }, [DamageType.fire]:{ low:2, high:8 } };
      expect(ArticleAppraiser.valueForDamageTypes(damageTypes)).to.equal(8.5);
    });

    it('returns nothing for ammunition with no damage', function() {
      expect(ArticleAppraiser.valueForDamageTypes({})).to.equal(0);
    });
  });

  describe('run()', function() {
    // 1-8 pierce averages 4.5, and the 2d6+2 poison at strength 20 lands 57% of the time for 2.3 ticks of 9.
    it('prices the poison arrow by its pierce and its poison', function() {
      expect(Article.lookup('poison-arrow').getValue()).to.equal(17);
    });
  });

});
