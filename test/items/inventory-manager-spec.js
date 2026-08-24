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

  describe('removeItem()', function() {
    it('removes only the given item', function() {
      const horse = CharacterFixtures.genericMale({});
      const hatchet = WeaponFactory.build('hatchet');
      const cleaver = WeaponFactory.build('cleaver');

      InventoryManager(horse).addItem(hatchet);
      InventoryManager(horse).addItem(cleaver);
      InventoryManager(horse).removeItem(hatchet);

      expect(InventoryManager(horse).hasItem(hatchet)).to.equal(false);
      expect(InventoryManager(horse).hasItem(cleaver)).to.equal(true);
    });

    it("throws when the item isn't in the inventory", function() {
      const horse = CharacterFixtures.genericMale({});
      const hatchet = WeaponFactory.build('hatchet');

      expect(() => InventoryManager(horse).removeItem(hatchet)).to.throw(
        `Inventory:${horse} doesn't have Item:${hatchet} to remove.`);
    });
  });

  describe('setArticleQuantity()', function() {
    it('sets and overwrites the quantity', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.setArticleQuantity('dungeon-tripe', 3);
      inventory.setArticleQuantity('rhysh-apple', 2);
      inventory.setArticleQuantity('dungeon-tripe', 5);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(5);
      expect(inventory.getArticleQuantity('rhysh-apple')).to.equal(2);
    });

    it('removes the article entry when the quantity reaches zero', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.setArticleQuantity('dungeon-tripe', 3);
      inventory.setArticleQuantity('dungeon-tripe', 0);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(0);
      expect(InventoryComponent.lookup(horse).articles).to.not.have.property('dungeon-tripe');
    });

    it('throws when the article code is unknown', function() {
      const horse = CharacterFixtures.genericMale({});

      expect(() => InventoryManager(horse).setArticleQuantity('polished-turnip', 1)).to.throw(
        `Bad article code [polished-turnip]`);
    });
  });

  describe('addArticle()', function() {
    it('adds to the existing quantity', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.addArticle('dungeon-tripe', 3);
      inventory.addArticle('dungeon-tripe', 4);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(7);
    });

    it('throws on a negative quantity', function() {
      const horse = CharacterFixtures.genericMale({});

      expect(() => InventoryManager(horse).addArticle('dungeon-tripe', -1)).to.throw(
        `Cannot add -1 of Article:dungeon-tripe, use removeArticle().`);
    });
  });

  describe('removeArticle()', function() {
    it('removes from the existing quantity', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.addArticle('dungeon-tripe', 5);
      inventory.removeArticle('dungeon-tripe', 2);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(3);
    });

    it('clears the article entry when the last one is removed', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.addArticle('dungeon-tripe', 2);
      inventory.removeArticle('dungeon-tripe', 2);

      expect(InventoryComponent.lookup(horse).articles).to.not.have.property('dungeon-tripe');
    });

    it('throws when removing more than the inventory holds', function() {
      const horse = CharacterFixtures.genericMale({});
      const inventory = InventoryManager(horse);

      inventory.addArticle('dungeon-tripe', 2);

      expect(() => inventory.removeArticle('dungeon-tripe', 3)).to.throw(
        `Inventory:${horse} only has 2 of Article:dungeon-tripe, cannot remove 3.`);
    });
  });

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
