global.MonsterFactory = (function() {

  function build(code) {
    const monsterBase = BaseMonster.lookup(code);
    const monsterSpecies = monsterBase.getSpecies();
    const monsterData = { code, threatTable:{}, abilityCooldowns:{} };

    let monsterId;

    // We can use the character factory to build the base monster.
    if (monsterSpecies) {
      monsterId = CharacterFactory.build({
        species: monsterSpecies,
        gender: Random.fromFrequencyMap(monsterBase.getGenderRatio()),
        triggers: monsterBase.getTriggers()
      });
      addBasicAttack(monsterData, monsterBase);
    }

    // We need to build the battle applicable components that the character builder would have built from scratch.
    if (monsterSpecies == null) {
      monsterId = Registry.createEntity();
    }

    MonsterComponent.create(monsterId, monsterData);
    return monsterId;
  }

  // Pick a weapon attack from the table if this monster has a weapon attack. Some monsters won't have any weapon
  // attacks and will only have other natural attacks (bite, claw) and some monsters might only have abilities, like
  // a poison spit or something.
  function addBasicAttack(monsterData, monsterBase) {
    const attackTable = monsterBase.getAttackTable();
    if (attackTable) {
      monsterData.basicAttack = Random.from(attackTable);
    }
  }

  return Object.freeze({
    build,
  })

})();
