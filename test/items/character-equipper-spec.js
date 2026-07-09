describe('CharacterEquipper', function() {

  function weaponCode(itemId) { return WeaponComponent.lookup(itemId).base; }
  function armorCode(itemId) { return ArmorComponent.lookup(itemId).base; }
  function weaponType(itemId) { return BaseWeapon.lookup(weaponCode(itemId)).getType(); }

  it('picks the weapon type from the highest martial skill', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30, axes:15 } });
    const equipped = CharacterEquipper(horse).equip(700);

    expect(weaponType(equipped.primary)).to.equal('sword');
    expect(['saber','longsword','falchion','broadsword']).to.include(weaponCode(equipped.primary));
    expect(BaseWeapon.lookup(weaponCode(equipped.primary)).getValue()).to.be.within(560, 700);
    expect(weaponCode(equipped.secondary)).to.equal('round-shield');
  });

  it('falls back to strength weapons when unskilled', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:50, dexterity:20 } });
    const equipped = CharacterEquipper(horse).equip(500);
    const primary = WeaponComponent.lookup(equipped.primary).base;

    expect(primary).to.be.oneOf(['broad-axe','halberd','glaive','morning-star','warhammer']);
    expect(armorCode(equipped.chest)).to.be.oneOf(['doublet']);
    expect(armorCode(equipped.legs)).to.be.oneOf(['chaps']);
    expect(armorCode(equipped.feet)).to.be.oneOf(['boots']);
    expect(equipped.head).to.be.undefined
    expect(equipped.hands).to.be.undefined

    // A character will only have an offhand item equipped if they didn't randomly pick a two handed weapon.
    if (equipped.secondary) {
      expect(weaponCode(equipped.secondary)).to.be.oneOf(['buckler']);
      expect(BaseWeapon.lookup(primary).getHands()).to.not.equal(WeaponHandedness.two)
    } else {
      expect(BaseWeapon.lookup(primary).getHands()).to.equal(WeaponHandedness.two)
    }
  });

  it('gives high dexterity characters an off-hand dagger', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:20, dexterity:50 } });
    const equipped = CharacterEquipper(horse).equip(500);
    const primary = WeaponComponent.lookup(equipped.primary).base;

    expect(weaponCode(equipped.primary)).to.be.oneOf(['ball-and-chain','baselard','flail','longbow','poignard','sickle-and-chain']);

    if (equipped.secondary) {
      expect(weaponCode(equipped.secondary)).to.be.oneOf(['knife']);
      expect(BaseWeapon.lookup(primary).getHands()).to.not.equal(WeaponHandedness.two)
    } else {
      expect(BaseWeapon.lookup(primary).getHands()).to.equal(WeaponHandedness.two)
    }
  });

  it('gives swords to characters with balanced attributes', function() {
    const horse = CharacterFixtures.genericMale({ attributes:{ strength:40, dexterity:38 } });
    const equipped = CharacterEquipper(horse).equip(450);

    expect(weaponCode(equipped.primary)).to.be.oneOf(['short-sword']);
    expect(weaponType(equipped.secondary)).to.be.oneOf(['shield']);
    expect(weaponCode(equipped.secondary)).to.be.oneOf(['targe','buckler']);
  });

  it('falls back to the next cheapest item when nothing is in the budget window', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ daggers:30 } });
    const equipped = CharacterEquipper(horse).equip(450);

    expect(weaponCode(equipped.primary)).to.equal('dagger');
    expect(weaponCode(equipped.secondary)).to.equal('knife');
  });

  it('equips nothing when the budget is too small', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const equipped = CharacterEquipper(horse).equip(1);

    expect(equipped).to.deep.equal({});
    expect(EquipmentManager(horse).getSlot(EquipmentSlot.primary)).to.equal(null);
    expect(EquipmentManager(horse).getSlot(EquipmentSlot.chest)).to.equal(null);
    expect(InventoryComponent.lookup(horse).items).to.be.empty;
  });

  it('fills every armor slot and adds items to inventory with a generous budget', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const equipped = CharacterEquipper(horse).equip(1500);

    expect(weaponCode(equipped.primary)).to.equal('claymore');
    expect(armorCode(equipped.chest)).to.equal('plate');
    expect(armorCode(equipped.legs)).to.equal('plate-mail');
    expect(armorCode(equipped.head)).to.be.oneOf(['armet','bascinet']);
    expect(armorCode(equipped.feet)).to.be.oneOf(['sabatons','sollerets']);
    expect(armorCode(equipped.hands)).to.be.oneOf(['gloves','bracers','vambraces']);

    const inventory = InventoryManager(horse);
    const equipment = EquipmentManager(horse);

    [EquipmentSlot.chest, EquipmentSlot.legs, EquipmentSlot.head, EquipmentSlot.feet, EquipmentSlot.hands].forEach(slot => {
      expect(equipment.getSlot(slot)).to.equal(equipped[slot]);
      expect(inventory.hasItem(equipped[slot])).to.be.true;
    });
  });

  it('leaves a preset weapon loadout alone', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const preset = WeaponFactory.build('short-sword');
    InventoryManager(horse).addItem(preset);
    EquipmentManager(horse).equipItem(preset, EquipmentSlot.primary);

    const equipped = CharacterEquipper(horse).equip(1500);
    const equipment = EquipmentManager(horse);

    // The preset primary is untouched and no off-hand is forced in beside it.
    expect(equipment.getSlot(EquipmentSlot.primary)).to.equal(preset);
    expect(equipment.getSlot(EquipmentSlot.secondary)).to.equal(null);
    expect(equipped.primary).to.be.undefined;
    expect(equipped.secondary).to.be.undefined;

    // Armor is still filled in around the preset weapon.
    expect(armorCode(equipped.chest)).to.equal('plate');
  });

  it('skips armor slots that are already filled', function() {
    const horse = CharacterFixtures.genericMale({ skills:{ swords:30 } });
    const preset = ArmorFactory.build('doublet');
    InventoryManager(horse).addItem(preset);
    EquipmentManager(horse).equipItem(preset, EquipmentSlot.chest);

    const equipped = CharacterEquipper(horse).equip(1500);
    const equipment = EquipmentManager(horse);

    // The preset chest piece survives even though a generous budget would have bought plate.
    expect(equipment.getSlot(EquipmentSlot.chest)).to.equal(preset);
    expect(equipped.chest).to.be.undefined;

    // The rest of the armor is still randomized around it.
    expect(armorCode(equipped.legs)).to.equal('plate-mail');
    expect(armorCode(equipped.head)).to.be.oneOf(['armet','bascinet']);
  });

});
