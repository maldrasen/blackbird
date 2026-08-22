describe("ManaComponent", function() {

  it("fills in an empty pool for every color that isn't given", function() {
    const id = Registry.createEntity();
    ManaComponent.create(id, { red:{ current:5, max:10 } });

    const mana = ManaComponent.lookup(id);
    expect(mana.red).to.deep.equal({ current:5, max:10 });
    Object.values(Mana).filter(color => color !== Mana.red).forEach(color => {
      expect(mana[color]).to.deep.equal({ current:0, max:0 });
    });
  });

  it("clamps the current mana to the pool's maximum", function() {
    const id = Registry.createEntity();
    ManaComponent.create(id, { blue:{ current:50, max:20 } });
    expect(ManaComponent.lookup(id).blue.current).to.equal(20);
  });

  it("clamps the current mana to zero", function() {
    const id = Registry.createEntity();
    ManaComponent.create(id, { green:{ current:10, max:10 } });
    ManaComponent.update(id, { green:{ current:-4, max:10 } });
    expect(ManaComponent.lookup(id).green.current).to.equal(0);
  });

  it("rounds mana down to whole points", function() {
    const id = Registry.createEntity();
    ManaComponent.create(id, { black:{ current:3.7, max:8.2 } });
    expect(ManaComponent.lookup(id).black).to.deep.equal({ current:3, max:8 });
  });

  it("rejects a color that doesn't exist", function() {
    const id = Registry.createEntity();
    expect(function() {
      ManaComponent.create(id, { purple:{ current:0, max:0 } });
    }).to.throw('does not have a purple property');
  });

  it("rejects a pool with an unknown property", function() {
    const id = Registry.createEntity();
    expect(function() {
      ManaComponent.create(id, { red:{ current:0, max:0, regen:1 } });
    }).to.throw('does not have a regen property');
  });

  it("rejects a pool with a non-numeric value", function() {
    const id = Registry.createEntity();
    expect(function() {
      ManaComponent.create(id, { red:{ current:'lots', max:10 } });
    }).to.throw('Mana.red.current is not a number');
  });

  it("returns a copy that can be changed without touching the stored pools", function() {
    const id = Registry.createEntity();
    ManaComponent.create(id, { yellow:{ current:4, max:12 } });

    const mana = ManaComponent.lookup(id);
    mana.yellow.current = 0;

    expect(ManaComponent.lookup(id).yellow.current).to.equal(4);
  });

});
