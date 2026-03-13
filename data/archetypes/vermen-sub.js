Archetype.register(ArchetypeCode.vermenSub, {
  name: 'Submissive Vermen',
  requires: 'species.vermen',

  outfitStyles: [OutfitStyle.barbaric],
  denialStyle: DenialStyle.horny,
  sexStyle: SexStyle.submissive,
  sexualityRatio: { straight:80, gay:20, bi:40 },
  sexualPreferences: {
    'bottom':        { chance:60, strength:[20,30], atLeast:1 },
    'self-rough':    { chance:15, strength:[10,20] },
    'humiliating':   { chance:30, strength:[10,30] },
    'perverted':     { chance:60, strength:[20,40] },
    'beast-lover':   { chance:60, strength:[20,30] },
    'orgy-lover':    { chance:50, strength:[20,30] },
  },
  
  virginChances: {
    complete: 5,
    kiss: 80,
    oral: 5,
    pussy: 0,
    anal: 5,
  },
});
