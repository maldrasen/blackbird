describe("SkillCheck", function() {

  it("Rolls the associated attribute when there is no skill", function() {
    Random.stubBetween(50,10);
    const character = CharacterFixtures.genericMale({ attributes:{ strength:20 }});
    expect(SkillCheck(character,'axe').value).to.equal(15);
  });

  it("Multiplies by factor when skill exists", function() {
    Random.stubBetween(50,10);
    let character = CharacterFixtures.genericMale({ attributes:{ dexterity:25 }, skills:{ technique:10 }});
    expect(Math.round(SkillCheck(character,'technique').value)).to.equal(22);

    Random.stubBetween(50,10);
    character = CharacterFixtures.genericMale({ attributes:{ dexterity:25 }, skills:{ technique:50 }});
    expect(Math.round(SkillCheck(character,'technique').value)).to.equal(30);

    Random.stubBetween(50,10);
    character = CharacterFixtures.genericMale({ attributes:{ dexterity:25 }, skills:{ technique:100 }});
    expect(Math.round(SkillCheck(character,'technique').value)).to.equal(40);
  });

  it("Can get pretty big when the skill has a high factor", function() {
    Random.stubBetween(50,75);
    const character = CharacterFixtures.genericFemale({ attributes:{ intelligence:100 }, skills:{ magic:100 }});
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
