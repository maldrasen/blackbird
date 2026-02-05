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
    openness:[10,90],
    conscientiousness:[10,90],
    extraversion:[10,90],
    agreeableness:[10,90],
    neuroticism:[10,90],
  },

  body: {
    mutability: 50,
    earShape: 'human',
    smellFamily: 'all',

    tits:{ size:{
      zero:    5,
      tiny:    10,
      small:   20,
      average: 35,
      big:     15,
      huge:    5,
    }},

    cock:{ size:{
      small:   10,
      average: 60,
      big:     30,
    }},
  },

});
