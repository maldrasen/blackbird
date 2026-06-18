describe("BasicAttack", function() {

  function prepare(options={}) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:(options.encounter || 'kobold-1'), ambushState:'normal' });

    if (options.playerMainWeapon) {
      BattleFixtures.equipWeapon(GameState.getPlayer(), options.playerMainWeapon, EquipmentSlot.primary);
    }
  }

  describe("calculateAttacks()", function() {
    it("a single primary attack", function() {
      prepare({ encounter: 'kobold-trappers' });

      const kobold = BattleSystem.getState().getMonsters()[0];
      const weapons = BattleHelper.compileWeaponData(kobold);
      const attacks = BasicAttack.calculateAttacks(kobold, weapons);

      expect(attacks.length).to.equal(1)
      expect(attacks[0].base).to.equal('spear');
      expect(attacks[0].time).to.equal(1200);
    });

    it("a single fast weapon", function() {
      prepare({ playerMainWeapon:{ base:'dagger' }});

      const player = GameState.getPlayer();
      const weapons = BattleHelper.compileWeaponData(player);
      const attacks = BasicAttack.calculateAttacks(player, weapons);

      expect(attacks.length).to.equal(2)
      expect(attacks[0].base).to.equal('dagger');
      expect(attacks[0].time).to.equal(500);
      expect(attacks[0].hand).to.equal('primary');
      expect(attacks[1].hand).to.equal('primary');
    });

    it("dual wielded weapons", function() {
      prepare({ encounter: 'kobold-sneak-sluts' });

      const kobold = BattleSystem.getState().getMonsters()[0];
      const weapons = BattleHelper.compileWeaponData(kobold);
      const attacks = BasicAttack.calculateAttacks(kobold, weapons);

      expect(attacks.length).to.equal(3)
      expect(attacks[0].base).to.equal('knife');
      expect(attacks[0].time).to.equal(375);
      expect(attacks[0].hand).to.equal('primary');
      expect(attacks[1].hand).to.equal('secondary');
      expect(attacks[2].hand).to.equal('primary');
    });
  });

});
