Archetype.register(ArchetypeCode.brat, {
  name: 'Brat',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 20,
    [ItemStyle.cute]: 80,
    [ItemStyle.formidable]: -20,
    [ItemStyle.lavish]: 100,
    [ItemStyle.morbid]: -20,
    [ItemStyle.natural]: 0,
    [ItemStyle.slutty]: 40,
  },

  denialStyle: DenialStyle.angry,
  negotiationStyle: NegotiationStyle.brat,
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:30, gay:20, bi:60 },
  sexualPreferences: {
    'humiliation-slut': { chance:60, strength:[15,30] },
    'humiliating':      { chance:30, strength:[10,20] },
  },

  virginChances: {
    complete: 50,
    kiss: 90,
    oral: 80,
    pussy: 70,
    cock: 50,
    anal: 90,
  },
});
