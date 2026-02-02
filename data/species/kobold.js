Species.register('kobold', {
  name: 'Kobold',

  genderRatio: { female:40, futa:20, male:40, enby:5 },
  sexualityRatio: { straight:70, gay:10, bi:10, ace:10 },

  attributes: {
    strength: 'D',
    dexterity: 'B',
    vitality: 'D',
    intelligence: 'C',
    beauty: 'D',
  },

  personalityArchetypes: {
    bimbo: 12,
    brat: 22,
    deviant: 2,
    wallflower: 9,
    stoner: 13,
    warrior: 12,
    thug: 35,
  },

  body: {
    tits: false,
    nipples: false,

    mouth: {
      tongueShape: 'forked',
      averageTongueLength: 100,
      maxMouthWidth: 200,
      maxThroatWidth: 40,
    },

    cock: {
      shape: 'dragon',
      sheath: 'scales',
      size: {
        tiny: 20,
        small: 15,
        average: 10,
      }
    },

    pussy:{ shape:'dragon' }
  },

});
