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
    // Endanger is the only pattern that applies to an axe (swords and daggers have patterns of their own), and it
    // rolls the species it endangers.
    it('picks a pattern that applies to the item and rolls its properties', function() {
      const id = ItemFixtures.buildSteel('war-axe');

      expect(Enchanter.enchantRandomly(id)).to.equal('endanger');
      expect(Species.getAllCodes()).to.include(Enchantment(id).getProperty('species'));
      expect(Item(id).getName()).to.include('Steel War Axe of');
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
    // The chance roll of 9 lands under 10. The rolls after it are the random enchantment's: a common rarity that
    // steps up to endanger, the pick among the one axe pattern, and the species. The between stub pins the
    // strength.
    it('enchants the item when the chance roll lands under the chance', function() {
      const id = ItemFixtures.buildSteel('war-axe');
      Random.stubRoll(9, 0, 0, 0);
      Random.stubBetween(30);

      expect(Enchanter.rollForEnchantment(id, 10)).to.equal('endanger');
      expect(Item(id).hasEnchantment()).to.equal(true);
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
