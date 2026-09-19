describe('EquipmentDepot', function() {

  it(`builds a component for each pool when it's first accessed`, function() {
    const depot = EquipmentDepot('standard');
    const stocks = depot.getStocks();

    expect(stocks.weapons).to.not.equal(stocks.armor);
    expect(stocks).to.deep.equal(EquipmentDepot('standard').getStocks());
    expect(depot.getParameters().getMaterials().iron).to.equal(80);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({ standard:stocks });
  });

  it(`Throws when there are no matching equipment parameters`, function() {
    expect(() => EquipmentDepot('nope')).to.throw(/Bad equipment parameters code/);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({});
  });

  it(`doesn't evict items unless items are picked`, function() {
    const first = EquipmentDepot('standard').getWeapons();
    const second = EquipmentDepot('standard').getWeapons();
    expect(first).to.deep.equal(second);
  })

  it(`builds equipment when stock is accessed`, function() {
    const depot = EquipmentDepot('kobold');
    const weapons = depot.getWeapons();
    const armor = depot.getArmor();
    const parameters = depot.getParameters();

    expect(weapons.length).to.equal(50);
    expect(armor.length).to.equal(50);

    weapons.forEach(id => expect(parameters.getWeapons()).to.have.property(Item(id).getBase().getCode()));
    armor.forEach(id => expect(parameters.getArmor()).to.have.property(Item(id).getBase().getCode()));
  });

  it(`leaves a stock empty when the parameters have nothing to build for it`, function() {
    const depot = EquipmentDepot('vermen');
    expect(depot.getWeapons().length).to.equal(50);
    expect(depot.getArmor()).to.deep.equal([]);
  });

  it(`transfers an item when picked from the depot`, function() {
    const bunny = CharacterFixtures.genericFemale({});
    const depot = EquipmentDepot('standard')
    const weapon = depot.getWeapons()[0];
    const armor = depot.getArmor()[0];

    depot.pickItem(weapon, bunny);
    depot.pickItem(armor, bunny);

    expect(InventoryManager(bunny).hasItem(weapon)).to.be.true;
    expect(InventoryManager(bunny).hasItem(armor)).to.be.true;
    expect(depot.getWeapons().includes(weapon)).to.be.false;
    expect(depot.getArmor().includes(armor)).to.be.false;
    expect(depot.getWeapons().length).to.equal(50);
  });

  // The oldest item is picked second to show that the first pick didn't evict it from under the list.
  it(`evicts the oldest item for every item picked when it restocks`, function() {
    const bunny = CharacterFixtures.genericFemale({});
    const depot = EquipmentDepot('standard')
    const before = depot.getWeapons();

    depot.pickItem(before[10], bunny);
    depot.pickItem(before[0], bunny);

    const after = depot.getWeapons();

    expect(after.length).to.equal(50);
    expect(after.slice(0,46)).to.deep.equal([...before.slice(3,10), ...before.slice(11)]);
    expect(before.some(id => after.slice(46).includes(id))).to.be.false;

    expect(ItemComponent.lookup(before[1])).to.be.undefined;
    expect(ItemComponent.lookup(before[2])).to.be.undefined;
    expect(InventoryManager(bunny).hasItem(before[0])).to.be.true;
    expect(InventoryManager(bunny).hasItem(before[10])).to.be.true;
    expect(depot.getArmor().length).to.equal(50);
  });

  it(`throws when picking an item the depot doesn't have`, function() {
    const bunny = CharacterFixtures.genericFemale({});
    const item = ItemFixtures.buildStandard('longsword');

    expect(() => EquipmentDepot('standard').pickItem(item, bunny)).to.throw(/doesn't have Item/);
  });

});
