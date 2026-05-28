describe("MonsterFactory", function() {

  describe.only('Building a species based monster', function() {
    it("Uses the CharacterFactory to build the base monster", function() {
      const monster = MonsterFactory.build('deepdark-whisperer');
      const body = BodyComponent.lookup(monster);
      expect(body.scaleColor).to.equal('black');
    });

    it("Adds abilities");
  });

});
