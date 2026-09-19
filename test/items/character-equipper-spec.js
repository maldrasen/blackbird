describe('CharacterEquipper', function() {

  describe('assignSkills()', function() {

    // The sword is built and the equipper is made before the roll is stubbed because building an item rolls for its
    // materials.
    function swordsmanAt(level, skills={}) {
      const id = CharacterFixtures.genericMale({ skills });
      ExperienceComponent.update(id, { level:level, essence:1000000 });
      ItemFixtures.equip(id, 'longsword', ['steel']);
      return id;
    }

    it('gives an untrained character the minimum skill with their weapon', function() {
      const id = swordsmanAt(1);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(1);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(11);
    });

    // A stubbed roll throws when it's outside of the rolled range, so a 9 only passes if the limit was 2 * level.
    it('rolls a higher minimum for a higher level character', function() {
      const id = swordsmanAt(5);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(19);
    });

    it('leaves a skill alone when it already beats the rolled minimum', function() {
      const id = swordsmanAt(5, { swords:30 });
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(30);
    });

    it('raises a trained skill that falls short of the rolled minimum', function() {
      const id = swordsmanAt(5, { swords:12 });
      const equipper = CharacterEquipper(id);

      Random.stubRoll(9);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(19);
    });

    it('covers the off-hand as well', function() {
      const id = swordsmanAt(1);
      ItemFixtures.equip(id, 'round-shield', ['steel']);
      const equipper = CharacterEquipper(id);

      Random.stubRoll(0, 1);
      equipper.assignSkills();

      expect(SkillsComponent.lookup(id).swords).to.equal(10);
      expect(SkillsComponent.lookup(id).block).to.equal(11);
    });
  });

});
