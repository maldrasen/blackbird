Archetype.register(ArchetypeCode.maniac, {
  name: 'Maniac',

  // Should we also add sexual preferences to archetypes? What kind of
  // preferences would a maniac have? Top is a possibility, but so is something
  // like the humiliating preferences, given that they have the frisky style.

  equipmentPreferences: {
    [ItemStyle.barbaric]: 50,
    [ItemStyle.cute]: -20,
    [ItemStyle.formidable]: -20,
    [ItemStyle.lavish]: 80,
    [ItemStyle.morbid]: 100,
    [ItemStyle.natural]: 20,
    [ItemStyle.slutty]: 10,
  },

  denialStyle: DenialStyle.violent,
  negotiationStyle: NegotiationStyle.fierce,
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:30, gay:30, bi:60, ace:10 },

  virginChances: {
    complete: 33,
    kiss: 50,
    oral: 70,
    pussy: 50,
    cock: 50,
    anal: 80,
  },
});
