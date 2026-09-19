describe('Equipment Depot', function() {

  it(`builds a component when it's first accessed`, function() {
    const depot = EquipmentDepot('standard');
    expect(depot.getId()).to.equal(EquipmentDepot('standard').getId());
    expect(depot.getParameters().getMaterials().iron).to.equal(80);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({ standard:depot.getId() });
  });

  it(`Throws when there are no matching equipment parameters`, function() {
    expect(() => EquipmentDepot('nope')).to.throw(/Bad equipment parameters code/);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({});
  });

  it(`builds equipment when stock is accessed`, function() {
    expect(EquipmentDepot('kobold').getStock().length).to.equal(100);
  });

  it(`transfers an item when picked from the depot`, function() {
    const bunny = CharacterFixtures.genericFemale({});
    const depot = EquipmentDepot('standard')
    const item = depot.getStock()[0];

    depot.pickItem(item, bunny);

    expect(InventoryManager(bunny).hasItem(item)).to.be.true;
    expect(depot.getStock().includes(item)).to.be.false;
  });

});
