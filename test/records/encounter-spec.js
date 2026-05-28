describe("Encounter", function() {

  describe("buildFormation()", function() {
    it("picks from a single monster code", function() {
      Random.stubRoll(10,90);
      const rank = Encounter.lookup('kobold-1').buildFormation()[0];
      expect(rank).to.deep.equal([null,'kobold-runt','kobold-runt','kobold-runt','kobold-runt',null,null]);
    });

    it("picks from a monster code map", function() {
      Random.stubRoll(0,5,25,0,25,5);
      const rank = Encounter.lookup('kobold-4').buildFormation()[1];
      expect(rank).to.deep.equal([null,null,'kobold-sneak-slut','kobold-tosser','kobold-tosser',null,null])
    });
  });

});
