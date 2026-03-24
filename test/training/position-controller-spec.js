describe.only("PositionController", function() {
  describe('isPositionAligned()', function() {

    it('for sixty-nine position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'sixty-nine', first:context.T, second:context.P },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('finger-pussy'))).to.be.true;
    });

    it('for prone position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'prone', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-titfuck'))).to.be.true;
    });

    it('for kneeling position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'kneeling', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-blowjob'))).to.be.true;
    });

    it('for standing reversed position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'standing-reversed', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('fondle-breasts'))).to.be.true;
    });

  });
});
