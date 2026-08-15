describe("EssenceSystem", function() {

  // Monsters are built by hand rather than through the MonsterFactory so their attributes are fixed. The factory
  // rolls attributes and levels, which would make every essence value here depend on the seed.
  function buildMonster(code, attributes) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, attributes);
    MonsterComponent.create(id, code);
    return id;
  }

  function buildCharacter(species, experience) {
    const id = CharacterFixtures.genericMale({ actor:{ species:species }});
    if (experience) { ExperienceComponent.update(id, experience); }
    return id;
  }

  describe("monsterEssenceValue()", function() {
    const attributes = { strength:20, dexterity:15, vitality:15, intelligence:10, beauty:10 };

    it("combines the monster's attribute total with its ability scores", function() {
      expect(EssenceSystem.monsterEssenceValue(buildMonster('kobold-dick-puncher', attributes))).to.equal(169);
    });

    it("scales superlinearly with the attribute total", function() {
      const doubled = { strength:40, dexterity:30, vitality:30, intelligence:20, beauty:20 };
      expect(EssenceSystem.monsterEssenceValue(buildMonster('kobold-dick-puncher', doubled))).to.equal(477);
    });

    // The runt has no abilities of its own, so it's worth much less than the puncher despite identical attributes.
    it("counts the abilities the base monster adds to its type", function() {
      expect(EssenceSystem.monsterEssenceValue(buildMonster('kobold-runt', attributes))).to.equal(84);
    });
  });

  describe("essenceToLevel()", function() {
    it("costs nothing to be level one", function() {
      expect(EssenceSystem.essenceToLevel(buildCharacter(SpeciesCode.human))).to.equal(0);
    });

    it("looks ahead when given levels to add", function() {
      const id = buildCharacter(SpeciesCode.human);
      expect(EssenceSystem.essenceToLevel(id, 1)).to.equal(780);
      expect(EssenceSystem.essenceToLevel(id, 2)).to.equal(2453);
    });

    it("sums the cost of every level a character has already earned", function() {
      const id = buildCharacter(SpeciesCode.human, { level:3, essence:2453 });
      expect(EssenceSystem.essenceToLevel(id)).to.equal(2453);
      expect(EssenceSystem.essenceToLevel(id, 1)).to.equal(5066);
    });

    it("costs less for a species with lower attribute grades", function() {
      expect(EssenceSystem.essenceToLevel(buildCharacter(SpeciesCode.kobold), 1)).to.equal(733);
    });

    it("costs more for a species with higher attribute grades", function() {
      expect(EssenceSystem.essenceToLevel(buildCharacter(SpeciesCode.equian), 1)).to.equal(871);
    });
  });

  describe("canLevelUp()", function() {
    it("is false while banked essence falls short of the next level", function() {
      expect(EssenceSystem.canLevelUp(buildCharacter(SpeciesCode.human, { level:1, essence:779 }))).to.equal(false);
    });

    it("is true once banked essence covers the next level", function() {
      expect(EssenceSystem.canLevelUp(buildCharacter(SpeciesCode.human, { level:1, essence:780 }))).to.equal(true);
    });

    it("measures against the next level, not the ones already paid for", function() {
      const id = buildCharacter(SpeciesCode.human, { level:3, essence:5065 });
      expect(EssenceSystem.canLevelUp(id)).to.equal(false);

      ExperienceComponent.update(id, { level:3, essence:5066 });
      expect(EssenceSystem.canLevelUp(id)).to.equal(true);
    });
  });

});
