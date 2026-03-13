Archetype.register(ArchetypeCode.koboldDom, {
  name: 'Dominant Kobold',
  requires: 'species.kobold',

  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:50, strength:[10,30], atLeast:1 },
    'other-rough': { chance:40, strength:[10,20] },
    'orgy-lover':  { chance:50, strength:[20,30] },
  },

  virginChances: {
    complete: 10,
    kiss: 80,
    oral: 80,
    cock: 5,
    anal: 95,
  },
});
