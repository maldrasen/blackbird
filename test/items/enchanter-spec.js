describe('Enchanter', function() {

  it('adds an enchantment given an item and pattern', function() {
    const id = ItemFixtures.buildSteel('helm');
    Enchanter.enchant(id, 'resistant-to-blind');

    const enchantment = Enchantment(id);
    const effect = enchantment.getEffects()[0];

    expect(Item(id).getName()).to.equal('Vigilant Steel Helm');
    expect(enchantment.getPattern()).to.equal('resistant-to-blind');
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
});
