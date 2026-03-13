Archetype.register(ArchetypeCode.koboldSub, {
  name: 'Submissive Kobold',
  requires: 'species.kobold',

  sexStyle: SexStyle.submissive,
  sexualityRatio: { straight:60, gay:20, bi:40, ace:10 },
  sexualPreferences: {
    'bottom':        { chance:50, strength:[20,30], atLeast:1 },
    'self-rough':    { chance:10, strength:[10,20] },
    'humiliating':   { chance:20, strength:[10,20] },
    'orgy-lover':    { chance:50, strength:[20,30] },
  },

  virginChances: {
    complete: 10,
    kiss: 80,
    oral: 5,
    pussy: 5,
    anal: 10,
  },
});
