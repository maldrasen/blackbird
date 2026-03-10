Species.register('vermen', {
  name: 'Vermen',

  genderRatio: { female:40, futa:20, male:40, enby:10 },
  sexualityRatio: { straight:70, gay:10, bi:10, ace:10 },

  attributes: {
    strength: 'F',
    dexterity: 'B',
    vitality: 'C',
    intelligence: 'C',
    beauty: 'F',
  },

  archetypes: {
    enby:   { vermenSub:100 },
    female: { vermenSub:100 },
    futa:   { vermenSub:100 },
    male:   { vermenDom:100 },
  },

  // Vermen have strange bodies with multiple nipples and unusual erogenous zones.
  sensitivities: {
    cock:     { Z:0,   F:1,   D:5,  C:100, B:40, A:15 },
    clit:     { Z:0,   F:1,   D:5,  C:100, B:40, A:15 },
    pussy:    { Z:0,   F:5,   D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:10,  D:30, C:100, B:20, A:5  },
    prostate: { Z:0,   F:10,  D:30, C:100, B:20, A:5  },
    nipple:   { Z:0,   F:10,  D:20, C:80,  B:40, A:10 },
    throat:   { Z:5,   F:20,  D:10, C:3,   B:1,  A:0  },
    urethra:  { Z:5,   F:20,  D:10, C:3,   B:1,  A:0  },
    cervix:   { Z:5,   F:30,  D:20, C:5,   B:2,  A:1  },
  },

  sexualPreferences: {
    'male-dominated': { strength:50 },
    'perverted':{ chance:90, strength:40 },
    'beast-lover':{ chance:90, strength:20 },
    'orgy-lover':{ chance:60, strength:30 },
  },

  body: {
    averageHeight: 800,
    skinType: 'fur',
    eyeShape: 'rat',
    tailShape: 'rat',
    smellFamily: 'earthy',

    breastCount: 6,
    breasts: {
      zero:    30,
      tiny:    50,
      small:   30,
      average: 10,
      big:     1,
    },

    mouth: {
      tongueLength: 100,
      tongueLengthDev: 10,
      mouthWidth: 200,
      mouthWidthDev: 20,
      throatWidth: 40,
      throatWidthDev: 3,
    },

    cock: {
      cumMultiplier: 4, // Like the kobolds, they produce a massive amount of cum for their size.
      size: {
        average: 10,
        big:     30,
        huge:    20,
      }
    },

    pussy:{
      pussyWidth: 90,
      pussyWidthDev: 7,
    }
  },

});
