describe('CharacterEquipper', function() {

  afterEach(function() {
    Random.stubReset();
  });

  function weaponCode(itemId) { return WeaponComponent.lookup(itemId).base; }
  function armorCode(itemId) { return ArmorComponent.lookup(itemId).base; }
  function weaponType(itemId) { return BaseWeapon.lookup(weaponCode(itemId)).getType(); }

  it('picks the weapon type from the highest martial skill', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30, axes:15 } });
    const equipped = CharacterEquipper.equip(horse, 700);

    // Swords valued within 80% - 100% of 700: saber, longsword, falchion, broadsword
    expect(weaponType(equipped.primary)).to.equal('sword');
    expect(['saber','longsword','falchion','broadsword']).to.include(weaponCode(equipped.primary));

    const value = BaseWeapon.lookup(weaponCode(equipped.primary)).getValue();
    expect(value).to.be.within(560, 700);

    // No shield falls within the secondary window of [280-350], so we settle for the round shield at 272
    expect(weaponCode(equipped.secondary)).to.equal('round-shield');
  });

  it('falls back to strength weapons when unskilled', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:50, dexterity:20 } });
    Random.stubFrom('mace','morning-star','buckler','doublet','chaps');

    const equipped = CharacterEquipper.equip(horse, 500);

    expect(weaponCode(equipped.primary)).to.equal('morning-star');
    expect(weaponCode(equipped.secondary)).to.equal('buckler');
    expect(armorCode(equipped.chest)).to.equal('doublet');
    expect(armorCode(equipped.legs)).to.equal('chaps');

    // Nothing for the head, feet, or hands is affordable at this budget
    expect(equipped.head).to.not.exist;
    expect(equipped.feet).to.not.exist;
    expect(equipped.hands).to.not.exist;
  });

  it('gives high dexterity characters an off-hand dagger', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:20, dexterity:50 } });
    Random.stubFrom('whip','flail','knife','doublet','chaps');

    const equipped = CharacterEquipper.equip(horse, 500);

    expect(weaponCode(equipped.primary)).to.equal('flail');
    expect(weaponCode(equipped.secondary)).to.equal('knife');
    expect(weaponType(equipped.secondary)).to.equal('dagger');
  });

  it('gives swords to characters with balanced attributes', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:40, dexterity:38 } });
    const equipped = CharacterEquipper.equip(horse, 450);

    expect(weaponCode(equipped.primary)).to.equal('short-sword');
    expect(weaponType(equipped.secondary)).to.equal('shield');
    expect(['targe','buckler']).to.include(weaponCode(equipped.secondary));
  });

  it('skips the off hand when the weapon is two-handed', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    Random.stubFrom('claymore','breastplate','greaves','coif','boots','gloves');

    const equipped = CharacterEquipper.equip(horse, 1000);

    expect(weaponCode(equipped.primary)).to.equal('claymore');
    expect(equipped.secondary).to.not.exist;
    expect(EquipmentManager(horse).getSlot(EquipmentSlot.secondary)).to.equal(null);
  });

  it('falls back to the next cheapest item when nothing is in the budget window', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ daggers:30 } });
    const equipped = CharacterEquipper.equip(horse, 450);

    // No dagger falls within [360-450], so we get the 350 value dagger, the most expensive one below the window
    expect(weaponCode(equipped.primary)).to.equal('dagger');
    expect(weaponCode(equipped.secondary)).to.equal('knife');
  });

  it('equips nothing when the budget is too small', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const equipped = CharacterEquipper.equip(horse, 1);

    expect(equipped).to.deep.equal({});
    expect(EquipmentManager(horse).getSlot(EquipmentSlot.primary)).to.equal(null);
    expect(EquipmentManager(horse).getSlot(EquipmentSlot.chest)).to.equal(null);
    expect(InventoryComponent.lookup(horse).items).to.be.empty;
  });

  it('fills every armor slot and adds items to inventory with a generous budget', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const equipped = CharacterEquipper.equip(horse, 1500);

    expect(weaponCode(equipped.primary)).to.equal('claymore');
    expect(armorCode(equipped.chest)).to.equal('plate');
    expect(armorCode(equipped.legs)).to.equal('plate-mail');
    expect(armorCode(equipped.head)).to.equal('armet');
    expect(['sabatons','sollerets']).to.include(armorCode(equipped.feet));
    expect(['gloves','bracers']).to.include(armorCode(equipped.hands));

    const inventory = InventoryManager(horse);
    const equipment = EquipmentManager(horse);

    [EquipmentSlot.chest, EquipmentSlot.legs, EquipmentSlot.head, EquipmentSlot.feet, EquipmentSlot.hands].forEach(slot => {
      expect(equipment.getSlot(slot)).to.equal(equipped[slot]);
      expect(inventory.hasItem(equipped[slot])).to.be.true;
    });
  });

});
