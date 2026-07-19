describe.only("EssenceSystem", function() {

  function buildMonster(attributes) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, attributes);
    MonsterComponent.create(id, { code:'kobold-dick-puncher', threatTable:{}, abilityCooldowns:{} });
    return id;
  }

/*
  describe("monsterEssenceValue()", function() {
    it("computes essence from the attribute total and ability scores", function() {
      const id = buildMonster({ strength:20, dexterity:15, vitality:15, intelligence:10, beauty:10 });
      expect(EssenceSystem.monsterEssenceValue(id)).to.equal(76);
    });

    it("scales superlinearly with the attribute total", function() {
      const id = buildMonster({ strength:40, dexterity:30, vitality:30, intelligence:20, beauty:20 });
      expect(EssenceSystem.monsterEssenceValue(id)).to.equal(215);
    });
  });

  describe("essenceToLevel()", function() {
    it("costs the base amount for a human's first level", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.human)).to.equal(250);
    });

    it("costs superlinearly more for higher levels", function() {
      expect(EssenceSystem.essenceToLevel(2,SpeciesCode.human)).to.equal(616);
    });

    it("costs less for species with lower grade totals", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.kobold)).to.equal(229);
    });

    it("costs more for species with higher grade totals", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.elf)).to.equal(260);
    });
  });

  describe("totalEssenceToLevel()", function() {
    it("sums the individual level costs", function() {
      expect(EssenceSystem.totalEssenceToLevel(3,SpeciesCode.human)).to.equal(1909);
    });
  });

  describe("canLevelUp()", function() {
    it("compares lifetime essence against the next level's cumulative cost", function() {
      const id = Registry.createEntity();
      ActorComponent.create(id, { name:'Essie', gender:Gender.female, species:SpeciesCode.human });
      ExperienceComponent.create(id);

      expect(EssenceSystem.canLevelUp(id)).to.equal(false);

      const experience = ExperienceComponent.lookup(id);
      experience.essence = 250;
      ExperienceComponent.update(id, experience);

      expect(EssenceSystem.canLevelUp(id)).to.equal(true);
    });
  });
*/

});
