describe("PhysicalAttackRoll", function() {

  function startBattle() {
    BattleFixtures.prepareForBattle();
    BattleSystem.startBattle({ ...BattleFixtures.runtPack(), ambushState:'normal' });
    return BattleSystem.getState();
  }

  function rollAgainstMonster(state, attacker) {
    const attackRoll = PhysicalAttackRoll(attacker, state.getActiveMonsters()[0]);
    attackRoll.setWeaponData({ base:'longsword' });
    attackRoll.setHitLocation(EquipmentSlot.chest);
    attackRoll.roll();
    return attackRoll;
  }

  describe("roll()", function() {
    it("rolls normally with clear eyes", function() {
      const state = startBattle();
      const attacker = state.getEntityAtPosition('P',1,2);

      const attackRoll = rollAgainstMonster(state, attacker);
      expect(attackRoll.getRollMode()).to.equal(RollMode.normal);
    });

    it("rolls with disadvantage while blinded", function() {
      const state = startBattle();
      const attacker = state.getEntityAtPosition('P',1,2);
      BattleSystem.addStatus(attacker, 'blind', { duration:1000 });

      const attackRoll = rollAgainstMonster(state, attacker);
      expect(attackRoll.getRollMode()).to.equal(RollMode.disadvantage);
    });
  });

});
