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
    calm:    { average:20,  deviation:10 },
    kind:    { average:20,  deviation:10 },
    violent: { average:-20, deviation:10 },
  },

// Because of their relatively shallow pussies, halflings have an unusually
// sensitive cervix.
sensitivities: {
    cock:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    clit:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    pussy:    { Z:0,   F:5,  D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    prostate: { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    nipple:   { Z:0,   F:10, D:30, C:50,  B:5,  A:1  },
    oral:     { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    urethra:  { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    cervix:   { Z:0,   F:10, D:30, C:10,  B:5,  A:1  },
  },

  // Because of their small size, gaping, stretching and cervix play are big
  // kinks among halflings.
  sexualPreferences: {
    'size-queen':  { chance:33, strength:30 },
    'gape-queen':  { chance:10, strength:30 },
    'cervix-slut': { chance:25, strength:20 },
    'perverted':   { chance:25, strength:-20 },
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
