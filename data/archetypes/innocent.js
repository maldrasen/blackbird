Archetype.register(ArchetypeCode.innocent, {
  name: 'Innocent',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 20,
    [ItemStyle.cute]: 100,
    [ItemStyle.formidable]: 20,
    [ItemStyle.lavish]: 30,
    [ItemStyle.morbid]: -30,
    [ItemStyle.natural]: 30,
    [ItemStyle.slutty]: -50,
  },

  denialStyle: DenialStyle.frightened,
  negotiationStyle: NegotiationStyle.timid,
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:60, gay:10, bi:10, ace:20 },
  virginChances: { complete: 100 },
});
