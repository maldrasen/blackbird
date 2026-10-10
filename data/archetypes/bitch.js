Archetype.register(ArchetypeCode.bitch, {
  name: 'Bitch',
  requires: CharacterRequirements.isNotMale(),

  equipmentPreferences: {
    [ItemStyle.barbaric]: 30,
    [ItemStyle.cute]: 10,
    [ItemStyle.formidable]: 50,
    [ItemStyle.lavish]: 100,
    [ItemStyle.morbid]: 10,
    [ItemStyle.natural]: -20,
    [ItemStyle.slutty]: -30,
  },

  denialStyle: DenialStyle.violent,
  negotiationStyle: NegotiationStyle.fierce,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:25, strength:[10,20] },
    'other-rough': { chance:10, strength:[5, 10] },
  },

  virginChances: {
    complete: 70,
    kiss: 95,
    oral: 100,
    pussy: 66,
    anal: 95,
  },
});
