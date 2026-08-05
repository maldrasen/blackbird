describe("NegotiationQuestion", function() {

  // The player fixture is a male human, so the hasCock('P') answer stays and the hasNoCock('P') answer filters out.
  describe("getAnswers()", function() {
    it('filters out answers whose requirements fail', function() {
      BattleFixtures.prepareForBattle();
      const context = { P:GameSystem.getState().getPlayer() };

      const answers = NegotiationQuestion.lookup('how-do-you-murder').getAnswers(context);
      expect(Object.keys(answers)).to.deep.equal(['never','unknown','cruel','cock']);
    });

    it('keeps every answer when none carry requirements', function() {
      const answers = NegotiationQuestion.lookup('what-is-best').getAnswers({});
      expect(Object.keys(answers)).to.deep.equal(['bullshit','conan','comfort','cock']);
    });
  });

});
