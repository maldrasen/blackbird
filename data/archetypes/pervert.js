Archetype.register(ArchetypeCode.pervert, {
  name: 'Pervert',

  outfitStyles: [OutfitStyle.flirty, OutfitStyle.slutty],
  denialStyle: DenialStyle.angry,
  sexStyle: SexStyle.shameless,
  sexualityRatio: { straight:10, gay:10, bi:100 },

  virginChances: {
    complete: 0,
    kiss: 10,
    oral: 5,
    pussy: 5,
    cock: 5,
    anal: 10,
  },
});
