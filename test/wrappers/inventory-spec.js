describe('Inventory', function() {

  function partyId() { return GameSystem.getState().getPartyInventory(); }
  function loot() { return Inventory(GameSystem.getState().getLootInventory()); }

  describe('addItem()', function() {
    it('throws when the item is already in this inventory', function() {
      const hatchet = EquipmentFactory().build('hatchet');

      Inventory().addItem(hatchet);

      expect(() => Inventory().addItem(hatchet)).to.throw(`already has Item:${hatchet}`);
    });

    it('throws when the item is already in another inventory', function() {
      const hatchet = EquipmentFactory().build('hatchet');

      loot().addItem(hatchet);

      expect(() => Inventory().addItem(hatchet)).to.throw(
        `Inventory:${GameSystem.getState().getLootInventory()} already has Item:${hatchet}`);
    });

    it('throws when the item is equipped by a character', function() {
      const horse = CharacterFixtures.genericMale({});
      const hatchet = EquipmentFactory().build('hatchet');

      EquipmentManager(horse).equipItem(hatchet, EquipmentSlot.primary);

      expect(() => Inventory().addItem(hatchet)).to.throw(`Item:${hatchet} is equipped by Character:${horse}`);
    });
  });

  describe('removeItem()', function() {
    it('removes only the given item', function() {
      const hatchet = EquipmentFactory().build('hatchet');
      const cleaver = EquipmentFactory().build('cleaver');

      Inventory().addItem(hatchet);
      Inventory().addItem(cleaver);
      Inventory().removeItem(hatchet);

      expect(Inventory().hasItem(hatchet)).to.equal(false);
      expect(Inventory().hasItem(cleaver)).to.equal(true);
    });

    it("throws when the item isn't in the inventory", function() {
      const hatchet = EquipmentFactory().build('hatchet');

      expect(() => Inventory().removeItem(hatchet)).to.throw(
        `Inventory:${partyId()} doesn't have Item:${hatchet} to remove.`);
    });
  });

  describe('setArticleQuantity()', function() {
    it('sets and overwrites the quantity', function() {
      const inventory = Inventory();

      inventory.setArticleQuantity('dungeon-tripe', 3);
      inventory.setArticleQuantity('rhysh-apple', 2);
      inventory.setArticleQuantity('dungeon-tripe', 5);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(5);
      expect(inventory.getArticleQuantity('rhysh-apple')).to.equal(2);
    });

    it('removes the article entry when the quantity reaches zero', function() {
      const inventory = Inventory();

      inventory.setArticleQuantity('dungeon-tripe', 3);
      inventory.setArticleQuantity('dungeon-tripe', 0);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(0);
      expect(InventoryComponent.lookup(partyId()).articles).to.not.have.property('dungeon-tripe');
    });

    it('throws when the article code is unknown', function() {
      expect(() => Inventory().setArticleQuantity('polished-turnip', 1)).to.throw(
        `Bad article code [polished-turnip]`);
    });
  });

  describe('addArticle()', function() {
    it('adds to the existing quantity', function() {
      const inventory = Inventory();

      inventory.addArticle('dungeon-tripe', 3);
      inventory.addArticle('dungeon-tripe', 4);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(7);
    });

    it('throws on a negative quantity', function() {
      expect(() => Inventory().addArticle('dungeon-tripe', -1)).to.throw(
        `Cannot add -1 of Article:dungeon-tripe, use removeArticle().`);
    });
  });

  describe('removeArticle()', function() {
    it('removes from the existing quantity', function() {
      const inventory = Inventory();

      inventory.addArticle('dungeon-tripe', 5);
      inventory.removeArticle('dungeon-tripe', 2);

      expect(inventory.getArticleQuantity('dungeon-tripe')).to.equal(3);
    });

    it('clears the article entry when the last one is removed', function() {
      const inventory = Inventory();

      inventory.addArticle('dungeon-tripe', 2);
      inventory.removeArticle('dungeon-tripe', 2);

      expect(InventoryComponent.lookup(partyId()).articles).to.not.have.property('dungeon-tripe');
    });

    it('throws when removing more than the inventory holds', function() {
      const inventory = Inventory();

      inventory.addArticle('dungeon-tripe', 2);

      expect(() => inventory.removeArticle('dungeon-tripe', 3)).to.throw(
        `Inventory:${partyId()} only has 2 of Article:dungeon-tripe, cannot remove 3.`);
    });
  });

  it('listItems() orders the rows by category and then by name', function() {
    const cleaver = ItemFixtures.buildSteel('cleaver');
    const helm = ItemFixtures.buildSteel('helm');
    const hauberk = ItemFixtures.buildSteel('hauberk');
    const hatchet = ItemFixtures.buildSteel('hatchet');
    const battleAxe = ItemFixtures.buildSteel('battle-axe');
    const boots = ItemFixtures.build('boots', ['leather']);

    const inventory = Inventory();
    [cleaver, helm, hauberk, hatchet, battleAxe, boots].forEach(item => inventory.addItem(item));

    inventory.addArticle('dungeon-tripe', 3);
    inventory.addArticle('string-of-teeth', 1);

    const rows = inventory.listItems();

    expect(rows.map(row => row.name)).to.deep.equal([
      'Steel Battle Axe', 'Steel Cleaver', 'Steel Hatchet', 'Leather Boots', 'Steel Hauberk', 'Steel Helm',
      'Dungeon Tripe', 'String of Teeth']);

    expect(rows[0].itemId).to.equal(battleAxe);
    expect(rows[0].type).to.equal('weapon');
    expect(rows[0].category).to.equal(InventoryCategory.weapon);
    expect(rows[0].icon).to.be.a('string');
    expect(rows[6].articleCode).to.equal('dungeon-tripe');
    expect(rows[6].quantity).to.equal(3);
    expect(rows[6].category).to.equal(InventoryCategory.restoreHealth);
    expect(rows[6].usableWhen).to.equal(UsableWhen.outOfCombat);
    expect(rows[7].category).to.equal(InventoryCategory.valuables);
  });

  it('dropItem() destroys the item', function() {
    const helm = EquipmentFactory().build('helm');
    Inventory().addItem(helm);

    Inventory().dropItem(helm);

    expect(Registry.entityExists(helm)).to.equal(false);
    expect(Inventory().hasItem(helm)).to.equal(false);
  });
});
