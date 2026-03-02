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

  describe('determineScaleLevel()', function() {
    it('gets the correct training scale level', function() {
      expect(TrainingController.determineScaleLevel(0)).to.equal(0);
      expect(TrainingController.determineScaleLevel(50)).to.equal(0);
      expect(TrainingController.determineScaleLevel(100)).to.equal(1);
      expect(TrainingController.determineScaleLevel(800)).to.equal(2);
      expect(TrainingController.determineScaleLevel(100000)).to.equal(5);
      expect(TrainingController.determineScaleLevel(500000)).to.equal(8);
    });
  });

  describe('updateArousal() and updateStamina()', function() {
    it('updates the arousal level for both the player and the partner', function() {
      Random.stubBetween(99,99,99,99,99,0); // All crits and a guard.

      const context = TrainingFixtures.standardTrainingContext(
        { health:{ currentStamina:100 }, arousal:{ arousal:80 }, skills:{ technique:40 } },
        { health:{ currentStamina:20 }, arousal:{ arousal:20 }, feelings:{ affection:200, respect:200 }, preferences:{ 'anal-slut':75 },
      });

      const result = SensationResult('finger-anus',context);
      result.applyFactors();

      TrainingController.start({ player:context.P, partner:context.T });
      TrainingController.updateArousal(result);
      TrainingController.updateStamina(result);

      expect(Math.round(ArousalComponent.lookup(context.P).arousal)).to.equal(48);
      expect(Math.round(ArousalComponent.lookup(context.T).arousal)).to.equal(24);
      expect(HealthComponent.lookup(context.P).currentStamina).to.equal(60);
      expect(HealthComponent.lookup(context.T).currentStamina).to.equal(0);
    });
  });

});