describe('BaseMonster', function() {

  describe('getChallengeRating()', function() {
    it('uses the ability essence values for monsters with no equipment', function() {
      expect(BaseMonster.lookup('gnawbones').getChallengeRating()).to.equal(90);
    });

    it('uses the equipment budget and the ability essence values for monsters with equipment', function() {
      expect(BaseMonster.lookup('flamescale-screamer').getChallengeRating()).to.equal(353);
    });
  });

});
