describe("SpellbookComponent", function() {

  it("starts empty when nothing is given", function() {
    const id = Registry.createEntity();
    SpellbookComponent.create(id);
    expect(SpellbookComponent.lookup(id)).to.deep.equal({});
  });

  it("maps spell codes to their maximum power level", function() {
    const id = Registry.createEntity();
    SpellbookComponent.create(id, { ember:3, incinerate:1 });
    expect(SpellbookComponent.lookup(id)).to.deep.equal({ ember:3, incinerate:1 });
  });

  it("raises a spell's power level", function() {
    const id = Registry.createEntity();
    SpellbookComponent.create(id, { ember:1 });
    SpellbookComponent.update(id, { ember:2 });
    expect(SpellbookComponent.lookup(id).ember).to.equal(2);
  });

  it("rejects a power level above the maximum", function() {
    const id = Registry.createEntity();
    expect(function() {
      SpellbookComponent.create(id, { ember:9 });
    }).to.throw('Spellbook.ember.9 greater than 8');
  });

  it("rejects a power level below one", function() {
    const id = Registry.createEntity();
    expect(function() {
      SpellbookComponent.create(id, { ember:0 });
    }).to.throw('Spellbook.ember.0 less than 1');
  });

  it("rejects a fractional power level", function() {
    const id = Registry.createEntity();
    expect(function() {
      SpellbookComponent.create(id, { ember:1.5 });
    }).to.throw('Spellbook.ember is not a whole number');
  });

  it("rejects a spell code that doesn't exist", function() {
    const id = Registry.createEntity();
    expect(function() {
      SpellbookComponent.create(id, { fireball:1 });
    }).to.throw('Bad Spell code [fireball]');
  });

});
