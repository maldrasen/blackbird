describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("adds attacks", function() {
      const id = MonsterFactory.build('kobold-runt');
      const monster = MonsterComponent.lookup(id);

      console.log(monster);
    });

    it("adds abilities");
  });

});
