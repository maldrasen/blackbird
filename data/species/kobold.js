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

    pussy:{ shape:'dragon' }
  },

});
