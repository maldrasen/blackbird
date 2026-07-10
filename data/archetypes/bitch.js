Archetype.register(ArchetypeCode.bitch, {
  name: 'Bitch',
  requires: 'gender.not-male',
  supertype: NegotiationSupertype.fierce,

  outfitStyles: [OutfitStyle.sensible],
  denialStyle: DenialStyle.violent,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:25, strength:[10,20] },
    'other-rough': { chance:10, strength:[5, 10] },
  },

  // She respects strength and confidence and reads kindness as weakness.
  negotiation: {
    dominant: { affection: 20, fear: 20, respect: 80 },
    kind:     { affection:-20, fear:  0, respect:-40 },
    boastful: { affection: 10, fear:  0, respect: 40 },
    honest:   { affection:  0, fear:  0, respect: 10 },
    lewd:     { affection: 30, fear:  0, respect:-10 },
  },

  virginChances: {
    complete: 70,
    kiss: 95,
    oral: 100,
    pussy: 66,
    anal: 95,
  },
});
