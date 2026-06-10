describe("BattleState", function() {

  describe("Formation", function() {
    it('getMonsterAtPosition()', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1' });

      const state = BattleSystem.getState();
      expect(state.getMonsterAtPosition(0,3)).to.not.be.null;
      expect(state.getMonsterAtPosition(1,3)).to.be.null;
    });
  })

  describe("Turn Order", function() {
    it('moves the character within the turn order after acting', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const next = state.getNext();
      next.time += 1000;
      state.setTurnOrder(next);

      const newOrder = state.getTurnOrder();
      const last = newOrder[newOrder.length-1];

      expect(next.id).to.equal(last.id);
    });

    it('entities can be removed from the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      const state = BattleSystem.getState();
      const order = state.getTurnOrder();
      const second = order[1];

      state.removeFromTurnOrder(second);

      const ids = state.getTurnOrder().map(data => { return data.id });

      expect(ids.includes(second.id)).to.be.false;
    });
  });

});