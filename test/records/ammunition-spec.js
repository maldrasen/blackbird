describe("Ammunition", function() {

  // These specs run against the shipped arrows: there is no way to unregister an article.

  describe("getEnchantment()", function() {
    it("wraps the poison arrow's prebuilt enchantment", function() {
      const arrow = Ammunition.lookup('poison-arrow');
      const enchantment = arrow.getEnchantment();

      expect(arrow.hasEnchantment()).to.equal(true);
      expect(enchantment.getPattern()).to.equal('poisoned-b');
      expect(enchantment.getTrigger()).to.equal(EnchantmentTrigger.onHit);
      expect(enchantment.getEffects()).to.deep.equal([{ type:'status-effect', code:'poison', strength:20, damage:{ x:2, d:6, p:2 } }]);
    });

    it("is nothing for a plain arrow", function() {
      const arrow = Ammunition.lookup('elm-arrow');
      expect(arrow.hasEnchantment()).to.equal(false);
      expect(arrow.getEnchantment()).to.equal(null);
    });
  });

});
