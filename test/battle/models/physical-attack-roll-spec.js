describe("PhysicalAttackRoll", function() {

  function prepare(options={}) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:(options.encounter || 'kobold-1'), ambushState:'normal' });

    if (options.playerMainWeapon) {
      BattleFixtures.equipWeapon(GameState.getPlayer(), options.playerMainWeapon, EquipmentSlot.primary);
    }

  }

  it.only("a simple weapon attack", function() {
    prepare({ encounter:'kobold-tossers' });

    console.log("?")

    const monster = BattleSystem.getState().getMonsters()[0];
    const weapons = BattleHelper.compileWeaponData(monster);
    const attacks = BasicAttack.calculateAttacks(monster, weapons);

    console.log("Weapons:",weapons)
    console.log("Attacks:",attacks)

    const roll = PhysicalAttackRoll(monster, GameState.getPlayer(), attacks[0]);
    //
    // console.log("=== ROLL ===");
    // console.log(roll)

  });

});