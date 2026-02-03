Species.register('nymph', {
  name: 'Nymph',

  genderRatio: { female:60, futa:40, male:0, enby:0 },
  sexualityRatio: { straight:0, gay:20, bi:80, ace:0 },

  attributes: {
    strength: 'D',
    dexterity: 'C',
    vitality: 'D',
    intelligence: 'C',
    beauty: 'A',
  },

  personalities: {
    openness:[60,100],        // Up for anything
    conscientiousness:[0,30], // Very lazy
    extraversion:[30,70],     // Moderate, likes groups but also likes one on one time.
    agreeableness:[60,100],   // Very friendly / seductive
    neuroticism:[60,100],     // Emotionally Volatile
  },

  body: {
    tits:{ size:{
      tiny:    5,
      small:   10,
      average: 20,
      big:     40,
      huge:    20,
    }},

    cock:{ size:{
      small:   10,
      average: 50,
      big:     30,
    }},
  },

});
