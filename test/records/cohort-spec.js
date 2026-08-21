describe("Cohort", function() {

  describe("getStartText()", function() {
    it("resolves start text for every cohort and ambush state", function() {
      BattleFixtures.prepareForBattle();
      BattleSystem.startBattle({ encounter:'kobold-1', ambushState:'normal' });

      Cohort.getAllCodes().forEach(code => {
        Object.values(AmbushState).forEach(state => {
          const text = Cohort.lookup(code).getStartText(state);
          expect(text).to.be.a('string');
          expect(text.length).to.be.above(0);
        });
      });
    });
  });

});
