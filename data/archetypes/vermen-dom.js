Archetype.register(ArchetypeCode.vermenDom, {
  name: 'Dominant Vermen',
  requires: 'species.vermen',

  outfitStyles: [OutfitStyle.barbaric],
  denialStyle: DenialStyle.violent,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:60, strength:[20,40], atLeast:1 },
    'other-rough': { chance:30, strength:[10,20] },
    'perverted':   { chance:60, strength:[20,40] },
    'beast-lover': { chance:60, strength:[20,30] },
    'orgy-lover':  { chance:50, strength:[20,30] },
  },

  virginChances: {
    complete: 5,
    kiss: 80,
    oral: 80,
    cock: 0,
    anal: 90,
  },
});
