describe("QuiverComponent", function() {

  it("starts empty when nothing is given", function() {
    const id = Registry.createEntity();
    QuiverComponent.create(id);
    expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:null, quantity:0 });
  });

  it("holds a quantity of a registered ammunition", function() {
    const id = Registry.createEntity();
    QuiverComponent.create(id, { ammunition:'arrows', quantity:20 });
    expect(QuiverComponent.lookup(id)).to.deep.equal({ ammunition:'arrows', quantity:20 });
  });

  it("rejects an ammunition code that doesn't exist", function() {
    const id = Registry.createEntity();
    expect(function() {
      QuiverComponent.create(id, { ammunition:'pebbles', quantity:1 });
    }).to.throw('Bad Ammunition code [pebbles]');
  });

  it("rejects an unknown property", function() {
    const id = Registry.createEntity();
    expect(function() {
      QuiverComponent.create(id, { ammunition:'arrows', quantity:1, capacity:20 });
    }).to.throw('does not have a capacity property');
  });

  it("rejects a non-numeric quantity", function() {
    const id = Registry.createEntity();
    expect(function() {
      QuiverComponent.create(id, { ammunition:'arrows', quantity:'some' });
    }).to.throw('Quiver.quantity is not a number');
  });

});
