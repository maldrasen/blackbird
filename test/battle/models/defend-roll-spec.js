describe("DefendRoll", function() {

  // Every test starts the defender bare-handed and equips exactly the loadout it needs, so the party's own gear
  // never decides a roll.
  function pinnedDefender() {
    const defender = BattleSupport.centerRogue();
    const equipment = EquipmentManager(defender);
    equipment.equipItem(null, EquipmentSlot.primary);
    equipment.equipItem(null, EquipmentSlot.secondary);
    return defender;
  }

  function equipItem(id, code, slot) {
    const item = EquipmentFactory().build(code);
    EquipmentManager(id).equipItem(item, slot);
  }

  function attackAgainst(state, defender, base='longsword', ability=null) {
    const attacker = state.getActiveMonsters()[0];
    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeapon(EquipmentFactory().build(base));
    attackRoll.setAbility(ability);
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();
    return attackRoll;
  }

  it("dodges bare handed", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    CharacterSupport.setSkill(defender, 'parry', 0);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks with a shield equipped", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('block');
  });

  it("parries with a sword and a trained parry skill", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    CharacterSupport.setSkill(defender, 'parry', 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('parry');
  });

  it("dodges with a sword but no parry training", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    CharacterSupport.setSkill(defender, 'parry', 0);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  // The block-or-parry choice rolls the defender's strength against their dexterity, so the choice tests pin both
  // attributes and stub the frequency roll. The remaining stubbed values feed the defend SkillCheck: a mid crit
  // roll (a normal hit), a value roll of 1 (valid for any range), and the skill improvement roll.
  it("parries when dexterity wins the block-or-parry roll", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    CharacterSupport.setSkill(defender, 'parry', 25);
    CharacterSupport.setAttribute(defender, Attrib.strength, 1);
    CharacterSupport.setAttribute(defender, Attrib.dexterity, 99);

    const attackRoll = attackAgainst(state, defender);
    Random.stubRoll(0, 50, 1, 50);

    const roll = DefendRoll(defender, null, attackRoll);
    expect(roll.getDefendSkill()).to.equal('parry');
  });

  it("blocks when strength wins the block-or-parry roll", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    CharacterSupport.setSkill(defender, 'parry', 25);
    CharacterSupport.setAttribute(defender, Attrib.strength, 99);
    CharacterSupport.setAttribute(defender, Attrib.dexterity, 1);

    const attackRoll = attackAgainst(state, defender);
    Random.stubRoll(99, 50, 1, 50);

    const roll = DefendRoll(defender, null, attackRoll);
    expect(roll.getDefendSkill()).to.equal('block');
  });

  it("cannot parry a long reach weapon", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    CharacterSupport.setSkill(defender, 'parry', 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'longbow'));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("cannot parry an any-enemy ability no matter the weapon", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    CharacterSupport.setSkill(defender, 'parry', 25);

    const ability = Ability('Sneak Attack');
    ability.setTargetingMode(TargetingMode.anyEnemy);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'dagger', ability));
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks arrows when parry is possible", function() {
    const state = BattleSupport.startBattle();
    const defender = pinnedDefender();
    equipItem(defender, 'longsword', EquipmentSlot.primary);
    equipItem(defender, 'round-shield', EquipmentSlot.secondary);
    CharacterSupport.setSkill(defender, 'parry', 25);

    const roll = DefendRoll(defender, null, attackAgainst(state, defender, 'shortbow'));
    expect(roll.getDefendSkill()).to.equal('block');
  });

  describe("status effect modifiers", function() {
    it("rolls with advantage while poised", function() {
      const state = BattleSupport.startBattle();
      const defender = pinnedDefender();
      BattleSystem.addStatus(defender, 'poised', { count:1 });

      const roll = DefendRoll(defender, null, attackAgainst(state, defender));
      expect(roll.getRollMode()).to.equal(RollMode.advantage);
    });

    it("rolls with disadvantage while blinded", function() {
      const state = BattleSupport.startBattle();
      const defender = pinnedDefender();
      BattleSystem.addStatus(defender, 'blind', { duration:1000 });

      const roll = DefendRoll(defender, null, attackAgainst(state, defender));
      expect(roll.getRollMode()).to.equal(RollMode.disadvantage);
    });

    it("cancels poise's advantage while blinded", function() {
      const state = BattleSupport.startBattle();
      const defender = pinnedDefender();
      BattleSystem.addStatus(defender, 'poised', { count:1 });
      BattleSystem.addStatus(defender, 'blind', { duration:1000 });

      const roll = DefendRoll(defender, null, attackAgainst(state, defender));
      expect(roll.getRollMode()).to.equal(RollMode.normal);
    });

    it("cannot defend at all while stunned, blind or not", function() {
      const state = BattleSupport.startBattle();
      const defender = pinnedDefender();
      BattleSystem.addStatus(defender, 'stun', { count:1 });
      BattleSystem.addStatus(defender, 'blind', { duration:1000 });

      const roll = DefendRoll(defender, null, attackAgainst(state, defender));
      expect(roll.getRollValue()).to.equal(0);
    });
  });

  it("dodges as a monster without a shield", function() {
    const state = BattleSupport.startBattle();
    const attacker = BattleSupport.centerRogue();
    const defender = state.getActiveMonsters()[0];

    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeapon(EquipmentFactory().build('longsword'));
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();

    const roll = DefendRoll(defender, attacker, attackRoll);
    expect(roll.getDefendSkill()).to.equal('dodge');
  });

  it("blocks as a monster with a shield equipped", function() {
    const state = BattleSupport.startBattle();
    const attacker = BattleSupport.centerRogue();
    const defender = state.getActiveMonsters()[0];
    equipItem(defender, 'targe', EquipmentSlot.secondary);

    const attackRoll = PhysicalAttackRoll(attacker, defender);
    attackRoll.setWeapon(EquipmentFactory().build('longsword'));
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();

    const roll = DefendRoll(defender, attacker, attackRoll);
    expect(roll.getDefendSkill()).to.equal('block');
  });

});
