describe('EquipmentManager', function() {

  it('canEquipItem()', function() {
    const horse = CharacterFixtures.genericMale({});
    const oneHand = EquipmentFactory().build('hatchet');
    const mainHand = EquipmentFactory().build('broad-axe');
    const twoHand = EquipmentFactory().build('goosewing');

    const inventory = InventoryManager(horse);
    inventory.addItem(oneHand);
    inventory.addItem(mainHand);
    inventory.addItem(twoHand);

    const equipment = EquipmentManager(horse);
    expect(equipment.canEquipItem(oneHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(oneHand,EquipmentSlot.secondary)).to.be.true;
    expect(equipment.canEquipItem(mainHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(mainHand,EquipmentSlot.secondary)).to.be.false;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.secondary)).to.be.false;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.head)).to.be.false;
  });

  describe('equipItem()', function() {
    it("equips armors", function() {
      const horse = CharacterFixtures.genericMale({});
      const helm = EquipmentFactory().build('helm');

      InventoryManager(horse).addItem(helm);
      EquipmentManager(horse).equipItem(helm, EquipmentSlot.head);

      expect(EquipmentComponent.lookup(horse).head).to.equal(helm);
    });

    it("equips weapons", function() {
      const horse = CharacterFixtures.genericMale({});
      const right = EquipmentFactory().build('cleaver');
      const left = EquipmentFactory().build('hand-axe');

      const inventory = InventoryManager(horse);
      inventory.addItem(right);
      inventory.addItem(left);

      const equipment = EquipmentManager(horse);
      equipment.equipItem(right, EquipmentSlot.primary);
      equipment.equipItem(left, EquipmentSlot.secondary);

      const equipped = EquipmentComponent.lookup(horse);
      expect(equipped.primary).to.equal(right);
      expect(equipped.secondary).to.equal(left);
    });

    it("unequips the secondary slot when equipping a two-handed weapon", function() {
      const horse = CharacterFixtures.genericMale({});
      const dagger = EquipmentFactory().build('dagger');
      const maul = EquipmentFactory().build('goosewing');

      const inventory = InventoryManager(horse);
      inventory.addItem(dagger);
      inventory.addItem(maul);

      const equipment = EquipmentManager(horse);
      equipment.equipItem(dagger, EquipmentSlot.secondary);
      equipment.equipItem(maul, EquipmentSlot.primary);

      const equipped = EquipmentComponent.lookup(horse);
      expect(equipped.primary).to.equal(maul);
      expect(equipped.secondary).to.equal(null);
    });

    it("unequips a two-handed primary when equipping an off-hand item", function() {
      const horse = CharacterFixtures.genericMale({});
      const dagger = EquipmentFactory().build('dagger');
      const maul = EquipmentFactory().build('goosewing');

      const inventory = InventoryManager(horse);
      inventory.addItem(dagger);
      inventory.addItem(maul);

      const equipment = EquipmentManager(horse);
      equipment.equipItem(maul, EquipmentSlot.primary);
      equipment.equipItem(dagger, EquipmentSlot.secondary);

      const equipped = EquipmentComponent.lookup(horse);
      expect(equipped.primary).to.equal(null);
      expect(equipped.secondary).to.equal(dagger);
    });

    it("unequips an item", function() {
      const horse = CharacterFixtures.genericMale({});
      const choppa = EquipmentFactory().build('battle-axe');

      InventoryManager(horse).addItem(choppa);
      EquipmentManager(horse).equipItem(choppa, EquipmentSlot.primary);
      expect(EquipmentComponent.lookup(horse).primary).to.equal(choppa);

      EquipmentManager(horse).equipItem(null, EquipmentSlot.primary);
      expect(EquipmentComponent.lookup(horse).primary).to.not.exist;
    });
  })

  it('getEquippedSlot()', function() {
    const horse = CharacterFixtures.genericMale({});
    const helm = EquipmentFactory().build('helm');
    const hatchet = EquipmentFactory().build('hatchet');

    const inventory = InventoryManager(horse);
    inventory.addItem(helm);
    inventory.addItem(hatchet);

    const equipment = EquipmentManager(horse);
    equipment.equipItem(helm, EquipmentSlot.head);

    expect(equipment.getEquippedSlot(helm)).to.equal(EquipmentSlot.head);
    expect(equipment.getEquippedSlot(hatchet)).to.equal(null);
  });

  it('getValidSlots()', function() {
    const horse = CharacterFixtures.genericMale({});
    const oneHand = EquipmentFactory().build('hatchet');
    const mainHand = EquipmentFactory().build('broad-axe');
    const helm = EquipmentFactory().build('helm');

    const inventory = InventoryManager(horse);
    inventory.addItem(oneHand);
    inventory.addItem(mainHand);
    inventory.addItem(helm);

    const equipment = EquipmentManager(horse);
    expect(equipment.getValidSlots(oneHand)).to.deep.equal([EquipmentSlot.primary, EquipmentSlot.secondary]);
    expect(equipment.getValidSlots(mainHand)).to.deep.equal([EquipmentSlot.primary]);
    expect(equipment.getValidSlots(helm)).to.deep.equal([EquipmentSlot.head]);
  });

  it('unequipItem()', function() {
    const horse = CharacterFixtures.genericMale({});
    const helm = EquipmentFactory().build('helm');

    InventoryManager(horse).addItem(helm);

    const equipment = EquipmentManager(horse);
    equipment.equipItem(helm, EquipmentSlot.head);
    equipment.unequipItem(helm);

    expect(EquipmentComponent.lookup(horse).head).to.not.exist;
    expect(() => equipment.unequipItem(helm)).to.not.throw();
  });

  it('getSlot()', function() {
    const horse = CharacterFixtures.genericMale({});
    const chest = EquipmentFactory().build('hauberk');
    const feet = EquipmentFactory().build('boots');
    const hands = EquipmentFactory().build('gloves');

    const inventory = InventoryManager(horse);
    inventory.addItem(chest);
    inventory.addItem(feet);
    inventory.addItem(hands);

    const equipment = EquipmentManager(horse);
    equipment.equipItem(chest, EquipmentSlot.chest);
    equipment.equipItem(feet, EquipmentSlot.feet);
    equipment.equipItem(hands, EquipmentSlot.hands);

    expect(equipment.getSlot(EquipmentSlot.chest)).to.equal(chest);
    expect(equipment.getSlot(EquipmentSlot.feet)).to.equal(feet);
    expect(equipment.getSlot(EquipmentSlot.hands)).to.equal(hands);
    expect(equipment.getSlot(EquipmentSlot.head)).to.equal(null);
  });

  it('getEquippedShield()', function() {
    const horse = CharacterFixtures.genericMale({});
    const dagger = EquipmentFactory().build('dagger');
    const shield = EquipmentFactory().build('tower-shield');

    const inventory = InventoryManager(horse);
    inventory.addItem(dagger);
    inventory.addItem(shield);

    const equipment = EquipmentManager(horse);
    expect(equipment.getEquippedShield()).to.equal(null);

    equipment.equipItem(dagger, EquipmentSlot.secondary);
    expect(equipment.getEquippedShield()).to.equal(null);

    equipment.equipItem(shield, EquipmentSlot.secondary);
    expect(equipment.getEquippedShield()).to.equal(shield);
  });

  it('hasEquippedWeaponType()', function() {
    const horse = CharacterFixtures.genericMale({});
    const sword = EquipmentFactory().build('longsword');
    const offSword = EquipmentFactory().build('short-sword');

    const inventory = InventoryManager(horse);
    inventory.addItem(sword);
    inventory.addItem(offSword);

    const equipment = EquipmentManager(horse);
    expect(equipment.hasEquippedWeaponType('sword')).to.be.false;

    equipment.equipItem(sword, EquipmentSlot.primary);
    expect(equipment.hasEquippedWeaponType('sword')).to.be.true;
    expect(equipment.hasEquippedWeaponType('axe')).to.be.false;

    equipment.equipItem(null, EquipmentSlot.primary);
    equipment.equipItem(offSword, EquipmentSlot.secondary);
    expect(equipment.hasEquippedWeaponType('sword')).to.be.true;
  });

  describe('getDamageReduction()', function() {
    function equipGear(horse, codes) {
      const inventory = InventoryManager(horse);
      const equipment = EquipmentManager(horse);

      codes.forEach(([code, slot]) => {
        const item = ItemFixtures.buildSteel(code);
        inventory.addItem(item);
        equipment.equipItem(item, slot);
      });

      return equipment;
    }

    it("uses the worn piece at the hit location", function() {
      const horse = CharacterFixtures.genericMale({});
      const equipment = equipGear(horse, [['breastplate', EquipmentSlot.chest]]);

      expect(equipment.getDamageReduction(EquipmentSlot.chest, DamageType.slash)).to.equal(45);
      expect(equipment.getDamageReduction(EquipmentSlot.chest, DamageType.crush)).to.equal(32);
      expect(equipment.getDamageReduction(EquipmentSlot.head, DamageType.slash)).to.equal(0);
    });

    it("adds the shield bonus to every hit location", function() {
      const horse = CharacterFixtures.genericMale({});
      const equipment = equipGear(horse, [
        ['breastplate', EquipmentSlot.chest],
        ['tower-shield', EquipmentSlot.secondary],
      ]);

      expect(equipment.getDamageReduction(EquipmentSlot.chest, DamageType.slash)).to.equal(75);
      expect(equipment.getDamageReduction(EquipmentSlot.head, DamageType.slash)).to.equal(30);
      expect(equipment.getDamageReduction(EquipmentSlot.feet, DamageType.crush)).to.equal(28);
    });

    it("covers a bare body with only a shield", function() {
      const horse = CharacterFixtures.genericMale({});
      const equipment = equipGear(horse, [['buckler', EquipmentSlot.secondary]]);

      expect(equipment.getDamageReduction(EquipmentSlot.legs, DamageType.pierce)).to.equal(4);
    });
  });

});
