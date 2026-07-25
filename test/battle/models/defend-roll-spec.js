describe("DefendRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
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

  function attackAgainst(state, defender, base='longsword') {
    const attacker = state.getActiveMonsters()[0];
    return PhysicalAttackRoll(attacker, defender, { base }, EquipmentSlot.chest);
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

  it("parries over blocking when both are possible", function() {
    const state = startBattle();
    const defender = pinnedDefender(state);
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    setParry(defender, 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('parry');
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

  it("always dodges as an unequipped monster", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',1,2);
    const defender = state.getActiveMonsters()[0];
    const attackRoll = PhysicalAttackRoll(attacker, defender, { base:'longsword' }, EquipmentSlot.chest);

    const roll = DefendRoll(defender, attacker, attackRoll);
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

});
