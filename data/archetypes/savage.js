Archetype.register(ArchetypeCode.savage, {
  name: 'Savage',

  outfitStyles: [OutfitStyle.natural, OutfitStyle.barbaric],
  denialStyle: DenialStyle.violent,
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:40, gay:20, bi:30 },
  sexualPreferences: {
    'top':           { chance:50, strength:[10,30] },
    'choker':        { chance:10, strength:[10,20] },
    'pisser':        { chance:20, strength:[10,20] },
    'pugilist':      { chance:10, strength:[10,20] },
    'stud':          { chance:30, strength:[10,20] },
    'exhibitionist': { chance:30, strength:[10,30] },
    'voyeur':        { chance:30, strength:[10,30] },
    'incest-lover':  { chance:10, strength:[10,20] },
    'orgy-lover':    { chance:20, strength:[10,20] },
    'beast-lover':   { chance:30, strength:[10,30] },
    'masturbator':   { chance:30, strength:[10,30] },
  },

  virginChances: {
    complete: 33,
    kiss: 20,
    oral: 40,
    pussy: 20,
    cock: 10,
    anal: 80,
  },
});
