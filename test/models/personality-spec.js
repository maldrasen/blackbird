describe.only("Personality", function() {

  describe('getArchetype()', function() {
    it('looks at the slut aspect', function() {

    });
  });

  describe('attitudeTowardsTraining()', function() {
    it('looks at the consent results for some basic actions', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const personality = Personality(context.T);
      expect(personality.attitudeTowardsTraining()).to.equal(TrainingAttitude.unwilling);
    });
  });

});