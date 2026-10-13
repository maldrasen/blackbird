describe("Cohort", function() {

  describe("getStartText()", function() {
    it("resolves start text for every cohort and ambush state", function() {
      BattleSupport.startBattle();

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
