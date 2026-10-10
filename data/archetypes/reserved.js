Archetype.register(ArchetypeCode.reserved, {
  name: 'Reserved',

  equipmentPreferences: {
    [ItemStyle.barbaric]: -30,
    [ItemStyle.cute]: -20,
    [ItemStyle.formidable]: 100,
    [ItemStyle.lavish]: 20,
    [ItemStyle.morbid]: -20,
    [ItemStyle.natural]: 30,
    [ItemStyle.slutty]: -50,
  },

  denialStyle: DenialStyle.horny,
  negotiationStyle: NegotiationStyle.reserved,
  sexStyle: SexStyle.submissive,
  sexualityRatio: { straight:40, gay:20, bi:20, ace:30 },

  virginChances: {
    complete: 80,
    kiss: 80,
    oral: 40,
    pussy: 66,
    cock: 33,
    anal: 75,
  },
});
