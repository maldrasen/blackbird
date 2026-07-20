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
});
