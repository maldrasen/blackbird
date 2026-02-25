describe("SkillCheck", function() {

  it("Rolls the associated attribute when there is no skill", function() {
    Random.stubBetween(50);
    Random.stubBetween(10);
    const character = CharacterFixtures.genericMale({ attributes:{ strength:20 }});
    expect(SkillCheck(character,'axe').value).to.equal(15);
  });

  it("Adds the skill level and skill factor when the skill is present", function() {
    Random.stubBetween(50);
    Random.stubBetween(75);
    const character = CharacterFixtures.genericFemale({ attributes:{ intelligence:100 }, skills:{ magic:100 } });
    expect(SkillCheck(character,'magic').value).to.equal(600);
  });

  it("Can crit", function() {
    Random.stubBetween(98);
    const character = CharacterFixtures.genericMale({ attributes:{ strength:20 }});
    const check = SkillCheck(character,'axe');
    expect(check.value).to.equal(20);
    expect(check.crit).to.be.true;
  });

  it("Can fumble", function() {
    Random.stubBetween(3);
    const character = CharacterFixtures.genericMale({ attributes:{ strength:20 }});
    const check = SkillCheck(character,'axe');
    expect(check.value).to.equal(5);
    expect(check.fumble).to.be.true;
  });

});
