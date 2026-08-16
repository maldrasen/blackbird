describe("DamageRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
    return BattleSystem.getState();
  }

  function setStrength(id, value) {
    const attributes = AttributesComponent.lookup(id);
    attributes.strength = value;
    AttributesComponent.update(id, attributes);
  }

  function setSkill(id, code, value) {
    const skills = SkillsComponent.lookup(id);
    skills[code] = value;
    SkillsComponent.update(id, skills);
  }

  // The stubbed values are consumed in order: attack crit roll, attack value roll, defend crit roll, defend value
  // roll, then the damage roll itself. A crit (98) or fumble (2) consumes only its crit roll.
  function contestDamage(state, stubs) {
    const attacker = state.getEntityAtPosition('P',0,2);
    const defender = state.getEntityAtPosition('P',1,2);
    setStrength(attacker, 50);

    Random.stubBetween(...stubs);

    const contest = PhysicalAttackContest(attacker, defender);
    contest.setWeaponData({ base:'longsword' });
    contest.setHitLocation('chest');
    contest.roll();

    return DamageRoll(attacker, contest.getAttackRoll(), contest.getDefendRoll());
  }

  function naturalAttackDamage(state, profile) {
    const monster = state.getEntityAtPosition('M',0,2);
    const defender = state.getEntityAtPosition('P',1,2);
    setStrength(monster, 40);
    setSkill(monster, 'martial-arts', 20);

    Random.stubBetween(50, 1, 50, 1, 50);

    const attack = PhysicalAttackRoll(monster, defender);
    attack.setNaturalAttack(profile);
    attack.setHitLocation('chest');
    attack.roll();

    return DamageRoll(monster, attack, DefendRoll(defender, monster, attack));
  }

  it("rolls weapon damage from the attacker's strength", function() {
    const damage = contestDamage(startBattle(), [50, 1, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:40 });
    expect(damage.hasMessage()).to.equal(false);
  });

  it("rolls monster damage from a natural attack profile", function() {
    const damage = naturalAttackDamage(startBattle(), {
      skill:'martial-arts', textKey:'punch', damageType:DamageType.crush, low:20, high:60 });

    expect(damage.getDamageTypes()).to.deep.equal({ crush:20 });
  });

  it("splits the damage across the weapon's damage types", function() {
    const damage = naturalAttackDamage(startBattle(), {
      skill:'martial-arts', name:'claw', textKey:'punch', low:20, high:60,
      damageTypes:[{ type:DamageType.crush, percent:75 }, { type:DamageType.slash, percent:25 }] });

    expect(damage.getDamageTypes()).to.deep.equal({ crush:15, slash:5 });
  });

  it("doubles the damage on an attack crit", function() {
    const damage = contestDamage(startBattle(), [98, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:80 });
    expect(damage.getMessage().text).to.equal(`The attack catches {T:targetName} by surprise!`);
  });

  it("halves the damage on an attack fumble", function() {
    const damage = contestDamage(startBattle(), [2, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:20 });
    expect(damage.getMessage().text).to.equal(`It was only a glancing blow.`);
  });

  it("halves the damage on a defend crit", function() {
    const damage = contestDamage(startBattle(), [50, 1, 98, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:20 });
    expect(damage.getMessage().text).to.equal(`{T:TargetName} was almost able to avoid it.`);
  });

  it("doubles the damage on a defend fumble", function() {
    const damage = contestDamage(startBattle(), [50, 1, 2, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:80 });
    expect(damage.getMessage().text).to.equal(`{T:TargetName} was left wide open!`);
  });

});
