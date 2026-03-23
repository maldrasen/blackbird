describe("PositionController", function() {

  describe('checkPosition()', function() {
    it('when position is compatible', function() {
      const state = TrainingFixtures.standardTrainingState({});
      const context = state.getContext();
      TrainingController.startTraining({ player:context.P, partner:context.T });
      PositionController.checkPosition(SexAction.lookup('fondle-breasts'));
    });
  });

});
