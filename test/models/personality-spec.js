describe("Personality", function() {

  describe('getArchetype()', function() {
    it('looks at the aspects first', function() {
      const slut = Personality(CharacterFixtures.genericFemale({ aspects:{ slut:1 }}));
      expect(slut.getArchetype()).to.equal(ArchitypeCode.slut);
      const prude = Personality(CharacterFixtures.genericFemale({ aspects:{ prude:1 }}));
      expect(prude.getArchetype()).to.equal(ArchitypeCode.prude);
    });

    it('considers some species', function() {
      const pissMonster = Personality(CharacterFixtures.genericMale({
        actor: { species:'kobold' },
        sexualPreferences: { debaser:30 } }));
      const pissWhore = Personality(CharacterFixtures.genericMale({
        actor: { species:'kobold' },
        sexualPreferences: { 'humiliation-slut':30 } }));

      expect(pissMonster.getArchetype()).to.equal(ArchitypeCode.koboldDom);
      expect(pissWhore.getArchetype()).to.equal(ArchitypeCode.koboldSub);
    })

    it('considers the strength of some sexual preferences', function() {
      const renna = Personality(CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:50 } }));
      const karen = Personality(CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:-50 } }));

      expect(renna.getArchetype()).to.equal(ArchitypeCode.pervert);
      expect(karen.getArchetype()).to.equal(ArchitypeCode.prude);
    });

    it('takes personality factors into consideration', function() {
      const reserved = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:0, violent:0 } }));
      const heartless = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-15, violent:21 } }));
      const serious = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:5, violent:21 } }));
      const timid = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-15, kind:0, violent:-21 } }));
      const playful = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:5, violent:0 } }));
      const brat = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:-5, violent:0 } }));
      const sweet = Personality(CharacterFixtures.genericFemale({personality: {calm: 0, kind: 21, violent: 0}}));
      const bitch = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-21, violent:0 } }));

      expect(reserved.getArchetype()).to.equal(ArchitypeCode.reserved);
      expect(heartless.getArchetype()).to.equal(ArchitypeCode.heartless);
      expect(serious.getArchetype()).to.equal(ArchitypeCode.serious);
      expect(timid.getArchetype()).to.equal(ArchitypeCode.timid);
      expect(playful.getArchetype()).to.equal(ArchitypeCode.playful);
      expect(brat.getArchetype()).to.equal(ArchitypeCode.brat);
      expect(sweet.getArchetype()).to.equal(ArchitypeCode.sweet);
      expect(bitch.getArchetype()).to.equal(ArchitypeCode.bitch);
    });
  });

  describe('attitudeTowardsTraining()', function() {
    it('looks at the consent results for some basic actions', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const personality = Personality(context.T);
      expect(personality.attitudeTowardsTraining()).to.equal(TrainingAttitude.unwilling);
    });
  });

  describe('strongestFetishes()', function() {
    it('gets a list of fetishes ordered by strength', function() {
      const puppy = CharacterFixtures.genericFemale({ sexualPreferences:{
        'enemas': 10,
        'size-queen': 35,
        'gape-queen': 20,
        'piss-slut': 40,
      }});

      const fetishes = Personality(puppy).strongestFetishes(20);

      expect(fetishes.length).to.equal(3);
      expect(fetishes[0].code).to.equal('piss-slut')
      expect(fetishes[1].value).to.equal(35)
      expect(fetishes[2].code).to.equal('gape-queen')
    });
  })

});
