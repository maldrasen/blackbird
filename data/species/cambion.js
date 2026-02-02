Species.register('cambion', {
  name: 'Cambion',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },

  attributes: {
    strength: 'C',
    dexterity: 'C',
    vitality: 'C',
    intelligence: 'C',
    beauty: 'C',
  },

  personalityArchetypes: {
    bimbo: 15,
    mother: 20,
    brat: 10,
    princess: 10,
    deviant: 1,
    wallflower: 10,
    stoner: 15,
    nun: 5,
    tradwife: 10,
    warrior: 20,
    thug: 15,
  },

  body: {
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
