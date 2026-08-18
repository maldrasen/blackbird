global.EncounterBuilder = function() {

  // Build an encounter with a cohort of monsters, given a target essence level and a list of monster codes to pull
  // from. This list will normally come from the dungeon level. This is the standard version.
  function build(essenceTarget, monsterList) {}

  // Build an encounter with a single base monster. Used to test a single monster in a battle.
  function buildFromMonster(code) {}

  // Build an encounter given an encounter record code. Used for specific battles where we always want the same
  // monsters in a given formation.
  function buildFromRecord(code) {}

  // Build an encounter given a formation and a map of monster definitions. This is the same shape the encounter
  // records use. This version is for testing out specific configurations in the fixtures or battle testbed.
  function buildFromRecordData(formation, monsters) {}

  return {
    build,
    buildFromMonster,
    buildFromRecord,
    buildFromRecordData,
  };
};
