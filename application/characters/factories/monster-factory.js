global.MonsterFactory = (function() {

  function build(id, code) {
    console.log(`Build ${code} [${id}]`);

    const monster = Monster.lookup(code);
    if (monster.getSpecies()) {
      // we can use the character factory to build the base monster.
    }

    if (monster.getSpecies() == null) {
      // we need to build the battle applicable components that the character builder would have built from scratch.
    }
  }

  return Object.freeze({
    build,
  })

})();
