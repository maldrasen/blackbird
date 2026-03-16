describe("TrainingState", function() {

  describe('updateTrainingScales()', function() {
    it('updates the anima and animus when the scale levels are increased', function() {
      Random.stubBetween(99,99,99,99,99,99,0); // All crits and a guard.

      const context = TrainingFixtures.standardTrainingContext({},{
        arousal:{ arousal:50 },
        feelings:{ respect:170 },
      });
      const result = SensationResult('get-blowjob',context);
      result.applyFactors();

      const state = TrainingState({ player:context.P, partner:context.T });
      state.updateTrainingScales(result);

      expect(state.getAnima().shame).to.equal(60);
    });
  });

  describe('determineScaleLevel()', function() {
    it('gets the correct training scale level', function() {
      expect(TrainingState.determineScaleLevel(0)).to.equal(0);
      expect(TrainingState.determineScaleLevel(50)).to.equal(0);
      expect(TrainingState.determineScaleLevel(100)).to.equal(1);
      expect(TrainingState.determineScaleLevel(800)).to.equal(2);
      expect(TrainingState.determineScaleLevel(100000)).to.equal(5);
      expect(TrainingState.determineScaleLevel(500000)).to.equal(8);
    });
  });

});