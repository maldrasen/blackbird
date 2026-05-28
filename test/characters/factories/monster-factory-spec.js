describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("Uses the CharacterFactory to build the base monster", function() {
      const monster = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(monster).scaleColor).to.equal('black');
    });

    it("Adds abilities");
  });

});
