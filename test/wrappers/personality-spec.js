describe("Personality", function() {

  describe('attitudeTowardsTraining()', function() {
    it('looks at the consent results for some basic actions', function() {
      const context = TrainingFixtures.standardTrainingContext({},{});
      const personality = Personality(context.T);
      expect(personality.attitudeTowardsTraining()).to.equal(TrainingAttitude.unwilling);
    });
  });

  describe('getStrongestFetishes()', function() {
    it('gets a list of fetishes ordered by strength', function() {
      const puppy = CharacterFixtures.genericFemale({ sexualPreferences:{
        'enemas': 10,
        'size-queen': 35,
        'gape-queen': 20,
        'piss-slut': 40,
      }});

      const fetishes = Personality(puppy).getStrongestFetishes(20);

      expect(fetishes.length).to.equal(3);
      expect(fetishes[0].code).to.equal('piss-slut')
      expect(fetishes[1].value).to.equal(35)
      expect(fetishes[2].code).to.equal('gape-queen')
    });
  });

});
