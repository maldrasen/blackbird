Archetype.register(ArchetypeCode.bastard, {
  name: 'Bastard',
  requires: CharacterRequirements.isMale(),

  equipmentPreferences: {
    [ItemStyle.barbaric]: 50,
    [ItemStyle.cute]: -50,
    [ItemStyle.formidable]: 100,
    [ItemStyle.lavish]: -20,
    [ItemStyle.morbid]: 20,
    [ItemStyle.natural]: 10,
    [ItemStyle.slutty]: -10,
  },

  denialStyle: DenialStyle.violent,
  negotiationStyle: NegotiationStyle.fierce,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:60, strength:[10,30] },
    'other-rough': { chance:30, strength:[10,20] },
  },

  virginChances: {
    complete: 20,
    kiss: 33,
    oral: 66,
    cock: 10,
    anal: 90,
  },
});
