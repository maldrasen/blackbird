describe('InventorySystem', function() {

  function armory() {
    const horse = CharacterFixtures.genericMale({});
    const items = {
      hatchet: ItemFixtures.buildSteel('hatchet'),
      handAxe: ItemFixtures.buildSteel('hand-axe'),
      broadAxe: ItemFixtures.buildSteel('broad-axe'),
      maul: ItemFixtures.buildSteel('maul'),
      helm: ItemFixtures.buildSteel('helm'),
    };

    Object.values(items).forEach(itemId => InventoryManager().addItem(itemId));
    return { horse, ...items };
  }

  function partyHas(itemId) { return InventoryManager().hasItem(itemId); }

  it('getEquipmentForSlot() lists the party inventory items the slot accepts, by name', function() {
    const { horse, hatchet, handAxe, broadAxe, maul, helm } = armory();
    InventorySystem.equip(horse, broadAxe, EquipmentSlot.primary);

    const primary = InventorySystem.getEquipmentForSlot(horse, EquipmentSlot.primary);
    const secondary = InventorySystem.getEquipmentForSlot(horse, EquipmentSlot.secondary);
    const head = InventorySystem.getEquipmentForSlot(horse, EquipmentSlot.head);

    expect(primary.map(row => row.itemId)).to.deep.equal([handAxe, hatchet, maul]);
    expect(secondary.map(row => row.itemId)).to.deep.equal([handAxe, hatchet]);
    expect(head).to.have.lengthOf(1);
    expect(head[0]).to.include({ itemId:helm, name:'Steel Helm' });
    expect(head[0].icon).to.be.a('string');
  });

  describe('equip()', function() {
    it('moves the item from the party inventory into the slot', function() {
      const { horse, hatchet } = armory();

      InventorySystem.equip(horse, hatchet, EquipmentSlot.secondary);

      expect(EquipmentComponent.lookup(horse).secondary).to.equal(hatchet);
      expect(partyHas(hatchet)).to.be.false;
    });

    it('returns a replaced item to the party inventory', function() {
      const { horse, hatchet, handAxe } = armory();

      InventorySystem.equip(horse, hatchet, EquipmentSlot.primary);
      InventorySystem.equip(horse, handAxe, EquipmentSlot.primary);

      expect(EquipmentComponent.lookup(horse).primary).to.equal(handAxe);
      expect(partyHas(hatchet)).to.be.true;
      expect(partyHas(handAxe)).to.be.false;
    });

    it('returns the off-hand cleared by a two-handed weapon', function() {
      const { horse, hatchet, handAxe, maul } = armory();
      InventorySystem.equip(horse, hatchet, EquipmentSlot.primary);
      InventorySystem.equip(horse, handAxe, EquipmentSlot.secondary);

      InventorySystem.equip(horse, maul, EquipmentSlot.primary);

      expect(EquipmentComponent.lookup(horse).primary).to.equal(maul);
      expect(EquipmentComponent.lookup(horse).secondary).to.not.exist;
      expect(partyHas(hatchet)).to.be.true;
      expect(partyHas(handAxe)).to.be.true;
      expect(partyHas(maul)).to.be.false;
    });

    it("throws for an item that isn't in the party inventory and changes nothing", function() {
      const { horse, hatchet } = armory();
      const stray = ItemFixtures.buildSteel('helm');

      expect(() => InventorySystem.equip(horse, stray, EquipmentSlot.head)).to.throw(`isn't in the party inventory`);
      expect(() => InventorySystem.equip(horse, hatchet, EquipmentSlot.head)).to.throw(`Cannot equip`);
      expect(EquipmentComponent.lookup(horse).head).to.not.exist;
      expect(partyHas(hatchet)).to.be.true;
    });
  });

  describe('unequip()', function() {
    it('returns the item to the party inventory', function() {
      const { horse, helm } = armory();
      InventorySystem.equip(horse, helm, EquipmentSlot.head);

      InventorySystem.unequip(horse, EquipmentSlot.head);

      expect(EquipmentComponent.lookup(horse).head).to.not.exist;
      expect(partyHas(helm)).to.be.true;
    });

    it('does nothing for an empty slot', function() {
      const { horse } = armory();
      const before = [...InventoryComponent.lookup(GameSystem.getState().getPartyInventory()).items];

      InventorySystem.unequip(horse, EquipmentSlot.head);

      expect(InventoryComponent.lookup(GameSystem.getState().getPartyInventory()).items).to.deep.equal(before);
    });
  });

});
