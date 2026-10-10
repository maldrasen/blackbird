describe('Enchantment', function() {

  function enchantedHelm(pattern) {
    return Item(ItemFixtures.buildSteel('helm', { enchantment:{ pattern } })).getEnchantment();
  }

  describe('getDamageResistance()', function() {
    // The fire resistance rolls 5 to 10 at steel, so the roll is stubbed to pin the strength.
    it('reads the strength of the resist damage effect for its damage type', function() {
      Random.stubBetween(8);
      const enchantment = enchantedHelm('resistant-to-fire');

      expect(enchantment.getDamageResistance(DamageType.fire)).to.equal(8);
      expect(enchantment.getDamageResistance(DamageType.shock)).to.equal(0);
    });

    it('is zero for an enchantment without resist damage effects', function() {
      expect(enchantedHelm('vigilant').getDamageResistance(DamageType.fire)).to.equal(0);
    });
  });

  describe('getEffectResistance()', function() {
    // The status effect resistances roll 10 to 20 at steel, and a pattern covering two effects gives both the same
    // strength.
    it('reads the strength of the resist effect for each status effect it covers', function() {
      Random.stubBetween(12);
      const enchantment = enchantedHelm('incombustible');

      expect(enchantment.getEffectResistance('burn')).to.equal(12);
      expect(enchantment.getEffectResistance('mana-burn')).to.equal(12);
      expect(enchantment.getEffectResistance('blind')).to.equal(0);
    });

    it('is zero for an enchantment without resist effect effects', function() {
      expect(enchantedHelm('resistant-to-fire').getEffectResistance('burn')).to.equal(0);
    });
  });

});
