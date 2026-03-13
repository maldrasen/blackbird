Archetype.register(ArchetypeCode.nice, {
  name: 'Nice Guy',
  requires: 'gender.male',

  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:40, ace:5 },
  sexualPreferences:{
    'other-parts':    { chance:20, strength:[10,20] },
    'affection-slut': { chance:30, strength:[10,20] },
  },

  virginChances: {
    complete: 33,
    kiss: 60,
    oral: 40,
    cock: 33,
    anal: 90,
  },
});
