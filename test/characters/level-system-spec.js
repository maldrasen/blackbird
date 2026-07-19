describe("LevelSystem", function() {

  describe("levelUp()", function() {

    it("raises the attribute by a random amount plus the species grade base", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      const start = AttributesComponent.lookup(id).strength;
      const increase = LevelSystem.levelUp(id, Attrib.strength);

      expect(increase).to.be.within(4,8);
      expect(AttributesComponent.lookup(id).strength).to.equal(start + increase);
    });

    it("increments the experience level", function() {
      const id = CharacterFixtures.genericMale({});
      LevelSystem.levelUp(id, Attrib.intelligence);
      expect(ExperienceComponent.lookup(id).level).to.equal(1);
    });

    it("floors essence at the minimum for the new level", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      LevelSystem.levelUp(id, Attrib.strength);
      expect(ExperienceComponent.lookup(id).essence).to.equal(780);
    });

    it("leaves essence alone when it already covers the new level", function() {
      const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
      ExperienceComponent.update(id, { level:0, essence:1000 });
      LevelSystem.levelUp(id, Attrib.strength);
      expect(ExperienceComponent.lookup(id).essence).to.equal(1000);
    });

    it("grows max and current health when vitality is raised", function() {
      const id = CharacterFixtures.genericMale({ actor:{ species:'equian' }});
      const start = HealthComponent.lookup(id).maxHealth;
      LevelSystem.levelUp(id, Attrib.vitality);

      const health = HealthComponent.lookup(id);
      expect(health.maxHealth).to.be.within(start+28, start+117);
      expect(health.currentHealth).to.equal(health.maxHealth);
    });
  });

  describe("monster leveling", function() {
    it("levels monsters through the same path", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      expect(ExperienceComponent.lookup(id).level).to.equal(5);
    });

    it("seeds leveled monsters with the minimum essence for their level", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      expect(ExperienceComponent.lookup(id).essence).to.equal(12424);
    });
  });

});
