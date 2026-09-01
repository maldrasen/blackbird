describe('BattleHelper', function() {

  describe('distanceBetweenPositions()', function() {
    it('across from each other', function() {
      const distance = BattleHelper.distanceBetweenPositions('M.0.1','P.0.1')
      expect(distance.rank).to.equal(0);
      expect(distance.position).to.equal(0);
    });

    it('different position', function() {
      const distance = BattleHelper.distanceBetweenPositions('M.0.1','P.0.3')
      expect(distance.rank).to.equal(0);
      expect(distance.position).to.equal(2);
    });

    it('different ranks', function() {
      const distance = BattleHelper.distanceBetweenPositions('M.1.3','P.0.3')
      expect(distance.rank).to.equal(1);
      expect(distance.position).to.equal(0);
    });

    it('both different', function() {
      const distance = BattleHelper.distanceBetweenPositions('M.1.0','P.2.4')
      expect(distance.rank).to.equal(3);
      expect(distance.position).to.equal(4);
    });

    it('same side, same rank', function() {
      const distance = BattleHelper.distanceBetweenPositions('M.0.1','M.0.3')
      expect(distance.rank).to.equal(0);
      expect(distance.position).to.equal(2);
    });

    it('same side, different rank', function() {
      const distance = BattleHelper.distanceBetweenPositions('P.1.0','P.0.4')
      expect(distance.rank).to.equal(1);
      expect(distance.position).to.equal(4);
    });
  });

});
