Archetype.register(ArchetypeCode.timid, {
  name: 'Timid',

  outfitStyles: [OutfitStyle.sensible],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:40, gay:30, bi:30, ace:20 },
  sexualPreferences:{
    'bottom': { chance:50, strength:[10,30] },
  },

  // Easily frightened, but opens up to anyone who is gentle with her.
  negotiation: {
    dominant: { affection:-20, fear: 80, respect: 10 },
    kind:     { affection: 70, fear:-40, respect: 10 },
    boastful: { affection:-10, fear: 30, respect:  0 },
    honest:   { affection: 40, fear:-10, respect: 20 },
    lewd:     { affection:-20, fear: 40, respect:  0 },
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
