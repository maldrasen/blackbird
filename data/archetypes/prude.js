Archetype.register(ArchetypeCode.prude, {
  name: 'Prude',
  parent: 'serious',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 10,
    [ItemStyle.cute]: 30,
    [ItemStyle.formidable]: 100,
    [ItemStyle.lavish]: 60,
    [ItemStyle.morbid]: 10,
    [ItemStyle.natural]: 40,
    [ItemStyle.slutty]: -100,
  },

  denialStyle: DenialStyle.violent,
  negotiationStyle: NegotiationStyle.serious,
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:75, ace:25 },

  virginChances: {
    complete: 80,
    kiss: 75,
    oral: 80,
    pussy: 90,
    cock: 90,
    anal: 100,
  },
});