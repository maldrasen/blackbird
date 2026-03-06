describe("Personality", function() {

  describe('getArchetype()', function() {
    it('looks at the aspects first', function() {
      const slut = Personality(CharacterFixtures.genericFemale({ aspects:{ slut:1 }}));
      expect(slut.getArchetype()).to.equal(Architype.slut);
      const prude = Personality(CharacterFixtures.genericFemale({ aspects:{ prude:1 }}));
      expect(prude.getArchetype()).to.equal(Architype.prude);
    });

    it('considers some species', function() {
      const pissMonster = Personality(CharacterFixtures.genericMale({
        actor: { species:'kobold' },
        sexualPreferences: { debaser:30 } }));
      const pissWhore = Personality(CharacterFixtures.genericMale({
        actor: { species:'kobold' },
        sexualPreferences: { 'humiliation-slut':30 } }));

      expect(pissMonster.getArchetype()).to.equal(Architype.koboldDom);
      expect(pissWhore.getArchetype()).to.equal(Architype.koboldSub);
    })

    it('considers the strength of some sexual preferences', function() {
      const renna = Personality(CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:50 } }));
      const karen = Personality(CharacterFixtures.genericFemale({
        personality:{ calm:20, kind:-30, violent:-30 },
        sexualPreferences: { perverted:-50 } }));

      expect(renna.getArchetype()).to.equal(Architype.pervert);
      expect(karen.getArchetype()).to.equal(Architype.prude);
    });

    it('takes personality factors into consideration', function() {
      const reserved = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:0, violent:0 } }));
      const heartless = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-5, violent:21 } }));
      const serious = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:5, violent:21 } }));
      const timid = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-5, kind:0, violent:-21 } }));
      const playful = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:5, violent:0 } }));
      const brat = Personality(CharacterFixtures.genericFemale({ personality:{ calm:-21, kind:-5, violent:0 } }));
      const sweet = Personality(CharacterFixtures.genericFemale({personality: {calm: 0, kind: 21, violent: 0}}));
      const bitch = Personality(CharacterFixtures.genericFemale({ personality:{ calm:0, kind:-21, violent:0 } }));

      expect(reserved.getArchetype()).to.equal(Architype.reserved);
      expect(heartless.getArchetype()).to.equal(Architype.heartless);
      expect(serious.getArchetype()).to.equal(Architype.serious);
      expect(timid.getArchetype()).to.equal(Architype.timid);
      expect(playful.getArchetype()).to.equal(Architype.playful);
      expect(brat.getArchetype()).to.equal(Architype.brat);
      expect(sweet.getArchetype()).to.equal(Architype.sweet);
      expect(bitch.getArchetype()).to.equal(Architype.bitch);
    });
  });

  describe('attitudeTowardsTraining()', function() {
    it('looks at the consent results for some basic actions', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const personality = Personality(context.T);
      expect(personality.attitudeTowardsTraining()).to.equal(TrainingAttitude.unwilling);
    });
  });

});
