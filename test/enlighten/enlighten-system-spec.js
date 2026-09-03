describe("EnlightenSystem", function() {

  // Elf essence costs: 804 total to reach level 2, 2526 total to reach level 3.

  function buildCharacter(essence=0) {
    const id = CharacterFixtures.genericMale({});
    ExperienceComponent.update(id, { level:1, essence:essence });
    return id;
  }

  function startBattleEnlightenment(party, totalEssence, loot=[]) {
    const configuration = {};
    party.forEach((id,index) => { configuration[id] = `p-${index}`; });
    GameSystem.getState().setPartyConfiguration(configuration);

    EnlightenSystem.startEnlightenment('battle', { totalEssence, skillImprovements:{}, revived:[], loot });
  }

  describe("startEnlightenment()", function() {
    it("splits the battle essence between the party and banks it", function() {
      const first = buildCharacter(100);
      const second = buildCharacter(200);

      startBattleEnlightenment([first,second], 1001);

      const essence = EnlightenSystem.getState().getEssence();
      expect(essence[first]).to.deep.equal({ start:100, end:600 });
      expect(essence[second]).to.deep.equal({ start:200, end:700 });
      expect(ExperienceComponent.lookup(first).essence).to.equal(600);
      expect(ExperienceComponent.lookup(second).essence).to.equal(700);
    });

    it("banks the loot in the player's inventory", function() {
      Article.register('spec-enlighten-bauble', { name:'Spec Bauble', category:InventoryCategory.valuables });
      const player = CharacterFixtures.randomPlayer();

      startBattleEnlightenment([player], 0, [{ articleCode:'spec-enlighten-bauble', quantity:3 }]);

      expect(InventoryManager(player).getArticleQuantity('spec-enlighten-bauble')).to.equal(3);
      expect(EnlightenSystem.getState().getLoot()).to.deep.equal([{ articleCode:'spec-enlighten-bauble', quantity:3 }]);
    });

    it("banks no essence when enlightenment comes from training", function() {
      const partner = buildCharacter(100);

      EnlightenSystem.startEnlightenment('training', {
        partner,
        anima: { fire:5 },
        animus: { submission:3 },
        anger: 1,
        skillImprovements: {},
      });

      expect(EnlightenSystem.getState().getEssence()).to.deep.equal({});
      expect(ExperienceComponent.lookup(partner).essence).to.equal(100);
    });
  });

  describe("levelUpAttribute()", function() {
    it("levels a character through the LevelSystem", function() {
      const id = buildCharacter();
      startBattleEnlightenment([id], 804);

      const start = AttributesComponent.lookup(id).strength;
      const increase = EnlightenSystem.levelUpAttribute(id, Attrib.strength);

      expect(increase).to.be.at.least(1);
      expect(AttributesComponent.lookup(id).strength).to.equal(start + increase);
      expect(ExperienceComponent.lookup(id).level).to.equal(2);
    });

    it("levels a character multiple times when they have the essence", function() {
      const id = buildCharacter();
      startBattleEnlightenment([id], 2526);

      EnlightenSystem.levelUpAttribute(id, Attrib.strength);
      EnlightenSystem.levelUpAttribute(id, Attrib.dexterity);

      expect(ExperienceComponent.lookup(id).level).to.equal(3);
      expect(() => EnlightenSystem.levelUpAttribute(id, Attrib.vitality)).to.throw('essence needed');
    });

    it("throws when the character lacks the essence to level", function() {
      const id = buildCharacter();
      startBattleEnlightenment([id], 803);

      expect(() => EnlightenSystem.levelUpAttribute(id, Attrib.strength)).to.throw('essence needed');
    });
  });

});
