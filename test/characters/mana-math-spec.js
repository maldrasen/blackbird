describe("ManaMath", function() {

  describe("manaGrades()", function() {
    it("reads the grades from the character's species", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:SpeciesCode.elf }});
      const grades = ManaMath.manaGrades(id);
      expect(grades.red).to.equal('C');
      expect(grades.yellow).to.equal('F');
    });

    it("gives a human no grades at all", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:SpeciesCode.human }});
      expect(ManaMath.manaGrades(id)).to.deep.equal({});
    });

    it("gives a beast no grades at all", function() {
      const id = MonsterFactory('lesser-daggermaw').build();
      expect(ManaMath.manaGrades(id)).to.deep.equal({});
    });
  });

  describe("startingPool()", function() {
    it("rolls nothing for an F or a missing grade", function() {
      expect(ManaMath.startingPool('F')).to.equal(0);
      expect(ManaMath.startingPool(undefined)).to.equal(0);
    });

    it("rolls a d10 for every die the grade is worth", function() {
      expect(ManaMath.startingPool('D')).to.be.within(1,10);
      expect(ManaMath.startingPool('C')).to.be.within(2,20);
    });
  });

  describe("levelGrowth()", function() {
    it("rolls nothing for an F or a missing grade", function() {
      expect(ManaMath.levelGrowth('F')).to.equal(0);
      expect(ManaMath.levelGrowth(undefined)).to.equal(0);
    });

    it("rolls a d4 for every die the grade is worth", function() {
      expect(ManaMath.levelGrowth('D')).to.be.within(1,4);
      expect(ManaMath.levelGrowth('C')).to.be.within(2,8);
    });
  });

});
