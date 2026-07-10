Archetype.register(ArchetypeCode.innocent, {
  name: 'Innocent',
  supertype: NegotiationSupertype.timid,

  outfitStyles: [OutfitStyle.sensible, OutfitStyle.flirty],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:60, gay:10, bi:10, ace:20 },
  virginChances: { complete: 100 },
});
