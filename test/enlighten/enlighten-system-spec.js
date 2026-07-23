describe("EnlightenSystem", function() {

  /*

And Changing All this

  function buildCharacter(essence=0) {
    const id = CharacterFixtures.genericMale({ actor: { species:'human' }});
    ExperienceComponent.update(id, { level:0, essence:essence });
    return id;
  }

  describe("startEnlightenment()", function() {
    it("exposes the battle payload", function() {
      const party = [buildCharacter(), buildCharacter()];
      const essenceAwards = { total:592, share:296, awards:{ [party[0]]:296, [party[1]]:296 } };

      EnlightenSystem.startEnlightenment('battle', {
        skillImprovements: { [party[0]]: { blades:2 } },
        essenceAwards,
        party,
      });

      const state = EnlightenSystem.getState();
      expect(state.getFrom()).to.equal('battle');
      expect(state.getEssenceAwards()).to.deep.equal(essenceAwards);
      expect(state.getLevelUpQueue()).to.deep.equal(party);
      expect(state.getSkillImprovements()[party[0]].blades).to.equal(2);
      expect(state.getRevived()).to.deep.equal([]);
    });

    it("exposes the characters revived after the battle", function() {
      const party = [buildCharacter(), buildCharacter()];

      EnlightenSystem.startEnlightenment('battle', { party, revived:[party[1]] });

      const state = EnlightenSystem.getState();
      expect(state.getRevived()).to.deep.equal([party[1]]);
      expect(state.getLevelUpQueue()).to.deep.equal(party);
    });

    it("leaves the training branch unchanged", function() {
      const partner = buildCharacter();
      EnlightenSystem.startEnlightenment('training', {
        partner,
        anima: { fire:5 },
        animus: { submission:3 },
        anger: 1,
        skillImprovements: {},
      });

      const state = EnlightenSystem.getState();
      expect(state.getFrom()).to.equal('training');
      expect(state.getPartner()).to.equal(partner);
      expect(state.getAnima()).to.deep.equal({ fire:5 });
      expect(state.getEssenceAwards()).to.equal(null);
      expect(state.getLevelUpQueue()).to.deep.equal([]);
      expect(EnlightenSystem.hasPendingLevelUps()).to.equal(false);
    });
  });

  describe("level up queue", function() {
    it("walks the queue in order, keeping a character current until their essence is spent", function() {
      const twice = buildCharacter(2453);
      const once = buildCharacter(780);
      EnlightenSystem.startEnlightenment('battle', { party:[twice,once] });

      expect(EnlightenSystem.getCurrentLevelUp()).to.equal(twice);
      expect(EnlightenSystem.chooseLevelUpAttribute(Attrib.strength).id).to.equal(twice);
      expect(EnlightenSystem.getCurrentLevelUp()).to.equal(twice);

      expect(EnlightenSystem.chooseLevelUpAttribute(Attrib.strength).level).to.equal(2);
      expect(EnlightenSystem.getCurrentLevelUp()).to.equal(once);

      EnlightenSystem.chooseLevelUpAttribute(Attrib.intelligence);
      expect(EnlightenSystem.getCurrentLevelUp()).to.equal(null);
      expect(EnlightenSystem.hasPendingLevelUps()).to.equal(false);
    });

    it("skips characters that cannot level", function() {
      const broke = buildCharacter();
      const eligible = buildCharacter(780);
      EnlightenSystem.startEnlightenment('battle', { party:[broke,eligible] });

      expect(EnlightenSystem.getCurrentLevelUp()).to.equal(eligible);
    });

    it("throws when no character is waiting to level", function() {
      EnlightenSystem.startEnlightenment('battle', { party:[buildCharacter()] });
      expect(() => EnlightenSystem.chooseLevelUpAttribute(Attrib.strength)).to.throw('waiting to level');
    });

    it("levels through the LevelSystem", function() {
      const id = buildCharacter(780);
      EnlightenSystem.startEnlightenment('battle', { party:[id] });

      const start = AttributesComponent.lookup(id).strength;
      const result = EnlightenSystem.chooseLevelUpAttribute(Attrib.strength);

      expect(result.increase).to.be.within(5,9);
      expect(result.level).to.equal(1);
      expect(AttributesComponent.lookup(id).strength).to.equal(start + result.increase);
      expect(ExperienceComponent.lookup(id).level).to.equal(1);
    });
  });

   */

});
