describe("BasicAttack", function() {

  function prepare(options={}) {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ encounter:(options.encounter || 'kobold-1'), ambushState:'normal' });

    if (options.playerMainWeapon) {
      BattleFixtures.equipWeapon(GameState.getPlayer(), options.playerMainWeapon, EquipmentSlot.primary);
    }
  }

  describe("rollDamage()", function() {
    it("a normal attack with a single damage type", function() {
      const horse = CharacterFixtures.genericMale({ attributes:{ strength:50 } });
      const complexDamage = BasicAttack.rollDamage(horse, BaseWeapon.lookup('maul'), 'normal', 'normal');

      expect(complexDamage.messages.length).to.equal(0);
      expect(Object.keys(complexDamage.damage).length).to.equal(1);
      expect(complexDamage.damage.crush).to.be.greaterThan(50);
    });

    it("a super crit hit with two damage types", function() {
      const horse = CharacterFixtures.genericMale({ attributes:{ strength:50 } });
      const complexDamage = BasicAttack.rollDamage(horse, BaseWeapon.lookup('morning-star'), 'crit', 'fumble');

      expect(complexDamage.messages.length).to.equal(2);
      expect(Object.keys(complexDamage.damage).length).to.equal(2);
      expect(complexDamage.damage.pierce).to.be.greaterThan(50);
      expect(complexDamage.damage.crush).to.be.greaterThan(50);
    });
  })

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
