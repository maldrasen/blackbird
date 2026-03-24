describe("PositionController", function() {

  describe('isPositionAligned()', function() {
    it('for sixty-nine position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'sixty-nine', first:context.T, second:context.P },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('finger-pussy'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('kiss'))).to.be.false;
    });

    it('for prone position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'prone', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-titfuck'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('frottage'))).to.be.false;
    });

    it('for kneeling position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'kneeling', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-blowjob'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('get-rimming'))).to.be.false;
    });

    it('for standing reversed position', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'standing-reversed', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('fondle-breasts'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('get-blowjob'))).to.be.false;
    });
  });

  describe('findAlignedPosition()', function() {
    it('gets an aligned position from the possible moves', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'standing', first:context.P, second:context.T },
      });

      expect(PositionController.findAlignedPosition(SexAction.lookup('get-blowjob')).code).to.equal('kneeling');
    });
  });

});
