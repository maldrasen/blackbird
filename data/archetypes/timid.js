Archetype.register(ArchetypeCode.timid, {
  name: 'Timid',

  equipmentPreferences: {
    [ItemStyle.barbaric]: -30,
    [ItemStyle.cute]: 20,
    [ItemStyle.formidable]: 40,
    [ItemStyle.lavish]: 40,
    [ItemStyle.morbid]: -50,
    [ItemStyle.natural]: 80,
    [ItemStyle.slutty]: -60,
  },

  denialStyle: DenialStyle.frightened,
  negotiationStyle: NegotiationStyle.timid,
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
