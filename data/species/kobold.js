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

  personalities: {
    openness:[20,80],          // Moderate
    conscientiousness:[0,30],  // Not big on long term planning (except for traps)
    extraversion:[50,100],     // Tribal, pack oriented
    agreeableness:[0,40],      // Little bastards
    neuroticism:[50,100],      // Anxious
  },

  body: {
    tits: false,
    nipples: false,

    mouth: {
      tongueShape: 'forked',
      averageTongueLength: 100,
      maxMouthWidth: 200,
      maxThroatWidth: 40,
    },

    cock: {
      shape: 'dragon',
      sheath: 'scales',
      size: {
        tiny: 20,
        small: 15,
        average: 10,
      }
    },

    pussy:{ shape:'dragon' }
  },

});
