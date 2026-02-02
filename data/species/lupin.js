Species.register('lupin', {
  name: 'Lupiun',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },

  attributes: {
    strength: 'B',
    dexterity: 'B',
    vitality: 'B',
    intelligence: 'C',
    beauty: 'C',
  },

  personalityArchetypes: {
    bimbo: 16,
    mother: 22,
    brat: 6,
    princess: 8,
    deviant: 1,
    wallflower: 8,
    stoner: 12,
    tradwife: 10,
    warrior: 30,
    thug: 20,
  },

  body: {

    mouth: {
      averageTongueLength: 120,
      maxMouthWidth: 240,
    },

    tits:{ size:{
      tiny:    10,
      small:   20,
      average: 50,
      big:     20,
      huge:    10,
    }},

    nipples: {
      shade: 0,
      shape: 'teat',
    },

    cock: {
      shape: 'dog',
      sheath: 'fur',
      size: {
        small: 10,
        average: 40,
        big: 20,
        huge: 5,
      }
    },

    pussy: { shape:'dog' },
  },

});
