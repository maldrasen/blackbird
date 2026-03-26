describe("PositionController", function() {

  describe('isPositionAligned()', function() {
    it('for sixty-nine position', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'sixty-nine', first:context.T, second:context.P },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('finger-pussy'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('kiss'))).to.be.false;
    });

    it('for prone position', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'prone', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-titfuck'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('frottage'))).to.be.false;
    });

    it('for kneeling position', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'kneeling', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('get-blowjob'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('get-rimming'))).to.be.false;
    });

    it('for standing reversed position', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'standing-reversed', first:context.P, second:context.T },
      });

      expect(PositionController.isPositionAligned(SexAction.lookup('fondle-breasts'))).to.be.true;
      expect(PositionController.isPositionAligned(SexAction.lookup('get-blowjob'))).to.be.false;
    });
  });

  describe('findAlignedPosition()', function() {
    it('when characters will remain in the same roles', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'standing', first:context.P, second:context.T },
      });

      expect(PositionController.findAlignedPosition(SexAction.lookup('get-blowjob')).code).to.equal('kneeling');
    });

    it('when characters will need to swap roles', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'cowgirl', first:context.P, second:context.T },
      });

      expect(PositionController.findAlignedPosition(SexAction.lookup('suck-pussy')).code).to.equal('face-sitting');
    });

    it('when no move is possible', function() {
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'cowgirl', first:context.T, second:context.P },
      });

      expect(PositionController.findAlignedPosition(SexAction.lookup('suck-pussy'))).to.be.null;
    });
  });

  describe('shiftPosition()', function() {
    it("Updates the training state", function(){
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T,
        position: { code:'cowgirl', first:context.P, second:context.T },
      });

      const sexAction = SexAction.lookup('suck-pussy');
      PositionController.shiftPosition(sexAction, PositionController.findAlignedPosition(sexAction));

      const state = TrainingController.getState();
      expect(state.getMessages()['shift-position']).to.not.be.null;
      expect(state.getPosition().getName()).to.equal('Face Sitting');
      expect(state.getPositionContext().A).to.equal(context.T);
      expect(state.getPositionContext().B).to.equal(context.P);
    });
  });

  describe('changePosition()', function() {
    it("Updates the training state", function(){
      const context = TrainingFixtures.standardTrainingState({}).getContext();

      TrainingController.startTraining({ player:context.P, partner:context.T });
      PositionController.changePosition(SexAction.lookup('give-titfuck'));

      const state = TrainingController.getState();
      expect(state.getMessages()['change-position']).to.not.be.null;
      expect(state.getPosition().getCode()).to.be.oneOf(['kneeling','prone']);
      expect(state.getPositionContext().A).to.equal(context.T);
      expect(state.getPositionContext().B).to.equal(context.P);
    });
  });

});
