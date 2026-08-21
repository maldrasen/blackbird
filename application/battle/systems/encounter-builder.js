global.EncounterBuilder = (function() {

  // Build an encounter with a cohort of monsters, given a target essence level and a list of cohorts to pull
  // from. These options will normally come from the dungeon floor. This is the standard version.
  function build(options) {
    const cohort = chooseCohort(options.cohorts, options.essenceTarget);
    const monsters = selectMonsters(cohort, options.essenceTarget);
    // TODO: Arrange the selected monsters into a formation and place them into the battle state.
  }

  // Choose which of the floor's cohorts the party will fight. A cohort is viable when it can field its minimum
  // group size without blowing past the essence target.
  function chooseCohort(cohorts, essenceTarget) {
    const viable = cohorts.filter(code => {
      const cohort = Cohort.lookup(code);
      const values = cohort.getMonsters().map(monster => essenceAverage(monster));
      const least = Math.min(...values);
      const most = Math.max(...values);
      const under = (cohort.getMinimum()) * least <= essenceTarget;
      const over = (cohort.getMaximum()) * most >= essenceTarget;
      return under && over;
    });

    if (viable.length > 0) {
      return Cohort.lookup(Random.from(viable));
    }

    const floor = DungeonSystem.getDungeonFloor();
    throw new Error(`Cannot find a viable cohort for [${floor.getTheme()}:${floor.getLevel()}]`);
  }

  // Select the monsters for the encounter, spending the essence target as a budget. To keep the group coherent,
  // it's built from a small roster of base types rather than the whole cohort; then monsters are drawn from the
  // roster until the total essence lands as close to the target as we can get it.
  function selectMonsters(cohort, essenceTarget) {
    const roster = buildRoster(cohort, essenceTarget);
    const minimum = cohort.getMinimum();
    const maximum = Math.min(cohort.getMaximum(), 10);
    return drawMonsters(roster, essenceTarget, minimum, maximum);
  }

  // The roster starts with an anchor, one of the cohort's more expensive base types that still fits the budget,
  // then adds companion types of comparable essence value. The spread limit keeps every monster in a formation at
  // roughly the same weight, so the cheapest types don't pad out every single encounter. When even the cheapest
  // type is over the target we have to overshoot to field anything at all, and that one type is the whole roster.
  function buildRoster(cohort, essenceTarget) {
    const types = [...cohort.getMonsters()].sort((a,b) => essenceAverage(b) - essenceAverage(a));
    const affordable = types.filter(type => essenceAverage(type) <= essenceTarget);
    const anchors = types.slice(0, Math.ceil(types.length/2)).filter(type => affordable.includes(type));
    const roster = [Random.from(anchors.length > 0 ? anchors : affordable)];
    const candidates = affordable.filter(type => type !== roster[0]);

    while (roster.length < BattleConstants.maxEncounterTypes && candidates.length > 0) {
      const averages = roster.map(type => essenceAverage(type));
      const band = candidates.filter(type => {
        const average = essenceAverage(type);
        return Math.max(average, ...averages) <= Math.min(average, ...averages) * BattleConstants.essenceSpreadRatio;
      });
      if (band.length === 0) { break; }

      const companion = Random.from(band);
      roster.push(companion);
      candidates.splice(candidates.indexOf(companion), 1);
    }

    return roster;
  }

  // Draw monsters from the roster until the budget is spent, starting with the anchor. Once nothing in the roster
  // fits the remaining budget anymore, one more of the cheapest type is still drawn when overshooting lands the
  // total closer to the target than stopping short would. The cohort's minimum group size wins over the budget.
  function drawMonsters(roster, essenceTarget, minimum, maximum) {
    const cheapest = roster.reduce((cheap,type) => essenceAverage(type) < essenceAverage(cheap) ? type : cheap);
    const picks = [roster[0]];
    let remaining = essenceTarget - essenceAverage(roster[0]);

    while (picks.length < maximum) {
      const affordable = roster.filter(type => essenceAverage(type) <= remaining);
      if (affordable.length === 0) { break; }

      const pick = Random.from(affordable);
      picks.push(pick);
      remaining -= essenceAverage(pick);
    }

    if (picks.length < maximum && remaining > 0 && essenceAverage(cheapest) < remaining * 2) {
      picks.push(cheapest);
    }

    while (picks.length < minimum) { picks.push(cheapest); }

    return picks;
  }

  // Base monster difficulty is judged by the average essence a monster of that type yields, precalculated in the
  // generated essence data file.
  function essenceAverage(code) {
    if (EssenceData[code] == null) { throw new Error(`No essence data for [${code}]`); }
    return EssenceData[code].average;
  }

  // Build an encounter with a single base monster. Used to test a single monster in a battle. A monster can never be
  // in the back rank without a monster in front of it, so even back preferring monsters are placed front and center.
  function buildFromMonster(code) {
    buildFromRecordData([[0,0,1,0,0]], { 1:{ code }});
  }

  // Build an encounter given an encounter record code. Used for specific battles where we always want the same
  // monsters in a given formation.
  function buildFromRecord(code) {
    const encounter = Encounter.lookup(code);
    buildFromRecordData(encounter.getFormation(), encounter.getMonsters());
  }

  // Build an encounter given a formation and a map of monster definitions. This is the same shape the encounter
  // records use. This version is for testing out specific configurations in the fixtures or battle testbed.
  function buildFromRecordData(formation, monsters) {
    placeFormation(resolveFormation(formation, monsters));
  }

  // The record shaped formation grid holds indexes into the monsters map, with zero marking an empty position.
  // Resolving the grid replaces each index with its definition's monster code.
  function resolveFormation(formation, monsters) {
    return formation.map(rank => rank.map(index => {
      const definition = monsters[index];
      if (definition == null) { return null; }
      if (definition.code == null) { throw new Error(`No code in monster definition [${index}]`); }
      return definition.code;
    }));
  }

  // The formation grid holds monster codes by rank and position. Each monster is built by the factory then added to
  // the battle state at its position in the monster formation.
  function placeFormation(formation) {
    const state = BattleSystem.getState();
    for (let r=0; r<formation.length; r++) {
      for (let p=0; p<formation[r].length; p++) {
        if (formation[r][p]) {
          const monster = MonsterFactory(formation[r][p]).build();
          state.addMonster(monster,`M.${r}.${p}`);
        }
      }
    }
  }

  return {
    build,
    buildFromMonster,
    buildFromRecord,
    buildFromRecordData,
    chooseCohort,
    selectMonsters,
  };
})();
