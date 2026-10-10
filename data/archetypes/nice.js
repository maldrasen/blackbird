Archetype.register(ArchetypeCode.nice, {
  name: 'Nice Guy',
  requires: CharacterRequirements.isMale(),

  equipmentPreferences: {
    [ItemStyle.barbaric]: 20,
    [ItemStyle.cute]: -20,
    [ItemStyle.formidable]: 100,
    [ItemStyle.lavish]: -30,
    [ItemStyle.morbid]: -10,
    [ItemStyle.natural]: 50,
    [ItemStyle.slutty]: -40,
  },

  denialStyle: DenialStyle.angry,
  negotiationStyle: NegotiationStyle.warm,
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:40, ace:5 },
  sexualPreferences:{
    'other-parts':    { chance:20, strength:[10,20] },
    'affection-slut': { chance:30, strength:[10,20] },
  },

  virginChances: {
    complete: 33,
    kiss: 60,
    oral: 40,
    cock: 33,
    anal: 90,
  },
});
