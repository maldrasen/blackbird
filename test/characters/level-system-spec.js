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
      expect(health.maxHealth).to.be.within(start+28, start+128);
      expect(health.currentHealth).to.equal(health.maxHealth);
    });
  });

  describe("buildAttributes()", function() {
    it("rolls each attribute from the baseline plus a single creation increase", function() {
      const attributes = LevelSystem.buildAttributes({ species:'human', gender:Gender.female }, {});
      expect(attributes.strength).to.be.within(9,13);
      expect(attributes.beauty).to.be.within(10,14);
    });

    it("applies the male strength bonus", function() {
      const attributes = LevelSystem.buildAttributes({ species:'human', gender:Gender.male }, {});
      expect(attributes.strength).to.be.within(10,14);
      expect(attributes.beauty).to.be.within(9,13);
    });

    it("applies attribute aspect modifiers", function() {
      const attributes = LevelSystem.buildAttributes({ species:'human', gender:Gender.female }, { strong:1, sickly:1 });
      expect(attributes.strength).to.be.within(11,15);
      expect(attributes.vitality).to.be.within(7,11);
    });
  });

  describe("buildHealth()", function() {
    it("rolls health from vitality and the species health factor", function() {
      const attributes = { strength:10, dexterity:10, vitality:10, intelligence:10, beauty:10 };
      const health = LevelSystem.buildHealth(attributes, 2.0);

      expect(health.maxHealth).to.be.within(20,200);
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
