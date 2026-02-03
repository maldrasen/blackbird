Species.register('halfling', {
  name: 'Halfling',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:60, gay:20, bi:20, ace:5 },

  attributes: {
    strength: 'D',
    dexterity: 'B',
    vitality: 'D',
    intelligence: 'B',
    beauty: 'B',
  },

  personalityRanges: {
    openness:[0,40],            // Rural traditionalists.
    conscientiousness:[50,90],  // Hardworking
    extraversion:[10,50],       // Small tight knit communities
    agreeableness:[50,90],      // Friendly
    neuroticism:[0,40],         // Easy going and brave.
  },

  body: {
    tits:{ size:{
      tiny:    5,
      small:   10,
      average: 20,
      big:     60,
      huge:    10,
    }},

    cock:{ size:{
      small:   10,
      average: 60,
      big:     30,
    }},
  },

});
