describe("PhysicalAttackContest", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function rolledContest(attacker, defender) {
    const contest = PhysicalAttackContest(attacker, defender);
    contest.setWeaponData({ base:'longsword' });
    contest.setHitLocation('chest');
    contest.roll();
    return contest;
  }

  it("keeps a normal pair as rolled", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',0,2);
    const defender = state.getEntityAtPosition('P',1,2);

    Random.stubBetween(50, 1, 50, 1);
    const contest = rolledContest(attacker, defender);

    expect(contest.getAttackRoll().isCrit()).to.be.false;
    expect(contest.getAttackRoll().isFumble()).to.be.false;
    expect(contest.getDefendRoll().isCrit()).to.be.false;
    expect(contest.getDefendRoll().isFumble()).to.be.false;
    expect(contest.getAttackRoll().getHitLocation()).to.equal('chest');
  });

  it("rerolls the pair when the attack and defend both crit", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',0,2);
    const defender = state.getEntityAtPosition('P',1,2);

    Random.stubBetween(98, 98, 50, 1, 50, 1);
    const contest = rolledContest(attacker, defender);

    expect(contest.getAttackRoll().isCrit()).to.be.false;
    expect(contest.getDefendRoll().isCrit()).to.be.false;
  });

  it("downgrades both crits when the reroll attempts are exhausted", function() {
    const state = startBattle();
    const attacker = state.getEntityAtPosition('P',0,2);
    const defender = state.getEntityAtPosition('P',1,2);

    Random.stubBetween(98, 98, 98, 98, 98, 98, 98, 98, 98, 98);
    const contest = rolledContest(attacker, defender);

    expect(contest.getAttackRoll().isCrit()).to.be.false;
    expect(contest.getDefendRoll().isCrit()).to.be.false;
    expect(contest.getDefendRoll().isFumble()).to.be.false;
  });

});
