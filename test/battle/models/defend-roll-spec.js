describe("DefendRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  // The battle fixtures equip the party randomly, so every test starts the defender bare-handed and equips
  // exactly the loadout it needs.
  function pinnedDefender(state) {
    const defender = state.getEntityAtPosition('P',1,2);
    const equipment = EquipmentManager(defender);
    equipment.equipItem(null, EquipmentSlot.primary);
    equipment.equipItem(null, EquipmentSlot.secondary);
    return defender;
  }

  function equipItem(id, code, slot) {
    const item = WeaponFactory.build(code);
    InventoryManager(id).addItem(item);
    EquipmentManager(id).equipItem(item, slot);
  }

  function setParry(id, value) {
    const skills = SkillsComponent.lookup(id);
    skills.parry = value;
    SkillsComponent.update(id, skills);
  }

  // The block-or-parry choice rolls the defender's strength against their dexterity, so the choice tests pin both
  // attributes and stub the frequency roll. The remaining stubbed values feed the defend SkillCheck: a mid crit
  // roll (a normal hit), a value roll of 1 (valid for any range), and the skill improvement roll.
  function setAttributes(id, strength, dexterity) {
    const attributes = AttributesComponent.lookup(id);
    attributes.strength = strength;
    attributes.dexterity = dexterity;
    AttributesComponent.update(id, attributes);
  }

  function attackAgainst(state, defender, base='longsword', abilityCode=null) {
    const attacker = state.getActiveMonsters()[0];
    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeaponData({ base });
    attackRoll.setAbility(abilityCode);
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();
    return attackRoll;
  }

  it("dodges bare handed", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    setParry(defender, 0);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks with a shield equipped", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('block');
  });

  it("parries with a sword and a trained parry skill", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    setParry(defender, 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('parry');
  });

  it("dodges with a sword but no parry training", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    setParry(defender, 0);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("parries when dexterity wins the block-or-parry roll", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    setParry(defender, 25);
    setAttributes(defender, 1, 99);

    const attackRoll = attackAgainst(state, defender);
    Random.stubRoll(0, 50, 1, 50);

    const roll = DefendRoll(defender, null, attackRoll);
    expect(roll.getDefendSkill()).to.equal('parry');
  });

  it("blocks when strength wins the block-or-parry roll", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    setParry(defender, 25);
    setAttributes(defender, 99, 1);

    const attackRoll = attackAgainst(state, defender);
    Random.stubRoll(99, 50, 1, 50);

    const roll = DefendRoll(defender, null, attackRoll);
    expect(roll.getDefendSkill()).to.equal('block');
  });

  it("cannot parry a long reach weapon", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    setParry(defender, 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'longbow'));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("cannot parry an any-enemy ability no matter the weapon", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    setParry(defender, 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'dagger', 'sneak-attack'));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks arrows when parry is possible", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    setParry(defender, 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'shortbow'));
    expect(roll.getDefendSkill()).to.equal('block');
  });

  it("dodges as a monster without a shield", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',1,2);
    const defender = state.getActiveMonsters()[0];

    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeaponData({ base:'longsword' });
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();

    const roll = DefendRoll(defender, attacker, attackRoll);
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks as a monster with a shield equipped", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',1,2);
    const defender = state.getActiveMonsters()[0];
    equipItem(defender, 'targe', EquipmentSlot.secondary);

    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeaponData({ base:'longsword' });
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();

    const roll = DefendRoll(defender, attacker, attackRoll);
    expect(roll.getDefendSkill()).to.equal('block');
  });

});
