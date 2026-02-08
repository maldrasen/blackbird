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

  sexualPreferences: {
    'cervix-slut':{ chance:25, strength:20 }, // Because of their relatively shallow pussies, halflings have an unusually sensitive cervix.
    'perverted':{ chance:25, strength:-20 }, // Halflings are rural traditionalists and don't like anything too unusual or different.
  },

  body: {
    averageHeight: 900,
    mutability: 50,
    earShape: 'human',
    smellFamily: 'earthy',

    // Because halflings are scaled down they need relatively larger cock and breast
    // sizes so that they don't seem ridiculously small compared to other species.

    breasts: {
      small:   10,
      average: 20,
      big:     60,
      huge:    30,
    },
    cock: {
      cumMultiplier: 0.5,
      size: {
        average: 20,
        big:     50,
        huge:    20,
      },
    },
    pussy: {
      pussyWidth: 90,
      pussyWidthDev: 7,
    }
  },

});
