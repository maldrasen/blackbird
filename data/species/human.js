Species.register('human', {
  name: 'Human',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },

  attributes: {
    strength: 'C',
    dexterity: 'C',
    vitality: 'C',
    intelligence: 'C',
    beauty: 'C',
  },

  personalityRanges: {
    calm:    { average:0, deviation:25 },
    kind:    { average:0, deviation:22 },
    violent: { average:0, deviation:25 },
  },

  // The human sensitives should be considered the default range. Other species
  // might have slight tweaks to any of these.
  sensitivities: {
    cock:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    clit:     { Z:0,   F:1,  D:5,  C:100, B:40, A:15 },
    pussy:    { Z:0,   F:5,  D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    prostate: { Z:0,   F:10, D:30, C:100, B:20, A:5  },
    nipple:   { Z:0,   F:10, D:30, C:50,  B:5,  A:1  },
    oral:     { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    urethra:  { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    cervix:   { Z:100, F:10, D:5,  C:1,   B:0,  A:0  },
  },

  body: {
    mutability: 50,
    earShape: 'human',
    smellFamily: 'all',

    breasts: {
      zero:    5,
      tiny:    10,
      small:   20,
      average: 35,
      big:     15,
      huge:    5,
    },

    cock: {
      cumMultiplier: 1,
      size: {
        small:   10,
        average: 60,
        big:     10,
      },
    },
  },

});
