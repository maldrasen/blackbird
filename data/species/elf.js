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
    openness:[0,40],            // Long lived traditionalists.
    conscientiousness:[20,80],  // Moderate
    extraversion:[10,90],       // Any
    agreeableness:[30,70],      // Moderate
    neuroticism:[0,50],         // Long lived and emotionally stable.
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
