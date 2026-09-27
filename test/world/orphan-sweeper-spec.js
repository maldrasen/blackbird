describe("OrphanSweeper", function() {

  function buildMonster() {
    return MonsterFactory('kobold-runt').build();
  }

  it('removes the items that are not in an inventory', function() {
    const item = ItemFixtures.buildSteel('longsword');

    expect(OrphanSweeper.sweep()).to.eql({ monsters:0, items:1 });
    expect(Registry.entityExists(item)).to.be.false;
  });

  it('keeps the items held by the party, depots, and the loot inventory', function() {
    const carried = ItemFixtures.buildSteel('longsword');
    const loot = ItemFixtures.buildSteel('longsword');
    const stock = EquipmentDepot('standard').getWeapons();

    InventoryManager().addItem(carried);
    InventoryManager(GameSystem.getState().getLootInventory()).addItem(loot);

    expect(OrphanSweeper.sweep()).to.eql({ monsters:0, items:0 });
    expect(stock.length).to.equal(50);

    [carried, loot, ...stock].forEach(id => {
      expect(Registry.entityExists(id)).to.be.true;
    });
  });

  it('keeps an equipped item that is in no inventory', function() {
    const character = CharacterFixtures.genericMale({});
    const sword = ItemFixtures.buildSteel('longsword');
    EquipmentManager(character).equipItem(sword, EquipmentSlot.primary);

    expect(OrphanSweeper.sweep()).to.eql({ monsters:0, items:0 });
    expect(Registry.entityExists(sword)).to.be.true;
  });

  // A bare handed monster, so the sword doesn't knock a depot weapon out of the slot and leave it orphaned.
  it('removes the monsters outside of a battle along with their items', function() {
    const monster = MonsterFactory('kobold-dick-puncher').build();
    const item = ItemFixtures.buildSteel('longsword');
    EquipmentManager(monster).equipItem(item, EquipmentSlot.primary);

    const swept = OrphanSweeper.sweep();

    expect(swept).to.eql({ monsters:1, items:0 });
    expect(Registry.entityExists(monster)).to.be.false;
    expect(Registry.entityExists(item)).to.be.false;
  });

  it('keeps the monsters in the current battle', function() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });

    const monsters = BattleSystem.getState().getActiveMonsters();
    const stray = buildMonster();

    expect(OrphanSweeper.sweep()).to.eql({ monsters:1, items:0 });
    expect(Registry.entityExists(stray)).to.be.false;

    monsters.forEach(id => {
      expect(Registry.entityExists(id)).to.be.true;
    });
  });

  it('keeps recruited monsters', function() {
    const recruit = buildMonster();
    CharacterFixtures.randomPlayer();
    RecruitmentSystem.recruit(recruit, { control:10, affection:10, fear:0, respect:0 });

    expect(OrphanSweeper.sweep()).to.eql({ monsters:0, items:0 });
    expect(Registry.entityExists(recruit)).to.be.true;
  });

});
