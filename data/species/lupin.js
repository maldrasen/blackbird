Species.register('lupin', {
  name: 'Lupin',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },

  attributes: {
    strength: 'B',
    dexterity: 'B',
    vitality: 'B',
    intelligence: 'C',
    beauty: 'C',
  },

  // Lupin personality will be complex, because there's a very big in-group / out-group distinction.
  personalityRanges: {
    openness:[0,40],            // They follow The Way
    conscientiousness:[20,80],  // Moderate
    extraversion:[50,100],      // Pack oriented
    agreeableness:[40,100],     // Agreeable (within their pack)
    neuroticism:[50,90],        // Suspicious of outsiders
  },

  body: {
    averageHeight: 1875,
    skinType: 'fur',
    earShape: 'dog',
    tailShape: 'dog',
    smellFamily: 'earthy',

    mouth: {
      tongueLength: 150,
      tongueLengthDev: 10,
      mouthWidth: 240,
      mouthWidthDev: 20,
    },

    breasts:{
      tiny:    10,
      small:   20,
      average: 50,
      big:     20,
      huge:    10,
    },

    cock: {
      shape: 'dog',
      cumMultiplier: 5,
      size: {
        small:   10,
        average: 40,
        big:     20,
        huge:    5,
      }
    },

    pussy: { shape:'dog' },
  },

});
