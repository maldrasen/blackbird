Archetype.register(ArchetypeCode.playful, {
  name: 'Playful',

  outfitStyles: [OutfitStyle.flirty],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:20, gay:20, bi:80 },
  sexualPreferences: {
    'humiliation-slut': { chance:30, strength:[15,30] },
    'self-rough':       { chance:10, strength:[10,20] },
    'humiliating':      { chance:10, strength:[10,20] },
    'masturbator':      { chance:30, strength:[10,30] },
    'sex-toy-lover':    { chance:30, strength:[10,30] },
  },

  virginChances: {
    complete: 66,
    kiss: 50,
    oral: 33,
    pussy: 50,
    cock: 20,
    anal: 66,
  },
});
