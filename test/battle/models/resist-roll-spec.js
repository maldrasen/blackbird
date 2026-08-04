describe("ResistRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });
    return BattleSystem.getState();
  }

  // The species is pinned to human so the character brings no innate resistance of their own.
  function pinnedCharacter(state) {
    const target = state.getEntityAtPosition('P',1,2);
    const actor = ActorComponent.lookup(target);
    actor.species = SpeciesCode.human;
    ActorComponent.update(target, actor);
    return target;
  }

  // The stub order is the 10% critical roll, then the resist roll, then the power roll.

  // The resist roll of 40 is only a valid stub because the difficulty option raised the character's resistance
  // bound from 0 to 50 - the stub validator throws if the option stops reaching the roll.
  it("adds the resistance option to a character's resist roll", async function() {
    const state = startBattle();
    const target = pinnedCharacter(state);
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:50 } });

    Random.stubRoll(5, 40, 30);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.pass);
  });

  // The kobold's resist roll is bound by their own fire resistance of 20, not by the resistance option.
  it("rolls a monster's own resistance", async function() {
    const state = startBattle();
    const target = state.getActiveMonsters()[0];
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:100 } });

    Random.stubRoll(5, 15, 30);

    expect(ResistRoll(target, DamageType.fire, 100)).to.equal(ResistResult.fail);
  });

  it("fumbles into a failed resist", function() {
    const state = startBattle();
    const target = pinnedCharacter(state);

    Random.stubRoll(0);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.fail);
  });

  it("criticals into a passed resist", function() {
    const state = startBattle();
    const target = pinnedCharacter(state);

    Random.stubRoll(9);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.pass);
  });

});
