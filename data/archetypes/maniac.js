Archetype.register(ArchetypeCode.maniac, {
  name: 'Maniac',

  // Should we also add sexual preferences to archetypes? What kind of
  // preferences would a maniac have? Top is a possibility, but so is something
  // like the humiliating preferences, given that they have the frisky style.

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
