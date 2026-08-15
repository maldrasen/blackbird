describe("LevelSystem", function() {

  describe("levelUp()", function() {

    it("raises the attribute by a random amount plus the species grade base and gender bonus", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      const start = AttributesComponent.lookup(id).strength;
      const increase = LevelSystem.levelUp(id, Attrib.strength);

      expect(increase).to.be.within(5,9);
      expect(AttributesComponent.lookup(id).strength).to.equal(start + increase);
    });

    it("applies attribute aspects when their attribute is raised", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }, aspects: { strong:1 }});
      const increase = LevelSystem.levelUp(id, Attrib.strength);
      expect(increase).to.be.within(7,11);
    });

    it("increments the experience level", function() {
      const id = CharacterFixtures.genericMale({});
      LevelSystem.levelUp(id, Attrib.intelligence);
      expect(ExperienceComponent.lookup(id).level).to.equal(2);
    });

    it("floors essence at the minimum for the new level", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      LevelSystem.levelUp(id, Attrib.strength);
      expect(ExperienceComponent.lookup(id).essence).to.equal(780);
    });

    it("leaves essence alone when it already covers the new level", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      ExperienceComponent.update(id, { level:1, essence:1000 });
      LevelSystem.levelUp(id, Attrib.strength);
      expect(ExperienceComponent.lookup(id).essence).to.equal(1000);
    });

    it("grows max and current health when vitality is raised", function() {
      Random.stubBetween(3);
      Random.stubRollDice(45);

      const id = CharacterFixtures.genericMale({ actor:{ species:'equian' }});
      const start = HealthComponent.lookup(id).maxHealth;
      const increase = LevelSystem.levelUp(id, Attrib.vitality);
      expect(increase).to.equal(8);

      const health = HealthComponent.lookup(id);
      expect(health.maxHealth).to.equal(start + 72);
      expect(health.currentHealth).to.equal(health.maxHealth);
    });
  });

  describe("monster leveling", function() {
    it("levels monsters through the same path", function() {
      const id = MonsterFactory('kobold-dick-puncher').build();
      expect(ExperienceComponent.lookup(id).level).to.equal(5);
    });

    it("seeds leveled monsters with the minimum essence for their level", function() {
      const id = MonsterFactory('kobold-dick-puncher').build();
      expect(ExperienceComponent.lookup(id).essence).to.equal(8122);
    });
  });

});
