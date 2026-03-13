Archetype.register(ArchetypeCode.bitch, {
  name: 'Bitch',
  requires: 'gender.not-male',

  outfitStyles: [OutfitStyle.sensible],
  denialStyle: DenialStyle.violent,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:25, strength:[10,20] },
    'other-rough': { chance:10, strength:[5, 10] },
  },

  virginChances: {
    complete: 70,
    kiss: 95,
    oral: 100,
    pussy: 66,
    anal: 95,
  },
});
