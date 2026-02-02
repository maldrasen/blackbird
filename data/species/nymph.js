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

  personalityArchetypes: {
    mother: 33,
    bimbo: 22,
    stoner: 14,
    princess: 10,
    brat: 6,
    tradwife: 2,
    deviant: 1,
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
