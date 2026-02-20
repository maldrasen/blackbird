Species.register('nymph', {
  name: 'Nymph',

  genderRatio: { female:60, futa:40, male:0, enby:0 },
  sexualityRatio: { straight:0, gay:20, bi:80, ace:0 },

  attributes: {
    strength: 'D',
    dexterity: 'C',
    vitality: 'D',
    intelligence: 'C',
    beauty: 'A',
  },

  personalityRanges: {
    openness:[60,100],        // Up for anything
    conscientiousness:[0,30], // Very lazy
    extraversion:[30,70],     // Moderate, likes groups but also likes one on one time.
    agreeableness:[60,100],   // Very friendly / seductive
    neuroticism:[60,100],     // Emotionally Volatile
  },

  // Nymphs have an overall boost to their sensitivities, and highly sensitive
  // nipples.
  sensitivities: {
    cock:     { Z:0,   F:0,  D:5,  C:80, B:40, A:20 },
    clit:     { Z:0,   F:0,  D:5,  C:80, B:40, A:15 },
    pussy:    { Z:0,   F:0,  D:10, C:80, B:30, A:10 },
    anus:     { Z:0,   F:0,  D:20, C:80, B:20, A:5  },
    prostate: { Z:0,   F:0,  D:20, C:80, B:20, A:5  },
    nipple:   { Z:0,   F:0,  D:10, C:50, B:25, A:5  },
    oral:     { Z:100, F:5,  D:1,  C:0,  B:0,  A:0  },
    urethra:  { Z:100, F:5,  D:10, C:5,  B:1,  A:0  },
    cervix:   { Z:100, F:5,  D:10, C:5,  B:1,  A:0  },
  },

  // Nymphs are the opposite of Sylphs. They melt under loving affection, but hate emotional abuse.
  sexualPreferences: {
    'humiliation-slut': { chance:25, strength:-20  },
    'affection-slut':   { chance:25, strength:20 },
  },

  body: {
    averageHeight: 1500,
    mutability: 25,
    earShape: 'elf',
    smellFamily: 'lusty',

    mouth: {
      gagReflex: 40,
      gagReflexDev: 10,
    },

    breasts: {
      tiny:    5,
      small:   10,
      average: 20,
      big:     40,
      huge:    20,
    },

    cock: {
      cumMultiplier: 1.5,
      size: {
        small:   10,
        average: 50,
        big:     30,
      },
    },
  },

});
