Species.register('sylph', {
  name: 'Sylph',

  genderRatio: { female:75, futa:25, male:5, enby:20 },
  sexualityRatio: { straight:0, gay:40, bi:60, ace:1 },

  attributes: {
    strength: 'F',
    dexterity: 'A',
    vitality: 'D',
    intelligence: 'C',
    beauty: 'B',
  },

  personalityRanges: {
    openness:[60,100],        // Very curious and open to new experiences
    conscientiousness:[0,30], // No self control at all.
    extraversion:[60,100],    // Flirtatious with everyone.
    agreeableness:[20,60],    // They're fae, they don't really care about other people
    neuroticism:[50,100],     // Small and fragile
  },

  // It's rare for a sylph to have a cock, but when they do they're exceedingly
  // sensitive and prone to premature ejaculation. They also have extremely
  // sensitive prostates.
  sensitivities: {
    cock:     { Z:0,   F:0,  D:1,  C:10,  B:30, A:60 },
    clit:     { Z:0,   F:0,  D:5,  C:20,  B:40, A:5  },
    pussy:    { Z:0,   F:5,  D:20, C:100, B:30, A:10 },
    anus:     { Z:0,   F:5,  D:20, C:100, B:30, A:10 },
    prostate: { Z:0,   F:0,  D:1,  C:10,  B:30, A:60 },
    nipple:   { Z:0,   F:10, D:30, C:50,  B:5,  A:1  },
    oral:     { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    urethra:  { Z:100, F:5,  D:1,  C:0,   B:0,  A:0  },
    cervix:   { Z:100, F:10, D:5,  C:1,   B:0,  A:0  },
  },

  // Sylphs are curious and naturally bratty. They like to watch others, and
  // they are more likely to enjoy both pain and degrading experiences as being
  // novel and interesting.
  sexualPreferences: {
    'voyeur':           { chance:50, strength:30 },
    'exhibitionist':    { chance:30, strength:30 },
    'humiliation-slut': { chance:25, strength:20 },
    'affection-slut':   { chance:25, strength:-20 },
    'perverted':        { chance:20, strength:20 },
    'incest-lover':     { chance:20, strength:20 },
    'masturbator':      { chance:20, strength:20 },
    'sex-toy-lover':    { chance:10, strength:10 },
    'masochistic':      { chance:10, strength:10 },
    'cum-dump':         { chance:10, strength:20 },
    'breath-player':    { chance:5, strength:10 },
    'enemas':           { chance:5, strength:10 },
    'gape-queen':       { chance:5, strength:10 },
    'size-queen':       { chance:5, strength:10 },
    'piss-slut':        { chance:5, strength:10 },
    'punching-bag':     { chance:5, strength:10 },
  },

  aspects: {
    flexible:  { chance:33, levels:{ 1:20, 2:5,  3:1 }},
    premature: { chance:33, levels:{ 1:30, 2:10, 3:5 }},
  },

  body: {
    averageHeight: 1400,
    mutability: 25,
    earShape: 'elf',
    smellFamily: 'floral',

    breasts:{
      zero: 30,
      tiny: 20,
      small: 10,
    },

    cock: {
      cumMultiplier: 0.7,
      size: {
        tiny:    5,
        small:   20,
        average: 10,
      },
    },
  },

});
