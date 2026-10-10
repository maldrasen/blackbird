Archetype.register(ArchetypeCode.pervert, {
  name: 'Pervert',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 10,
    [ItemStyle.cute]: -20,
    [ItemStyle.formidable]: -30,
    [ItemStyle.lavish]: 50,
    [ItemStyle.morbid]: 20,
    [ItemStyle.natural]: 30,
    [ItemStyle.slutty]: 100,
  },

  denialStyle: DenialStyle.angry,
  negotiationStyle: NegotiationStyle.lewd,
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
