describe("LevelSystem", function() {

  // Humans have a C grade in every attribute, so the grade base is always 3 and an increase rolls between 4 and 8.
  function buildLeveler() {
    const id = Registry.createEntity();
    ActorComponent.create(id, { name:'Ada', gender:Gender.female, species:SpeciesCode.human });
    AttributesComponent.create(id, { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 });
    HealthComponent.create(id, { currentStamina:1000, currentHealth:50, maxHealth:50 });
    ExperienceComponent.create(id);
    return id;
  }

  describe("levelUp()", function() {
    it("raises the attribute by a random amount plus the species grade base", function() {
      const id = buildLeveler();
      const increase = LevelSystem.levelUp(id, Attrib.strength);

      expect(increase).to.be.within(4,8);
      expect(AttributesComponent.lookup(id).strength).to.equal(10 + increase);
    });

    it("increments the experience level", function() {
      const id = buildLeveler();
      LevelSystem.levelUp(id, Attrib.intelligence);

      expect(ExperienceComponent.lookup(id).level).to.equal(1);
    });

    it("grows max and current health when vitality is raised", function() {
      const id = buildLeveler();
      const increase = LevelSystem.levelUp(id, Attrib.vitality);
      const health = HealthComponent.lookup(id);

      expect(health.maxHealth).to.be.within(50 + increase, 50 + (increase * 10));
      expect(health.currentHealth).to.equal(health.maxHealth);
    });
  });

  describe("monster leveling", function() {
    it("levels monsters through the same path", function() {
      const id = MonsterFactory.build('kobold-dick-puncher');
      expect(ExperienceComponent.lookup(id).level).to.equal(5);
    });
  });

});
