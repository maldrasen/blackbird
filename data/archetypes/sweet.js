Archetype.register(ArchetypeCode.sweet, {
  name: 'Sweet',
  requires: 'gender.not-male',

  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },
  sexualPreferences:{
    'affection-slut': { chance:50, strength:[10,30] },
    'slut':           { chance:20, strength:[10,20] },
    'other-parts':    { chance:10, strength:[10,20] },
  },

  virginChances: {
    complete: 75,
    kiss: 60,
    oral: 80,
    pussy: 90,
    anal: 100,
  },
});
