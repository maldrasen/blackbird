Archetype.register(ArchetypeCode.sweet, {
  name: 'Sweet',
  requires: CharacterRequirements.isNotMale(),

  equipmentPreferences: {
    [ItemStyle.barbaric]: -20,
    [ItemStyle.cute]: 100,
    [ItemStyle.formidable]: 40,
    [ItemStyle.lavish]: 60,
    [ItemStyle.morbid]: -50,
    [ItemStyle.natural]: 40,
    [ItemStyle.slutty]: -50,
  },

  denialStyle: DenialStyle.frightened,
  negotiationStyle: NegotiationStyle.warm,
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },
  sexualPreferences:{
    'affection-slut': { chance:50, strength:[10,30] },
    'slut':           { chance:20, strength:[10,20] },
    'other-parts':    { chance:10, strength:[10,20] },
  },

  virginChances: {
    complete: 75,
    kiss: 60,
    oral: 80,
    pussy: 90,
    anal: 100,
  },
});
