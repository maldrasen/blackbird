Species.register('elf', {
  name: 'Elf',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:40, ace:5 },

  attributes: {
    strength: 'D',
    dexterity: 'B',
    vitality: 'D',
    intelligence: 'B',
    beauty: 'B',
  },

  personalityRanges: {
    calm:    { average:30, deviation:10 },
    kind:    { average:0,  deviation:20 },
    violent: { average:0,  deviation:20 },
  },

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

  // Elves are chaste and reserved, but like being in control.
  sexualPreferences: {
    'perverted': { chance:50, strength:-20 },
    'dominant':  { chance:25, strength:20 },
  },

  body: {
    averageHeight: 1650,
    mutability: 50,
    earShape: 'elf',
    smellFamily: 'floral',

    breasts: {
      zero:    5,
      tiny:    10,
      small:   20,
      average: 10,
      big:     5,
      huge:    1,
    },

    cock: {
      cumMultiplier: 0.9,
      size: {
        small:   20,
        average: 60,
        big:     20,
      },
    },

    // Elves have very large inner labia.
    pussy: {
      labiaLength: 60,
      labiaLengthDev: 20,
    },

  },

});
