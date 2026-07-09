describe("BasicAttack", function() {

  /*

      TODO: Need to move all this.

    function prepare(options={}) {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:(options.encounter || 'kobold-1'), ambushState:'normal' });

      if (options.playerMainWeapon) {
        BattleFixtures.equipWeapon(GameSystem.getState().getPlayer(), options.playerMainWeapon, EquipmentSlot.primary);
      }
    }

    function setPlayerAttribute(data) {
      const attributes = AttributesComponent.lookup(GameSystem.getState().getPlayer());
      Object.entries(data).forEach(([key,value]) => { attributes[key] = value; });
      AttributesComponent.update(GameSystem.getState().getPlayer(),attributes);
    }

    describe("rollDamage()", function() {
      it("a normal attack with a single damage type", function() {
        prepare();
        setPlayerAttribute({ strength:50 });
        BattleSystem.specRound(GameSystem.getState().getPlayer(), { target:BattleSystem.getState().getMonsters()[0] });

        const complexDamage = BasicAttack.rollDamage(GameSystem.getState().getPlayer(), BaseWeapon.lookup('maul'), 'normal', 'normal');
        expect(BattleSystem.getRound().getMessages().length).to.equal(0);
        expect(Object.keys(complexDamage).length).to.equal(1);
        expect(complexDamage.crush).to.be.greaterThan(50);
      });

      it("a super crit hit with two damage types", function() {
        prepare();
        setPlayerAttribute({ strength:50 });
        BattleSystem.specRound(GameSystem.getState().getPlayer(), { target:BattleSystem.getState().getMonsters()[0] });

        const complexDamage = BasicAttack.rollDamage(GameSystem.getState().getPlayer(), BaseWeapon.lookup('morning-star'), 'crit', 'fumble');
        expect(BattleSystem.getRound().getMessages().length).to.equal(2);
        expect(Object.keys(complexDamage).length).to.equal(2);
        expect(complexDamage.pierce).to.be.greaterThan(50);
        expect(complexDamage.crush).to.be.greaterThan(50);
      });
    })

  describe("calculateAttacks()", function() {
    it("a single primary attack", function() {
      prepare({ encounter: 'kobold-trappers' });

      BattleSystem.specRound(BattleSystem.getState().getMonsters()[0]);
      const attacks = BasicAttack.calculateAttacks();

      expect(attacks.length).to.equal(1)
      expect(attacks[0].base).to.equal('spear');
      expect(attacks[0].time).to.equal(1200);
    });

    it("a single fast weapon", function() {
      prepare({ playerMainWeapon:{ base:'dagger' }});

      BattleSystem.specRound(GameSystem.getState().getPlayer());
      const attacks = BasicAttack.calculateAttacks();

      expect(attacks.length).to.equal(2)
      expect(attacks[0].base).to.equal('dagger');
      expect(attacks[0].time).to.equal(500);
      expect(attacks[0].hand).to.equal('primary');
      expect(attacks[1].hand).to.equal('primary');
    });

    it("dual wielded weapons", function() {
      prepare({ encounter: 'kobold-sneak-sluts' });

      BattleSystem.specRound(BattleSystem.getState().getMonsters()[0]);
      const attacks = BasicAttack.calculateAttacks();

      expect(attacks.length).to.equal(3)
      expect(attacks[0].base).to.equal('knife');
      expect(attacks[0].time).to.equal(375);
      expect(attacks[0].hand).to.equal('primary');
      expect(attacks[1].hand).to.equal('secondary');
      expect(attacks[2].hand).to.equal('primary');
    });
  });
  */

});
