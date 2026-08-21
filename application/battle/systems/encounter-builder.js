global.EncounterBuilder = (function() {

  // Build an encounter with a cohort of monsters, given a target essence level and a list of cohorts to pull
  // from. This list will normally come from the dungeon level. This is the standard version.
  function build(essenceTarget, cohorts) {}

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
  };
})();
