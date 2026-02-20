Species.register('kobold', {
  name: 'Kobold',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:70, gay:10, bi:10, ace:10 },

  attributes: {
    strength: 'D',
    dexterity: 'B',
    vitality: 'D',
    intelligence: 'C',
    beauty: 'D',
  },

  personalityRanges: {
    openness:[20,80],          // Moderate
    conscientiousness:[0,30],  // Not big on long term planning (except for traps)
    extraversion:[50,100],     // Tribal, pack oriented
    agreeableness:[0,40],      // Little bastards
    neuroticism:[50,100],      // Anxious
  },

  // Fairly standard, except that kobolds don't have nipples.
  sensitivities: {
    cock:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    clit:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    pussy:    { Z:0,   F:5,  D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    prostate: { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    nipple:   { Z:100, F:0,  D:0,  C:0,   B:0,  A:0  },
    oral:     { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    urethra:  { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    cervix:   { Z:100, F:10, D:5,  C:1,   B:0,  A:0  },
  },

  sexualPreferences: {
    'beast-lover':{ chance:90, strength:20 },
    'orgy-lover':{ chance:60, strength:30 },  // Kobolds are gangbang enthusiasts.
  },

  body: {
    averageHeight: 800,
    skinType: 'scales',
    eyeShape: 'dragon',
    tailShape: 'dragon',
    hornShape: 'curved-back',
    smellFamily: 'lusty',

    earShape: false,
    breasts: false,

    mouth: {
      tongueShape: 'forked',
      tongueLength: 100,
      tongueLengthDev: 10,
      mouthWidth: 200,
      mouthWidthDev: 20,
      throatWidth: 40,
      throatWidthDev: 3,
    },

    cock: {
      shape: 'dragon',
      cumMultiplier: 4, // Surprise, though they have internal balls, they produce a massive amount of cum.
      size: {
        average: 10,
        big:     30,
        huge:    10,
      }
    },

    pussy:{
      shape:'dragon',
      pussyWidth: 90,
      pussyWidthDev: 7,
    }
  },

});
