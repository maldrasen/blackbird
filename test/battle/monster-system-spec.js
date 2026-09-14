describe.only("MonsterSystem", function() {

  // The runt pack's kobolds each carry a club or a spear from their type and a low priority bite of their own. The
  // runt at M.0.2 acts, with its threat pinned so the target choice is deterministic, and the player stands in front
  // of it at P.0.2.
  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function takeTurn(kobold, target=null) {
    if (target) { Monster(kobold).updateThreat(target, 999999); }
    BattleSystem.specRound(kobold);
    MonsterSystem.executeBattleTurn();
    return BattleSystem.getRound();
  }

  function disarm(id) {
    const equipment = EquipmentManager(id);
    equipment.unequipItem(equipment.getSlot(EquipmentSlot.primary));
  }

  describe("executeBattleTurn()", function() {
    it("uses its highest priority possible ability on its highest threat target", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');
      const target = state.getEntityAtPosition('P.0.3');

      const round = takeTurn(kobold, target);

      expect(round.getAbility().getName()).to.equal('Attack');
      expect(round.getTarget()).to.equal(target);
    });

    it("falls back to a lower priority ability when the higher one isn't possible", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      disarm(kobold);
      const round = takeTurn(kobold, state.getEntityAtPosition('P.0.2'));

      expect(round.getAbility().getName()).to.equal('Bite');
    });

    it("skips an ability that's on cooldown", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      state.setCooldown(kobold, Monster(kobold).findAbility('Attack').getId(), 99999);
      const round = takeTurn(kobold, state.getEntityAtPosition('P.0.2'));

      expect(round.getAbility().getName()).to.equal('Bite');
    });

    it("defends when nothing is possible", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');

      state.getActiveCharacters().forEach(id => BattleSystem.addStatus(id, 'hidden'));
      const round = takeTurn(kobold);

      expect(round.getAbility().getName()).to.equal('Defend');
      expect(round.getTarget()).to.equal(null);
      expect(StatusEffects(kobold).hasPoised()).to.equal(true);
    });

    it("uses a forced ability on the player, cooldown or not", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');
      const bite = Monster(kobold).findAbility('Bite');

      state.setCooldown(kobold, bite.getId(), 99999);
      state.setForcedAbility('Bite');
      const round = takeTurn(kobold);

      expect(round.getAbility()).to.equal(bite);
      expect(round.getTarget()).to.equal(GameSystem.getState().getPlayer());
      expect(state.getForcedAbility()).to.equal(null);
    });

    it("makes its own choice when the forced ability isn't possible", function() {
      const state = startBattle();
      const kobold = state.getEntityAtPosition('M.0.2');
      const target = state.getEntityAtPosition('P.0.3');

      disarm(kobold);
      state.setForcedAbility('Attack');
      const round = takeTurn(kobold, target);

      expect(round.getAbility().getName()).to.equal('Bite');
      expect(round.getTarget()).to.equal(target);
      expect(state.getForcedAbility()).to.equal(null);
    });
  });

});
