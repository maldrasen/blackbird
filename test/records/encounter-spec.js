describe("Encounter", function() {

  describe("getFormation()", function() {
    it("resolves monster codes and empty positions", function() {
      const formation = Encounter.lookup('kobold-2').getFormation();
      expect(formation).to.deep.equal([
        ['kobold-runt','kobold-runt','kobold-dick-puncher','kobold-runt','kobold-runt'],
        [null,'kobold-tosser',null,'kobold-tosser',null],
      ]);
    });
  });

});
