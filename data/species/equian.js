Species.register('equian', {
  name: 'Equian',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },

  attributes: {
    strength: 'A',
    dexterity: 'C',
    vitality: 'A',
    intelligence: 'C',
    beauty: 'C',
  },

  personalityArchetypes: {
    bimbo: 12,
    mother: 20,
    brat: 2,
    princess: 4,
    deviant: 1,
    wallflower: 8,
    stoner: 13,
    tradwife: 10,
    warrior: 20,
    thug: 15,
  },

  body: {

    mouth: {
      averageTongueLength: 90,
      maxMouthWidth: 80,
    },

    tits:{ size:{
      tiny:    5,
      small:   10,
      average: 20,
      big:     60,
      huge:    10,
    }},

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
      }
    },

    pussy:{ shape:'horse' },
    anus:{ shape:'horse' },
  },

});
