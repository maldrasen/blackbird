Archetype.register(ArchetypeCode.serious, {
  name: 'Serious',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 30,
    [ItemStyle.cute]: -40,
    [ItemStyle.formidable]: 100,
    [ItemStyle.lavish]: -30,
    [ItemStyle.morbid]: 0,
    [ItemStyle.natural]: 80,
    [ItemStyle.slutty]: -50,
  },

  denialStyle: DenialStyle.violent,
  negotiationStyle: NegotiationStyle.serious,
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:60, gay:20, bi:20, ace:5 },

  virginChances: {
    complete: 40,
    kiss: 50,
    oral: 75,
    pussy: 66,
    cock: 33,
    anal: 90,
  },
});
