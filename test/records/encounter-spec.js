describe("Encounter", function() {

  describe("getStartText()", function() {
    it("returns null for an encounter without start text", function() {
      Object.values(AmbushState).forEach(state => {
        expect(Encounter.lookup('battle-fixture-1').getStartText(state)).to.be.null;
      });
    });
  });

});
