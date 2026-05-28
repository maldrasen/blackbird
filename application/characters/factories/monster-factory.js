global.MonsterFactory = (function() {

  function build(code) {
    console.log(`Build [${code}]`);

    const monsterType = Monster.lookup(code);
    const monsterSpecies = monsterType.getSpecies();
    let monsterId;

    // we can use the character factory to build the base monster.
    if (monsterSpecies) {
      monsterId = CharacterFactory.build({ species:monsterSpecies, triggers:monsterType.getTriggers() });
    }

    // we need to build the battle applicable components that the character builder would have built from scratch.
    if (monsterSpecies == null) {
      monsterId = Registry.createEntity();
    }

    return monsterId;
  }

  return Object.freeze({
    build,
  })

})();
