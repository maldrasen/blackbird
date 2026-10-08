describe("ResistRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function pinnedCharacter(state, species) {
    const target = state.getEntityAtPosition('P',1,2);
    const actor = ActorComponent.lookup(target);
    actor.species = species;
    ActorComponent.update(target, actor);
    return target;
  }

  // The stub order is the 5% critical roll, then the contest floor and resistance rolls, then the contest floor and
  // power rolls. A resistance of zero never rolls, so those specs stub one value fewer.

  // The resistance roll of 40 is only a valid stub because the difficulty option raised the character's resistance
  // bound from 0 to 50 - the stub validator throws if the option stops reaching the roll.
  it("adds the resistance option to a character's resist roll", async function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:50 } });

    Random.stubRoll(5, 10, 40, 10, 30);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.pass);
  });

  // The kobold's resist roll is bound by their own fire resistance of 20, not by the resistance option.
  it("rolls a monster's own resistance", async function() {
    const state = startBattle();
    const target = state.getActiveMonsters()[0];
    await WorldState.setOptions({ difficulty:{ damage:100, mitigation:100, resistance:100 } });

    Random.stubRoll(5, 10, 15, 10, 30);

    expect(ResistRoll(target, DamageType.fire, 100)).to.equal(ResistResult.fail);
  });

  // A vermen's psychic resistance of -20 subtracts its roll, turning what would otherwise be a passed resist into a
  // failed one.
  it("subtracts a roll for a negative resistance", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.vermen);

    Random.stubRoll(5, 15, 10, 10, 2);

    expect(ResistRoll(target, DamageType.psychic, 100)).to.equal(ResistResult.fail);
  });

  // The Firewalker's helm is pinned to 8 fire resistance, the only fire resistance the human has. The resistance roll
  // of 7 is only a valid stub because the helm raised the bound from 0 to 8.
  it("adds the resistance of enchanted equipment to the roll", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);
    Random.stubBetween(8);
    ItemFixtures.equip(target, 'helm', ['steel'], { enchantment:{ pattern:'resistant-to-fire' } });

    Random.stubRoll(5, 15, 7, 10, 2);

    expect(ResistRoll(target, DamageType.fire, 100)).to.equal(ResistResult.pass);
  });

  // A Vigilant helm pinned to 12 blind resistance counts when blind is the effect being resisted. The resistance roll
  // of 11 is only a valid stub because the helm raised the bound from 0 to 12.
  it("adds the resistance against the status effect being resisted", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);
    Random.stubBetween(12);
    ItemFixtures.equip(target, 'helm', ['steel'], { enchantment:{ pattern:'vigilant' } });

    Random.stubRoll(5, 15, 11, 10, 2);

    expect(ResistRoll(target, DamageType.fire, 100, 'blind')).to.equal(ResistResult.pass);
  });

  // The same helm does nothing against stun, so no resistance roll is spent and the stubs fall through to the power
  // side of the contest.
  it("ignores resistance against other status effects", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);
    Random.stubBetween(12);
    ItemFixtures.equip(target, 'helm', ['steel'], { enchantment:{ pattern:'vigilant' } });

    Random.stubRoll(5, 15, 10, 4);

    expect(ResistRoll(target, DamageType.shock, 100, 'stun')).to.equal(ResistResult.pass);
  });

  // A resistance of zero doesn't roll at all, so the third and fourth stubbed values fall through to the power side
  // of the contest.
  it("skips the roll when the target has no resistance", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);

    Random.stubRoll(5, 15, 10, 4);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.pass);
  });

  it("fumbles into a failed resist", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);

    Random.stubRoll(0);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.fail);
  });

  it("criticals into a passed resist", function() {
    const state = startBattle();
    const target = pinnedCharacter(state, SpeciesCode.human);

    Random.stubRoll(19);

    expect(ResistRoll(target, DamageType.shock, 100)).to.equal(ResistResult.pass);
  });

});
