describe("Character", function() {

  describe("rollAttributeCheck()", function() {
    it("handles low values", function() {
      const wimpy = Character(CharacterFixtures.genericMale({ attributes:{ strength:1 }}));
      const weakling = Character(CharacterFixtures.genericMale({ attributes:{ strength:2 }}));
      expect(wimpy.rollAttributeCheck(Attrib.strength)).to.equal(1);
      expect(weakling.rollAttributeCheck(Attrib.strength)).to.equal(2);
    });
  });

  describe("rollSkillCheck()", function() {
    it("Rolls the associated attribute when there is no skill", function() {
      Random.stubBetween(5);
      const character = Character(CharacterFixtures.genericMale({ attributes:{ strength:20 }}));
      const check = character.rollSkillCheck('axe');
      expect(check).to.equal(15);
    });

    it("Adds the skill level and skill factor when the skill is present", function() {
      Random.stubBetween(50);
      const character = Character(CharacterFixtures.genericFemale({
        attributes:{ intelligence:100 }, skills:{ magic:100 }
      }));
      expect(character.rollSkillCheck('magic')).to.equal(600);
    });
  });

});