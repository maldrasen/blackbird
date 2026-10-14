describe("DamageRoll", function() {

  // The stubbed values are consumed in order: attack crit roll, attack value roll, defend crit roll, defend value
  // roll, the damage roll itself, then one roll for each of the loaded ammunition's damage types. A crit (98) or
  // fumble (2) consumes only its crit roll.
  function contestDamage(stubs, options={}) {
    BattleSupport.startBattle();
    const attacker = BattleSupport.player();
    const defender = BattleSupport.centerRogue();
    CharacterSupport.setAttribute(attacker, Attrib.strength, 50);

    if (options.status) { BattleSystem.addStatus(attacker, options.status, { count:1 }); }
    if (options.ammunition) { QuiverComponent.update(attacker, { ammunition:options.ammunition, quantity:1 }); }

    Random.stubBetween(...stubs);

    const contest = PhysicalAttackContest(attacker, defender);
    contest.setWeapon(ItemSupport.build(options.weapon || 'longsword', options.materials || ['steel']));
    contest.setHitLocation('chest');
    contest.roll();

    return DamageRoll(attacker, contest.getAttackRoll(), contest.getDefendRoll());
  }

  function naturalAttackDamage(state, profile) {
    const monster = state.getEntityAtPosition('M',0,2);
    const defender = BattleSupport.centerRogue();
    CharacterSupport.setAttribute(monster, Attrib.strength, 40);
    CharacterSupport.setSkill(monster, 'martial-arts', 20);

    Random.stubBetween(50, 1, 50, 1, 50);

    const attack = PhysicalAttackRoll(monster, defender);
    attack.setNaturalAttack(profile);
    attack.setHitLocation('chest');
    attack.roll();

    return DamageRoll(monster, attack, DefendRoll(defender, monster, attack));
  }

  it("rolls weapon damage from the attacker's strength", function() {
    const damage = contestDamage([50, 1, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:40 });
    expect(damage.hasMessage()).to.equal(false);
  });

  // A steel longsword rolls 50-100, so the stub refuses a 38 unless the range really was scaled down to flint's 38-75.
  it("rolls within the range the weapon's material scales it to", function() {
    const damage = contestDamage([50, 1, 50, 1, 38], { materials:['flint'] });

    expect(damage.getDamageTypes()).to.deep.equal({ slash:19 });
  });

  it("rolls monster damage from a natural attack profile", function() {
    const damage = naturalAttackDamage(BattleSupport.startBattle(), {
      skill:'martial-arts', textKey:'punch', damageType:DamageType.crush, low:20, high:60 });

    expect(damage.getDamageTypes()).to.deep.equal({ crush:20 });
  });

  it("splits the damage across the weapon's damage types", function() {
    const damage = naturalAttackDamage(BattleSupport.startBattle(), {
      skill:'martial-arts', name:'claw', textKey:'punch', low:20, high:60,
      damageTypes:[{ type:DamageType.crush, percent:75 }, { type:DamageType.slash, percent:25 }] });

    expect(damage.getDamageTypes()).to.deep.equal({ crush:15, slash:5 });
  });

  it("doubles the damage on an attack crit", function() {
    const damage = contestDamage([98, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:80 });
    expect(damage.getMessage().text).to.equal(`The attack catches {T:targetName} by surprise!`);
  });

  it("halves the damage on an attack fumble", function() {
    const damage = contestDamage([2, 50, 1, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:20 });
    expect(damage.getMessage().text).to.equal(`It was only a glancing blow.`);
  });

  it("halves the damage on a defend crit", function() {
    const damage = contestDamage([50, 1, 98, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:20 });
    expect(damage.getMessage().text).to.equal(`{T:TargetName} was almost able to avoid it.`);
  });

  it("doubles the damage on a defend fumble", function() {
    const damage = contestDamage([50, 1, 2, 80]);

    expect(damage.getDamageTypes()).to.deep.equal({ slash:80 });
    expect(damage.getMessage().text).to.equal(`{T:TargetName} was left wide open!`);
  });

  // Advantage and disadvantage make the attack roll twice, so the stubs supply a second attack crit and value roll.
  it("adds half again to the damage while poised", function() {
    const damage = contestDamage([50, 1, 50, 1, 50, 1, 80], { status:'poised' });

    expect(damage.getDamageTypes()).to.deep.equal({ slash:60 });
  });

  it("halves the damage while off balance", function() {
    const damage = contestDamage([50, 1, 50, 1, 50, 1, 80], { status:'off-balance' });

    expect(damage.getDamageTypes()).to.deep.equal({ slash:20 });
  });

  // A wood shortbow rolls 40-80 pierce, so a shot is the bow's share of strength plus the arrow's own roll.
  it("adds the loaded ammunition's roll to a shot from a bow", function() {
    const damage = contestDamage([50, 1, 50, 1, 50, 4], { weapon:'shortbow', materials:['wood'], ammunition:'elm-arrow' });

    expect(damage.getDamageTypes()).to.deep.equal({ pierce:29 });
  });

  it("keeps the ammunition's own damage types apart from the bow's", function() {
    const damage = contestDamage([50, 1, 50, 1, 50, 3, 5], { weapon:'shortbow', materials:['wood'], ammunition:'blackflame-arrow' });

    expect(damage.getDamageTypes()).to.deep.equal({ pierce:28, fire:5 });
  });

  it("doubles the ammunition's damage on a crit along with the bow's", function() {
    const damage = contestDamage([98, 50, 1, 50, 4], { weapon:'shortbow', materials:['wood'], ammunition:'elm-arrow' });

    expect(damage.getDamageTypes()).to.deep.equal({ pierce:58 });
  });

  it("adds half again to the ammunition's damage while poised", function() {
    const damage = contestDamage([50, 1, 50, 1, 50, 1, 50, 4], { weapon:'shortbow', materials:['wood'], ammunition:'elm-arrow', status:'poised' });

    expect(damage.getDamageTypes()).to.deep.equal({ pierce:44 });
  });

  it("rolls only the bow's damage when nothing is loaded", function() {
    const damage = contestDamage([50, 1, 50, 1, 50], { weapon:'shortbow', materials:['wood'] });

    expect(damage.getDamageTypes()).to.deep.equal({ pierce:25 });
  });

});
