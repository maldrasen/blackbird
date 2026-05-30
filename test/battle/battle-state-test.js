describe("BattleState", function() {

  describe("Formation", function() {
    it('monsterAtPosition()', function() {
      BattleFixtures.prepareForBattle();
      BattleController.startBattle({ encounter:'kobold-1' });

      const state = BattleController.getState();
      expect(state.monsterAtPosition(0,3)).to.not.be.null;
      expect(state.monsterAtPosition(1,3)).to.be.null;
    });
  })

  describe("Turn Order", function() {
    it('moves the character within the turn order after acting', function() {
      BattleFixtures.prepareForBattle();
      BattleController.startBattle({ encounter:'kobold-1' });

      const state = BattleController.getState();
      const next = state.getNext();
      next.time += 1000;
      state.setTurnOrder(next);

      const newOrder = state.getTurnOrder();
      const last = newOrder[newOrder.length-1];

      expect(next.id).to.equal(last.id);
    });

    it('entities can be removed from the turn order', function() {
      BattleFixtures.prepareForBattle();
      BattleController.startBattle({ encounter:'kobold-1' });

      const state = BattleController.getState();
      const order = state.getTurnOrder();
      const second = order[1];

      state.removeFromTurnOrder(second);

      const ids = state.getTurnOrder().map(data => { return data.id });

      expect(ids.includes(second.id)).to.be.false;
    });
  });

});