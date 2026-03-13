Archetype.register(ArchetypeCode.timid, {
  name: 'Timid',

  outfitStyles: [OutfitStyle.sensible],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:40, gay:30, bi:30, ace:20 },
  sexualPreferences:{
    'bottom': { chance:50, strength:[10,30] },
  },

  virginChances: {
    complete: 80,
    kiss: 60,
    oral: 50,
    pussy: 66,
    cock: 50,
    anal: 90,
  },
});
