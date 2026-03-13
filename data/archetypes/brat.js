Archetype.register(ArchetypeCode.brat, {
  name: 'Brat',

  outfitStyles: [OutfitStyle.flirty],
  denialStyle: DenialStyle.angry,
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
