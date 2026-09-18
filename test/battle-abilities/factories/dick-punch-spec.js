describe("Ability.DickPunch", function() {

  // The kobold dick puncher squares up to a well-endowed elf who can't dodge to save his life, with the player behind
  // him and a woman beside him. The kobold's strength and training make every punch land.
  function startBattle() {
    const target = CharacterFixtures.genericMale({
      cock: 'huge',
      attributes: { dexterity:1 },
      health: { currentHealth:10000, maxHealth:10000 },
    });
    const woman = CharacterFixtures.genericFemale({});

    PartyConfiguration.setCharacter(target, 'P.0.2');
    PartyConfiguration.setCharacter(woman, 'P.0.3');
    CharacterFixtures.randomPlayer();
    BattleSystem.startBattle({ monster:'kobold-dick-puncher', ambushState:'normal' });

    const kobold = BattleSystem.getState().getActiveMonsters()[0];
    train(kobold);

    return { kobold, target, woman };
  }

  function train(kobold) {
    const attributes = AttributesComponent.lookup(kobold);
    attributes.strength = 100;
    attributes.dexterity = 100;
    AttributesComponent.update(kobold, attributes);

    const skills = SkillsComponent.lookup(kobold);
    skills['martial-arts'] = 100;
    SkillsComponent.update(kobold, skills);
  }

  function wearPants(id, base) {
    const pants = EquipmentFactory().build(base);
    InventoryManager(id).addItem(pants);
    EquipmentManager(id).equipItem(pants, EquipmentSlot.legs);
  }

  function messages() {
    return BattleSystem.getRound().getMessages();
  }

  it("is a priced, leg-targeted punch that carries the monster's priority", function() {
    const ability = Ability.DickPunch({ priority:100 });

    expect(ability.getName()).to.equal('Dick Punch');
    expect(ability.getEssence()).to.equal(75);
    expect(ability.getCooldown()).to.equal(1000);
    expect(ability.getPriority()).to.equal(100);
  });

  it("needs a target with a dick", function() {
    const { kobold, target, woman } = startBattle();

    BattleSystem.specRound(kobold, { target });
    expect(Ability.DickPunch().isPossible()).to.equal(true);

    BattleSystem.specRound(kobold, { target:woman });
    expect(Ability.DickPunch().isPossible()).to.equal(false);
  });

  it("hits harder the bigger the dick and the softer the pants", function() {
    const { kobold, target } = startBattle();
    const ability = Ability.DickPunch();

    BattleSystem.specRound(kobold, { target });
    expect(ability.getDamageBonus()).to.equal(1.6);

    wearPants(target, 'chaps');
    expect(ability.getDamageBonus()).to.be.closeTo(1.2, 0.0001);

    wearPants(target, 'greaves');
    expect(ability.getDamageBonus()).to.be.closeTo(0.4, 0.0001);
  });

  // The stubbed values are consumed in order: the attack's crit and value rolls, the defend crit roll (the value roll
  // of a dexterity 1 dodge has only one outcome), then the damage roll. The two plain rolls are the dodge skill's
  // improvement roll and the resist roll's critical band, where a zero fumbles the resist.
  it("punches the dick and stuns a target in soft pants who fails to resist", function() {
    const { kobold, target } = startBattle();

    wearPants(target, 'chaps');
    BattleSystem.specRound(kobold, { target });
    Random.stubBetween(50, 75, 50, 40);
    Random.stubRoll(0, 0);
    Ability.DickPunch().execute();

    expect(BattleSystem.getRound().getContext().hitLocation).to.equal(EquipmentSlot.legs);
    expect(messages()[0].text).to.include('in the dick');
    expect(messages().some(message => message.text.includes('clutches'))).to.equal(true);
    expect(StatusEffects(target).hasStun()).to.equal(true);
  });

  it("can't stun through metal pants", function() {
    const { kobold, target } = startBattle();

    wearPants(target, 'greaves');
    BattleSystem.specRound(kobold, { target });
    Ability.DickPunch().execute();

    expect(messages().some(message => message.text.includes('Hit for'))).to.equal(true);
    expect(StatusEffects(target).hasStun()).to.equal(false);
  });

});
