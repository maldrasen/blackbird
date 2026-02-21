Species.register('equian', {
  name: 'Equian',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:60, gay:20, bi:20, ace:5 },

  attributes: {
    strength: 'A',
    dexterity: 'C',
    vitality: 'A',
    intelligence: 'C',
    beauty: 'C',
  },

  personalityRanges: {
    openness:[30,70],          // A bit traditionalist.
    conscientiousness:[10,50], // Nomadic, unstructured culture.
    extraversion:[50,90],      // Herd dynamics. Very social.
    agreeableness:[50,90],     // Herd dynamics. Work together.
    neuroticism:[40,80],       // Herbivores
  },

  // Huge cocks and clits and pussies, but as such their sensitivity is lower.
  sensitivities: {
    cock:     { Z:0,   F:5,  D:10, C:80,  B:20, A:5 },
    clit:     { Z:0,   F:5,  D:10, C:80,  B:20, A:5 },
    pussy:    { Z:0,   F:10, D:30, C:80,  B:15, A:5 },
    anus:     { Z:0,   F:10, D:30, C:100, B:20, A:5 },
    prostate: { Z:0,   F:10, D:30, C:100, B:20, A:5 },
    nipple:   { Z:0,   F:10, D:30, C:50,  B:5,  A:1 },
    oral:     { Z:100, F:5,  D:1,  C:0,   B:0,  A:0 },
    urethra:  { Z:100, F:5,  D:1,  C:0,   B:0,  A:0 },
    cervix:   { Z:100, F:10, D:5,  C:1,   B:0,  A:0 },
  },

  // Horses are into ass play, breeding, and showing their bodies.
  sexualPreferences: {
    'anal-slut':     { chance:20, strength:20 },
    'exhibitionist': { chance:30, strength:30 },
    'stud':          { chance:20, strength:30, genders:['male','futa'] },
    'breeder':       { chance:20, strength:30, genders:['female','futa'] },
    'beast-lover':   { chance:90, strength:20 },
    'orgy-lover':    { chance:50, strength:20 },
  },

  body: {
    averageHeight: 2000,
    skinType: 'fur',
    earShape: 'horse',
    tailShape: 'horse',
    smellFamily: 'earthy',

    mouth: {
      tongueLength: 100,
      tongueLengthDev: 10,
      mouthWidth: 80,
      mouthWidthDev: 5,
    },

    breasts: {
      tiny:    5,
      small:   10,
      average: 20,
      big:     60,
      huge:    10,
    },

    nipples: {
      shade: 0,
      shape: 'teat',
    },

    cock: {
      cumMultiplier: 10,
      shape: 'horse',
      size: {
        average: 10,
        big:     20,
        huge:    30,
      },
    },

    pussy:{
      shape:'horse',
      pussyWidth: 90,
      pussyWidthDev: 8,
      urethraWidthMin: 8,
      urethraWidthMax: 12,
      clitLength: 48,
      clitLengthDev: 8,
      clitWidth: 42,
      clitWidthDev: 5,
    },
    anus:{ shape:'horse' },
  },

});
