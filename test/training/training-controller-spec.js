describe("TrainingController", function() {

  describe('updateArousal() and updateStamina()', function() {
    it('updates the arousal level for both the player and the partner', function() {
      Random.stubBetween(99,99,99,99,99,0); // All crits and a guard.

      const state = TrainingFixtures.standardTrainingState(
        { health:{ currentStamina:100 }, arousal:{ arousal:80 }, skills:{ technique:40 } },
        { health:{ currentStamina:20 }, arousal:{ arousal:20 }, feelings:{ affection:200, respect:200 }, preferences:{ 'anal-slut':75 },
      });

      const context = state.getContext();
      const result = SensationResult.build('finger-anus',state);

      TrainingController.startTraining({ player:context.P, partner:context.T });
      TrainingController.updateArousal(result);
      TrainingController.updateStamina(result);

      const playerArousal = ArousalComponent.lookup(context.P)
      const partnerArousal = ArousalComponent.lookup(context.T)

      expect(Math.round(playerArousal.arousal)).to.be.greaterThan(50);
      expect(Math.round(partnerArousal.arousal)).to.be.greaterThan(25);
      expect(Math.round(partnerArousal.pleasure)).to.equal(60);
      expect(HealthComponent.lookup(context.P).currentStamina).to.equal(60);
      expect(HealthComponent.lookup(context.T).currentStamina).to.equal(0);
    });
  });

});
