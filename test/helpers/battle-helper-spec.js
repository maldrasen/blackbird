describe('BattleHelper', function() {

  describe('distanceBetweenPositions()', function() {
    it('across from each other', function() {
      const distance = BattleHelper.distanceBetweenPositions('0.1','0.1')
      expect(distance.rank).to.equal(0);
      expect(distance.position).to.equal(0);
    });

    it('different position', function() {
      const distance = BattleHelper.distanceBetweenPositions('0.1','0.3')
      expect(distance.rank).to.equal(0);
      expect(distance.position).to.equal(2);
    });

    it('different ranks', function() {
      const distance = BattleHelper.distanceBetweenPositions('1.3','0.3')
      expect(distance.rank).to.equal(1);
      expect(distance.position).to.equal(0);
    });

    it('both different', function() {
      const distance = BattleHelper.distanceBetweenPositions('1.0','2.4')
      expect(distance.rank).to.equal(3);
      expect(distance.position).to.equal(4);
    });
  });

});
