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

  personalityArchetypes: {
    mother: 10,
    bimbo: 25,
    stoner: 10,
    princess: 20,
    brat: 25,
    wallflower: 5,
    deviant: 1,
  },

  body: {
    mouth:{ maxMouthWidth:44 },

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
