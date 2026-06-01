global.MonsterFactory = (function() {

  function build(code) {
    const monsterType = Monster.lookup(code);
    const monsterSpecies = monsterType.getSpecies();
    const attackTable = monsterType.getAttackTable();

    let monsterId;

    // We can use the character factory to build the base monster.
    if (monsterSpecies) {
      monsterId = CharacterFactory.build({ species:monsterSpecies, triggers:monsterType.getTriggers() });
    }

    // We need to build the battle applicable components that the character builder would have built from scratch.
    if (monsterSpecies == null) {
      monsterId = Registry.createEntity();
    }

    // Pick a weapon attack from the table if this monster has a weapon attack. (Some monsters will only have
    // abilities)
    if (attackTable) {
      const attack = Random.from(attackTable);
      console.log("Picked this attack",attack)
      console.log("Needs to be saved on the monster component somehow...")
    }

    buildMonsterComponents(monsterId, code);

    return monsterId;
  }

  // Not sure what else this needs to add other than a handle to the monster data objects. Spells and abilities and
  // such probably come from the data object. The entity should carry anything that makes the monster unique, but I'm
  // not sure if there is anything like that.
  function buildMonsterComponents(monsterId, code) {
    MonsterComponent.create(monsterId,{ code });
  }

  return Object.freeze({
    build,
  })

})();
