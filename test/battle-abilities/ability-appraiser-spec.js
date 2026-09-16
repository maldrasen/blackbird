describe("AbilityAppraiser", function() {

  it('Appraises weapon and item abilities at 0', function() {
    expect(BaseMonster.lookup('kobold-runt').findAbility('Attack').getEssence()).to.equal(0);
  });

  // A [10,20] bite at strength 12 averages 1.8 damage a swing, and the price is that spike weighted by itself and
  // its damage per second: 1.8 * 1.8^0.35 * 5.
  describe('attackEssence()', function() {
    const attributes = Attributes({ strength:12 });

    it('prices a swing by its average damage at the attacker\x27s strength and its swings per second', function() {
      expect(AbilityAppraiser.attackEssence({ damage:[10,20], speed:1000 }, attributes)).to.equal(11);
    });

    it('uses the cooldown as the period when it outlasts the swing', function() {
      expect(AbilityAppraiser.attackEssence({ damage:[10,20], speed:1000, cooldown:2500 }, attributes)).to.equal(4);
    });

    it('is worth more on a stronger attacker', function() {
      expect(AbilityAppraiser.attackEssence({ damage:[10,20], speed:1000 }, Attributes({ strength:24 }))).to.equal(28);
    });

    // The emerald yeek's venom: strength 15 poison lands 55% of the time and ticks 2.22 times for 2d6+2 each.
    it('adds the expected damage of the effects the attack applies', function() {
      const bite = Ability.VenomousBite({ damage:[10,20], speed:1000, poisonStrength:15, poisonDamage:{ x:2, d:6, p:2 } });
      expect(bite.getEssence(attributes)).to.equal(67);
    });

    it(`needs the attacker's attributes`, function() {
      expect(() => Ability.Bite({ damage:[10,20], speed:1000 }).getEssence()).to.throw(/attributes/);
    });
  });

  describe('spellEssence()', function() {
    it('appraises burst damage spells', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'ember', powerLevel:1 })).to.equal(11);
    });

    it('appraises higher damage single turn spells', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'ember', powerLevel:8, cooldown:3000 })).to.equal(95);
    });

    it('appraises higher damage spells with a damage over time effect', function() {
      expect(AbilityAppraiser.spellEssence({ spell:'incinerate', powerLevel:4, cooldown:10 })).to.equal(283);
    });
  });

});
