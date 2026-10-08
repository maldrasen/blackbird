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

});
