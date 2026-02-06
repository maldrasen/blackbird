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

  body: {
    averageHeight: 2000,
    skinType: 'fur',
    earShape: 'horse',
    tailShape: 'horse',
    smellFamily: 'earthy',

    mouth: {
      averageTongueLength: 90,
      maxMouthWidth: 80,
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
      shape: 'horse',
      sheath: 'skin',
      minimumWidth: 30,
      size: {
        average: 10,
        big:     20,
        huge:    30,
      },
    },

    pussy:{ shape:'horse' },
    anus:{ shape:'horse' },
  },

});
