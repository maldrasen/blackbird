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

  // Lupins all have some degree of urethra sensitivity.
  sensitivities: {
    cock:     { Z:0,   F:1,   D:5,  C:100, B:40, A:15 },
    clit:     { Z:0,   F:1,   D:5,  C:100, B:40, A:15 },
    pussy:    { Z:0,   F:5,   D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:10,  D:30, C:100, B:20, A:5  },
    prostate: { Z:0,   F:10,  D:30, C:100, B:20, A:5  },
    nipple:   { Z:0,   F:10,  D:30, C:50,  B:5,  A:1  },
    oral:     { Z:100, F:5,   D:1,  C:0,   B:0,  A:0  },
    urethra:  { Z:0,   F:100, D:10, C:1,   B:0,  A:0  },
    cervix:   { Z:100, F:10,  D:5,  C:1,   B:0,  A:0  },
  },

  sexualPreferences: {
    'pisser': { chance:20, strength:30 },
    'piss-slut': { chance:10, strength:20 },
    'beast-lover':{ chance:90, strength:20 },
    'orgy-lover':{ chance:50, strength:20 },
  },

  body: {
    averageHeight: 1875,
    skinType: 'fur',
    earShape: 'dog',
    tailShape: 'dog',
    smellFamily: 'earthy',

    mouth: {
      tongueShape: 'dog',
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

    pussy: {
      shape:'dog',
      pussyWidth: 80,
      pussyWidthDev: 8,
    },
  },

});
