describe('InventoryManager', function() {

  describe('addItem()', function() {
    it('throws when the item is already in this inventory', function() {
      const horse = CharacterFixtures.genericMale({});
      const hatchet = WeaponFactory.build('hatchet');

      InventoryManager(horse).addItem(hatchet);

      expect(() => InventoryManager(horse).addItem(hatchet)).to.throw(`already has Item:${hatchet}`);
    });

    it('throws when the item is already in another inventory', function() {
      const horse = CharacterFixtures.genericMale({});
      const goat = CharacterFixtures.genericMale({});
      const hatchet = WeaponFactory.build('hatchet');

      InventoryManager(horse).addItem(hatchet);

      expect(() => InventoryManager(goat).addItem(hatchet)).to.throw(`Inventory:${horse} already has Item:${hatchet}`);
    });
  });

  it('removeItem()')
  it('setArticleQuantity()');

  it('listItems()', function() {
    const horse = CharacterFixtures.genericMale({});
    const cleaver = WeaponFactory.build('cleaver');
    const helm = ArmorFactory.build('helm');
    const hauberk = ArmorFactory.build('hauberk');
    const hatchet = WeaponFactory.build('hatchet');
    const battleAxe = WeaponFactory.build('battle-axe');
    const boots = ArmorFactory.build('boots');

    const inventory = InventoryManager(horse);
    [cleaver, helm, hauberk, hatchet, battleAxe, boots].forEach(item => inventory.addItem(item));

    const equipment = EquipmentManager(horse);
    equipment.equipItem(cleaver, EquipmentSlot.primary);
    equipment.equipItem(hauberk, EquipmentSlot.chest);
    equipment.equipItem(helm, EquipmentSlot.head);

    const rows = inventory.listItems();

    expect(rows.map(row => row.name)).to.deep.equal([
      'cleaver', 'hauberk', 'helm', 'battle axe', 'boots', 'hatchet']);

    expect(rows[0].slot).to.equal(EquipmentSlot.primary);
    expect(rows[1].slot).to.equal(EquipmentSlot.chest);
    expect(rows[2].slot).to.equal(EquipmentSlot.head);
    expect(rows[3].slot).to.equal(null);
    expect(rows[3].itemId).to.equal(battleAxe);
    expect(rows[3].type).to.equal('weapon');
  });

  it('dropItem() destroys an equipped item', function() {
    const horse = CharacterFixtures.genericMale({});
    const helm = ArmorFactory.build('helm');

    InventoryManager(horse).addItem(helm);
    EquipmentManager(horse).equipItem(helm, EquipmentSlot.head);

    InventoryManager(horse).dropItem(helm);

    expect(Registry.entityExists(helm)).to.equal(false);
    expect(InventoryManager(horse).hasItem(helm)).to.equal(false);
    expect(EquipmentComponent.lookup(horse).head).to.not.exist;
  });
});
