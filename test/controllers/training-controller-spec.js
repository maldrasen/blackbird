describe("TrainingController", function() {

  describe('updateTrainingScales()', function() {
    it('updates the anima and animus when the scale levels are increased', function() {
      Random.stubBetween(99,99,99,99,99,99,0); // All crits and a guard.

      const context = TrainingFixtures.standardTrainingContext({},{
        arousal:{ arousal:50 },
        feelings:{ respect:170 },
      });
      const result = SensationResult('get-blowjob',context);
      result.applyFactors();

      TrainingController.start({ player:context.P, partner:context.T });
      TrainingController.updateTrainingScales(result);

      expect(TrainingController.getAnima().shame).to.equal(60);
    });
  });


  describe('determineLevel()', function() {
    it('gets the correct training scale level', function() {
      expect(TrainingController.determineLevel(0)).to.equal(0);
      expect(TrainingController.determineLevel(50)).to.equal(0);
      expect(TrainingController.determineLevel(100)).to.equal(1);
      expect(TrainingController.determineLevel(800)).to.equal(2);
      expect(TrainingController.determineLevel(100000)).to.equal(5);
      expect(TrainingController.determineLevel(500000)).to.equal(8);
    });
  });

});