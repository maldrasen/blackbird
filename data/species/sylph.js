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

  body: {
    averageHeight: 1400,
    mutability: 25,
    earShape: 'elf',
    smellFamily: 'floral',

    aspects: ['flexible'],

    tits:{ size:{
      zero: 30,
      tiny: 20,
      small: 10,
    }},

    cock:{ size:{
      small: 20,
      average: 20,
    }}
  },

});
