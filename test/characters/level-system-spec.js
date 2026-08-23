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
      Random.stubRollDice(45, 1, 1); // Health, then the equian's two mana pools.

      const id = CharacterFixtures.genericMale({ actor:{ species:'equian' }});
      const start = HealthComponent.lookup(id).maxHealth;
      const increase = LevelSystem.levelUp(id, Attrib.vitality);
      expect(increase).to.equal(8);

      const health = HealthComponent.lookup(id);
      expect(health.maxHealth).to.equal(start + 72);
      expect(health.currentHealth).to.equal(health.maxHealth);
    });

    it("grows the mana pools the species has an affinity for", function() {
      const id = CharacterFixtures.genericMale({ actor:{ species:'elf' }});
      LevelSystem.levelUp(id, Attrib.strength);

      const mana = ManaComponent.lookup(id);
      expect(mana.red.max).to.be.within(2,8);
      expect(mana.green.max).to.be.within(2,8);
      expect(mana.blue.max).to.be.within(2,8);
      expect(mana.black.max).to.be.within(1,4);
      expect(mana.yellow).to.deep.equal({ current:0, max:0 });
    });

    it("adds the growth to both the current and maximum mana", function() {
      const id = CharacterFixtures.genericMale({ actor:{ species:'elf' }, mana:{ red:{ current:3, max:10 } }});
      LevelSystem.levelUp(id, Attrib.strength);

      const mana = ManaComponent.lookup(id);
      expect(mana.red.max).to.be.within(12,18);
      expect(mana.red.max - mana.red.current).to.equal(7);
    });

    it("doesn't grow mana for a human", function() {
      const id = CharacterFixtures.genericMale({ actor:{ species:'human' }});
      LevelSystem.levelUp(id, Attrib.strength);

      const mana = ManaComponent.lookup(id);
      Object.values(Mana).forEach(color => {
        expect(mana[color]).to.deep.equal({ current:0, max:0 });
      });
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

    it("grows a leveled monster's mana pools with each level", function() {
      const id = MonsterFactory('kobold-dick-puncher').build();
      const mana = ManaComponent.lookup(id);
      expect(mana.red.max).to.be.within(10,52);
      expect(mana.blue).to.deep.equal({ current:0, max:0 });
    });
  });

});
