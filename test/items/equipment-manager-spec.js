describe('EquipmentManager', function() {

  it('canEquipItem()', function() {
    const horse = CharacterFixtures.genericMale({});
    const oneHand = EquipmentFactory().build('hatchet');
    const mainHand = EquipmentFactory().build('broad-axe');
    const twoHand = EquipmentFactory().build('goosewing');

    const equipment = EquipmentManager(horse);
    expect(equipment.canEquipItem(oneHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(oneHand,EquipmentSlot.secondary)).to.be.true;
    expect(equipment.canEquipItem(mainHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(mainHand,EquipmentSlot.secondary)).to.be.false;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.primary)).to.be.true;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.secondary)).to.be.false;
    expect(equipment.canEquipItem(twoHand,EquipmentSlot.head)).to.be.false;
  });

  it('canEquipItem() puts shields in the off hand and armor in the slot it names', function() {
    const horse = CharacterFixtures.genericMale({});
    const shield = EquipmentFactory().build('buckler');
    const helm = EquipmentFactory().build('helm');

    const equipment = EquipmentManager(horse);
    expect(equipment.canEquipItem(shield,EquipmentSlot.secondary)).to.be.true;
    expect(equipment.canEquipItem(shield,EquipmentSlot.primary)).to.be.false;
    expect(equipment.canEquipItem(helm,EquipmentSlot.head)).to.be.true;
    expect(equipment.canEquipItem(helm,EquipmentSlot.chest)).to.be.false;
    expect(equipment.canEquipItem(helm,EquipmentSlot.secondary)).to.be.false;
  });

  describe('equipItem()', function() {
    it("returns the item it replaced", function() {
      const horse = CharacterFixtures.genericMale({});
      const first = EquipmentFactory().build('helm');
      const second = EquipmentFactory().build('helm');
      const equipment = EquipmentManager(horse);

      expect(equipment.equipItem(first, EquipmentSlot.head)).to.deep.equal([]);
      expect(equipment.equipItem(second, EquipmentSlot.head)).to.deep.equal([first]);
      expect(equipment.unequipItem(second)).to.deep.equal([second]);
      expect(equipment.unequipItem(second)).to.deep.equal([]);
    });

    it("returns the off-hand cleared by a two-handed weapon", function() {
      const horse = CharacterFixtures.genericMale({});
      const hatchet = EquipmentFactory().build('hatchet');
      const dagger = EquipmentFactory().build('dagger');
      const maul = EquipmentFactory().build('maul');
      const equipment = EquipmentManager(horse);

      equipment.equipItem(hatchet, EquipmentSlot.primary);
      equipment.equipItem(dagger, EquipmentSlot.secondary);

      expect(equipment.equipItem(maul, EquipmentSlot.primary)).to.have.members([hatchet, dagger]);
      expect(equipment.equipItem(dagger, EquipmentSlot.secondary)).to.deep.equal([maul]);
    });

    it("equips armors", function() {
      const horse = CharacterFixtures.genericMale({});
      const helm = EquipmentFactory().build('helm');
      EquipmentManager(horse).equipItem(helm, EquipmentSlot.head);

      expect(EquipmentComponent.lookup(horse).head).to.equal(helm);
    });

    it("equips weapons", function() {
      const horse = CharacterFixtures.genericMale({});
      const right = EquipmentFactory().build('cleaver');
      const left = EquipmentFactory().build('hand-axe');

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

    const equipment = EquipmentManager(horse);
    expect(equipment.getValidSlots(oneHand)).to.deep.equal([EquipmentSlot.primary, EquipmentSlot.secondary]);
    expect(equipment.getValidSlots(mainHand)).to.deep.equal([EquipmentSlot.primary]);
    expect(equipment.getValidSlots(helm)).to.deep.equal([EquipmentSlot.head]);
  });

  it('unequipItem()', function() {
    const horse = CharacterFixtures.genericMale({});
    const helm = EquipmentFactory().build('helm');

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
      const equipment = EquipmentManager(horse);

      codes.forEach(([code, slot]) => {
        const item = ItemFixtures.buildSteel(code);
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

  describe('summarizeResistances()', function() {
    function equipSteel(character, codes) {
      codes.forEach(code => ItemFixtures.equip(character, code, ['steel']));
      return EquipmentManager(character);
    }

    it("lists the physical reduction of the equipment at every hit location", function() {
      const human = CharacterFixtures.genericMale({ actor:{ species:SpeciesCode.human }});
      const summary = equipSteel(human, ['breastplate', 'tower-shield']).summarizeResistances();

      expect(Object.keys(summary.physical)).to.have.members(['head', 'chest', 'hands', 'legs', 'feet']);
      expect(Object.keys(summary.magical).length).to.equal(0);
      expect(summary.physical.chest.slash).to.equal(75);
      expect(summary.physical.chest.crush).to.equal(60);
      expect(summary.physical.head.slash).to.equal(30);
      expect(summary.physical.feet.crush).to.equal(28);
    });

    it("includes the innate resistances of the species", function() {
      const kobold = CharacterFixtures.genericMale({ actor:{ species:SpeciesCode.kobold }});
      const summary = EquipmentManager(kobold).summarizeResistances();

      expect(summary.physical.head).to.deep.equal({ crush:0, slash:10, pierce:0 });
      expect(summary.physical.legs).to.deep.equal({ crush:0, slash:10, pierce:0 });
      expect(summary.magical.fire).to.equal(20);
      expect(summary.magical.psychic).to.equal(-10);
    });

    it("caps the combined equipment and innate reduction", function() {
      const kobold = CharacterFixtures.genericMale({ actor:{ species:SpeciesCode.kobold }});
      const summary = equipSteel(kobold, ['breastplate', 'tower-shield']).summarizeResistances();

      expect(summary.physical.chest.slash).to.equal(80);
      expect(summary.physical.head.slash).to.equal(40);
    });
  });

  // The generic fixtures have 25 strength, so a weapon deals a quarter of its attack power.
  describe('summarizeDamages()', function() {
    it("scales the attack power of both weapons by strength", function() {
      const horse = CharacterFixtures.genericMale({});
      const longsword = ItemFixtures.equip(horse, 'longsword', ['steel']);
      const dagger = ItemFixtures.equip(horse, 'dagger', ['steel'], { slot:EquipmentSlot.secondary });
      const summary = EquipmentManager(horse).summarizeDamages();

      expect(summary.primary).to.deep.equal({
        itemId: longsword,
        low: 13,
        high: 25,
        attackPower: { low:50, high:100 },
        damageTypes: [{ type:DamageType.slash, percent:100 }],
        speed: 1000,
        reach: WeaponReach.close,
      });
      expect(summary.secondary).to.deep.equal({
        itemId: dagger,
        low: 13,
        high: 19,
        attackPower: { low:50, high:75 },
        damageTypes: [{ type:DamageType.slash, percent:60 }, { type:DamageType.pierce, percent:40 }],
        speed: 500,
        reach: WeaponReach.short,
      });
    });

    it("leaves out an empty hand or a shield", function() {
      const horse = CharacterFixtures.genericMale({});
      ItemFixtures.equip(horse, 'longsword', ['steel']);
      expect(EquipmentManager(horse).summarizeDamages()).to.have.keys('primary');

      ItemFixtures.equip(horse, 'tower-shield', ['steel']);
      expect(EquipmentManager(horse).summarizeDamages()).to.have.keys('primary');
    });

    it("summarizes an off-hand weapon on its own", function() {
      const horse = CharacterFixtures.genericMale({});
      ItemFixtures.equip(horse, 'dagger', ['steel'], { slot:EquipmentSlot.secondary });
      expect(EquipmentManager(horse).summarizeDamages()).to.have.keys('secondary');
    });

    it("summarizes nothing for an unarmed character", function() {
      const horse = CharacterFixtures.genericMale({});
      expect(EquipmentManager(horse).summarizeDamages()).to.deep.equal({});
    });
  });

  // Steel longsword 50–100 at speed 1000, steel dagger 50–75 at speed 500, both scaled to a quarter by 25 strength.
  describe('compareWeapons()', function() {
    it("returns the first weapon's numbers minus the second's", function() {
      const horse = CharacterFixtures.genericMale({});
      const longsword = ItemFixtures.buildSteel('longsword');
      const dagger = ItemFixtures.buildSteel('dagger');

      expect(EquipmentManager(horse).compareWeapons(longsword, dagger)).to.deep.equal({
        low: 0,
        high: 6,
        attackPower: { low:0, high:25 },
        speed: 500,
      });
      expect(EquipmentManager(horse).compareWeapons(dagger, longsword)).to.deep.equal({
        low: 0,
        high: -6,
        attackPower: { low:0, high:-25 },
        speed: -500,
      });
    });

    it("has nothing to compare when either item isn't a weapon", function() {
      const horse = CharacterFixtures.genericMale({});
      const dagger = ItemFixtures.buildSteel('dagger');
      const buckler = ItemFixtures.buildSteel('buckler');

      expect(EquipmentManager(horse).compareWeapons(dagger, buckler)).to.be.null;
      expect(EquipmentManager(horse).compareWeapons(buckler, dagger)).to.be.null;
    });
  });

  // Steel plate reduces 40/50/48, iron plate 30/38/36.
  describe('compareArmor()', function() {
    it("returns the first piece's reductions minus the second's", function() {
      const horse = CharacterFixtures.genericMale({});
      const steelPlate = ItemFixtures.buildSteel('plate');
      const ironPlate = ItemFixtures.build('plate', ['iron']);

      expect(EquipmentManager(horse).compareArmor(steelPlate, ironPlate)).to.deep.equal({
        [DamageType.crush]: 10,
        [DamageType.slash]: 12,
        [DamageType.pierce]: 12,
      });
      expect(EquipmentManager(horse).compareArmor(ironPlate, steelPlate)).to.deep.equal({
        [DamageType.crush]: -10,
        [DamageType.slash]: -12,
        [DamageType.pierce]: -12,
      });
    });

    it("has nothing to compare when either item has no reduction", function() {
      const horse = CharacterFixtures.genericMale({});
      const dagger = ItemFixtures.buildSteel('dagger');
      const buckler = ItemFixtures.buildSteel('buckler');

      expect(EquipmentManager(horse).compareArmor(buckler, dagger)).to.be.null;
      expect(EquipmentManager(horse).compareArmor(dagger, buckler)).to.be.null;
    });
  });

  describe('summarizeWeapon()', function() {
    it("scales a weapon that isn't equipped", function() {
      const horse = CharacterFixtures.genericMale({});
      const longsword = ItemFixtures.buildSteel('longsword');
      const summary = EquipmentManager(horse).summarizeWeapon(longsword);

      expect(summary).to.include({ itemId:longsword, low:13, high:25 });
      expect(summary.attackPower).to.deep.equal({ low:50, high:100 });
    });
  });

});
