describe('EquipmentDepot', function() {

  it(`builds a component for each pool when it's first accessed`, function() {
    const depot = EquipmentDepot('standard');
    const poolIds = depot.getPoolIds();

    expect(poolIds.weapons).to.not.equal(poolIds.armor);
    expect(poolIds).to.deep.equal(EquipmentDepot('standard').getPoolIds());
    expect(depot.getParameters().getMaterials().iron).to.equal(80);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({ standard:poolIds });
  });

  it(`Throws when there are no matching equipment parameters`, function() {
    expect(() => EquipmentDepot('nope')).to.throw(/Bad equipment parameters code/);
    expect(GameSystem.getState().pack().equipmentDepots).to.deep.equal({});
  });

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

  it(`leaves a pool empty when the parameters have nothing to build for it`, function() {
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

  it(`throws when picking an item the depot doesn't have`, function() {
    const bunny = CharacterFixtures.genericFemale({});
    const item = ItemFixtures.buildStandard('longsword');

    expect(() => EquipmentDepot('standard').pickItem(item, bunny)).to.throw(/doesn't have Item/);
  });

});
