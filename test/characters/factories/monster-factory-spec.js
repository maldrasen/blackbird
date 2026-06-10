describe("MonsterFactory", function() {

  describe('Building a species based monster', function() {
    it("uses the CharacterFactory to build the base monster", function() {
      const id = MonsterFactory.build('deepdark-whisperer');
      expect(BodyComponent.lookup(id).scaleColor).to.equal('black');
    });

    it("adds attacks", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      const monster = MonsterComponent.lookup(id);
      expect(monster.basicAttack.base).to.equal('hammer');
    });

    it("adds abilities");
  });

});
