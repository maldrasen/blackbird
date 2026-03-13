Archetype.register(ArchetypeCode.bastard, {
  name: 'Bastard',
  requires: 'gender.male',

  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:60, strength:[10,30] },
    'other-rough': { chance:30, strength:[10,20] },
  },

  virginChances: {
    complete: 20,
    kiss: 33,
    oral: 66,
    cock: 10,
    anal: 90,
  },
});
