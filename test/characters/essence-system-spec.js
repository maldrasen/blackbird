describe("EssenceSystem", function() {

  function buildMonster(attributes) {
    const id = Registry.createEntity();
    AttributesComponent.create(id, attributes);
    MonsterComponent.create(id, { code:'kobold-dick-puncher', threatTable:{}, abilityCooldowns:{} });
    return id;
  }

  describe("monsterEssenceValue()", function() {
    it("computes essence from the attribute total and ability scores", function() {
      const id = buildMonster({ strength:20, dexterity:15, vitality:15, intelligence:10, beauty:10 });
      expect(EssenceSystem.monsterEssenceValue(id)).to.equal(155);
    });

    it("scales superlinearly with the attribute total", function() {
      const id = buildMonster({ strength:40, dexterity:30, vitality:30, intelligence:20, beauty:20 });
      expect(EssenceSystem.monsterEssenceValue(id)).to.equal(437);
    });
  });

  describe("awardBattleEssence()", function() {
    function buildCharacter() {
      const id = Registry.createEntity();
      ActorComponent.create(id, { name:'Essie', gender:Gender.female, species:SpeciesCode.human });
      ExperienceComponent.create(id);
      return id;
    }

    function buildDeadPile() {
      return [
        buildMonster({ strength:20, dexterity:15, vitality:15, intelligence:10, beauty:10 }),
        buildMonster({ strength:40, dexterity:30, vitality:30, intelligence:20, beauty:20 }),
      ];
    }

    it("splits the essence evenly among the survivors, discarding the remainder", function() {
      const survivors = [buildCharacter(), buildCharacter(), buildCharacter()];
      const result = EssenceSystem.awardBattleEssence(buildDeadPile(), survivors);

      expect(result.total).to.equal(592);
      expect(result.share).to.equal(197);
      expect(result.awards[survivors[0]]).to.equal(197);
      survivors.forEach(id => {
        expect(ExperienceComponent.lookup(id).essence).to.equal(197);
      });
    });

    it("gives a single survivor the full total", function() {
      const survivor = buildCharacter();
      const result = EssenceSystem.awardBattleEssence(buildDeadPile(), [survivor]);

      expect(result.share).to.equal(592);
      expect(ExperienceComponent.lookup(survivor).essence).to.equal(592);
    });

    it("awards nothing when the dead pile is empty", function() {
      const survivor = buildCharacter();
      const result = EssenceSystem.awardBattleEssence([], [survivor]);

      expect(result).to.deep.equal({ total:0, share:0, awards:{ [survivor]:0 } });
      expect(ExperienceComponent.lookup(survivor).essence).to.equal(0);
    });

    it("stacks the award on banked essence", function() {
      const survivor = buildCharacter();
      const experience = ExperienceComponent.lookup(survivor);
      experience.essence = 500;
      ExperienceComponent.update(survivor, experience);

      EssenceSystem.awardBattleEssence(buildDeadPile(), [survivor]);
      expect(ExperienceComponent.lookup(survivor).essence).to.equal(1092);
    });
  });

  describe("essenceToLevel()", function() {
    it("costs the base amount for a human's first level", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.human)).to.equal(780);
    });

    it("costs superlinearly more for higher levels", function() {
      expect(EssenceSystem.essenceToLevel(2,SpeciesCode.human)).to.equal(1673);
    });

    it("costs less for species with lower grade totals", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.kobold)).to.equal(733);
    });

    it("costs more for species with higher grade totals", function() {
      expect(EssenceSystem.essenceToLevel(1,SpeciesCode.elf)).to.equal(804);
    });
  });

  describe("totalEssenceToLevel()", function() {
    it("sums the individual level costs", function() {
      expect(EssenceSystem.totalEssenceToLevel(3,SpeciesCode.human)).to.equal(5066);
    });
  });

  describe("canLevelUp()", function() {
    it("compares lifetime essence against the next level's cumulative cost", function() {
      const id = Registry.createEntity();
      ActorComponent.create(id, { name:'Essie', gender:Gender.female, species:SpeciesCode.human });
      ExperienceComponent.create(id);

      expect(EssenceSystem.canLevelUp(id)).to.equal(false);

      const experience = ExperienceComponent.lookup(id);
      experience.essence = 780;
      ExperienceComponent.update(id, experience);

      expect(EssenceSystem.canLevelUp(id)).to.equal(true);
    });
  });

});
