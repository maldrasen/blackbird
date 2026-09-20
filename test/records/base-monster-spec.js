describe('BaseMonster', function() {

  describe('getAverageAttributes()', function() {
    it('averages a beast from its monster type grades', function() {
      const attributes = BaseMonster.lookup('gnawbones').getAverageAttributes();
      expect(attributes.getStrength()).to.equal(13);
      expect(attributes.getDexterity()).to.equal(17);
      expect(attributes.getVitality()).to.equal(10);
      expect(attributes.getIntelligence()).to.equal(9);
      expect(attributes.getBeauty()).to.equal(9);
    });

    it('averages a species monster from its species grades', function() {
      const attributes = BaseMonster.lookup('flamescale-screamer').getAverageAttributes();
      expect(attributes.getStrength()).to.equal(12);
      expect(attributes.getDexterity()).to.equal(15);
      expect(attributes.getVitality()).to.equal(16);
      expect(attributes.getIntelligence()).to.equal(34);
      expect(attributes.getBeauty()).to.equal(16);
    });
  });

  describe('getChallengeRating()', function() {
    it('uses the ability essence values for monsters with no equipment', function() {
      expect(BaseMonster.lookup('gnawbones').getChallengeRating()).to.equal(120);
    });

    it('uses the equipment budget and the ability essence values for monsters with equipment', function() {
      expect(BaseMonster.lookup('flamescale-screamer').getChallengeRating()).to.equal(353);
    });
  });

});
