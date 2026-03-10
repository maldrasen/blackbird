describe('Archetype', function() {

  describe('getArchetype()', function() {
    it('looks at the aspects first', function() {
      const slut = CharacterFixtures.genericFemale({ aspects:{ slut:1 }});
      const prude = CharacterFixtures.genericFemale({ aspects:{ prude:1 }});

      Archetype.assignArchetype(slut);
      Archetype.assignArchetype(prude);

      expect(Personality(slut).getArchetype()).to.equal(ArchetypeCode.slut);
      expect(Personality(prude).getArchetype()).to.equal(ArchetypeCode.prude);
    });

    it('considers some species', function() {
      const pissMonster = CharacterFixtures.genericMale({ actor: { species:'kobold' }});
      const pissWhore = CharacterFixtures.genericFemale({ actor: { species:'kobold' }});

      Archetype.assignArchetype(pissMonster);
      Archetype.assignArchetype(pissWhore);

      expect(Personality(pissMonster).getArchetype()).to.equal(ArchetypeCode.koboldDom);
      expect(Personality(pissWhore).getArchetype()).to.equal(ArchetypeCode.koboldSub);
    });

    it('considers the strength of some sexual preferences', function() {
      const renna = CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:50 } });
      const karen = CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:-50 } });

      Archetype.assignArchetype(renna);
      Archetype.assignArchetype(karen);

      expect(Personality(renna).getArchetype()).to.equal(ArchetypeCode.pervert);
      expect(Personality(karen).getArchetype()).to.equal(ArchetypeCode.prude);
    });

    it('takes personality factors into consideration', function() {
      const reserved = CharacterFixtures.genericFemale({ personality:{ calm:0, kind:0, violent:0 } });
      const heartless = CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-15, violent:21 } });
      const serious = CharacterFixtures.genericFemale({ personality:{ calm:0, kind:5, violent:21 } });
      const timid = CharacterFixtures.genericFemale({ personality:{ calm:-15, kind:0, violent:-21 } });
      const playful = CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:5, violent:0 } });
      const brat = CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:-5, violent:0 } });
      const sweet = CharacterFixtures.genericFemale({personality: {calm: 0, kind: 21, violent: 0}});
      const bitch = CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-21, violent:0 } });

      Archetype.assignArchetype(reserved);
      Archetype.assignArchetype(heartless);
      Archetype.assignArchetype(serious);
      Archetype.assignArchetype(timid);
      Archetype.assignArchetype(playful);
      Archetype.assignArchetype(brat);
      Archetype.assignArchetype(sweet);
      Archetype.assignArchetype(bitch);

      expect(Personality(reserved).getArchetype()).to.equal(ArchetypeCode.reserved);
      expect(Personality(heartless).getArchetype()).to.equal(ArchetypeCode.heartless);
      expect(Personality(serious).getArchetype()).to.equal(ArchetypeCode.serious);
      expect(Personality(timid).getArchetype()).to.equal(ArchetypeCode.timid);
      expect(Personality(playful).getArchetype()).to.equal(ArchetypeCode.playful);
      expect(Personality(brat).getArchetype()).to.equal(ArchetypeCode.brat);
      expect(Personality(sweet).getArchetype()).to.equal(ArchetypeCode.sweet);
      expect(Personality(bitch).getArchetype()).to.equal(ArchetypeCode.bitch);
    });
  });

});