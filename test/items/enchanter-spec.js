describe('Enchanter', function() {

  it('adds an enchantment given an item and pattern', function() {
    const id = ItemFixtures.buildSteel('helm');
    Enchanter.enchant(id, 'vigilant');

    const enchantment = Enchantment(id);
    const effect = enchantment.getEffects()[0];

    expect(Item(id).getName()).to.equal('Vigilant Steel Helm');
    expect(enchantment.getPattern()).to.equal('vigilant');
    expect(effect.type).to.equal('resist-effect');
    expect(effect.effect).to.equal('blind');
  });

  it('adds an enchantment with properties', function() {
    const id = ItemFixtures.buildSteel('war-axe');
    Enchanter.enchant(id, 'endanger', { species:'vermen' });

    const enchantment = Enchantment(id);
    const effect = enchantment.getEffects()[0];

    expect(Item(id).getName()).to.equal('Steel War Axe of Vermen Endangerment');
    expect(enchantment.getPattern()).to.equal('endanger');
    expect(enchantment.getProperty('species')).to.equal('vermen');
    expect(effect.type).to.equal('status-effect');
    expect(effect.code).to.equal('vulnerable');
  });

  it('keeps the strength within the pattern range on a steel item', function() {
    const id = ItemFixtures.buildSteel('helm');
    Enchanter.enchant(id, 'vigilant');
    expect(Enchantment(id).getEffects()[0].strength).to.be.within(10,20);
  });

  it('doubles the strength range on a silver item', function() {
    const id = ItemFixtures.build('helm', ['silver']);
    Enchanter.enchant(id, 'vigilant');
    expect(Enchantment(id).getEffects()[0].strength).to.be.within(20,40);
  });

  describe('enchantRandomly()', function() {
    // More than one pattern applies to a sword and the pick among them is random, so the spec checks the promise
    // rather than the winner: the item carries a pattern that applies to it, built with that pattern's properties
    // and effects.
    it('picks a pattern that applies to the item and rolls its properties', function() {
      const id = ItemFixtures.buildSteel('longsword');
      const code = Enchanter.enchantRandomly(id);
      const pattern = EnchantmentPattern.lookup(code);
      const enchantment = ItemComponent.lookup(id).enchantment;

      expect(pattern.canBeAppliedTo(id)).to.equal(true);
      expect(enchantment.pattern).to.equal(code);
      expect(Object.keys(enchantment.properties)).to.deep.equal(Object.keys(pattern.buildProperties()));
      expect(enchantment.effects.map(effect => effect.type)).to.deep.equal(pattern.buildEffects(id).map(effect => effect.type));
    });

    // The rarity roll of 250 lands on rare, and the pick of 0 takes the first rare pattern that applies to boots,
    // skipping the head only patterns registered ahead of it. The between stub pins the enchantment's strength.
    it('picks among the patterns that apply by rarity', function() {
      const id = ItemFixtures.build('boots', ['leather']);
      Random.stubRoll(250, 0);
      Random.stubBetween(8);

      expect(Enchanter.enchantRandomly(id)).to.equal('resistant-to-fire');
      expect(Item(id).getName()).to.equal("Firewalker's Leather Boots");
    });

    // A rarity roll of 0 is common, and nothing is common, so the pick steps down to the first unusual pattern that
    // applies to boots.
    it('settles for a commoner rarity when nothing applies at the rolled one', function() {
      const id = ItemFixtures.build('boots', ['leather']);
      Random.stubRoll(0, 0);
      Random.stubBetween(12);

      expect(Enchanter.enchantRandomly(id)).to.equal('incombustible');
      expect(Item(id).getName()).to.equal('Incombustible Leather Boots');
    });
  });

  describe('rollForEnchantment()', function() {
    // Every chance roll lands under 100, so nothing is stubbed and the pick among the sword patterns stays random.
    it('enchants the item when the chance roll lands under the chance', function() {
      const id = ItemFixtures.buildSteel('longsword');
      const code = Enchanter.rollForEnchantment(id, 100);

      expect(EnchantmentPattern.lookup(code).canBeAppliedTo(id)).to.equal(true);
      expect(Enchantment(id).getPattern()).to.equal(code);
    });

    it('leaves the item alone when the chance roll misses', function() {
      const id = ItemFixtures.buildSteel('longsword');
      Random.stubRoll(10);

      expect(Enchanter.rollForEnchantment(id, 10)).to.equal(null);
      expect(Item(id).hasEnchantment()).to.equal(false);
    });

    // The empty roll stub would throw if a chance of zero were rolled at all.
    it('never rolls at a chance of zero', function() {
      const id = ItemFixtures.buildSteel('longsword');
      Random.stubRoll();

      expect(Enchanter.rollForEnchantment(id, 0)).to.equal(null);
    });
  });
});
