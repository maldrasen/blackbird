Archetype.register(ArchetypeCode.flowerChild, {
  name: 'Flower Child',

  outfitStyles: [OutfitStyle.natural],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:10, gay:10, bi:80 },
  sexualPreferences: {
    'exhibitionist': { chance:30, strength:[10,20] },
    'voyeur':        { chance:30, strength:[10,20] },
    'incest-lover':  { chance:10, strength:[10,20] },
    'orgy-lover':    { chance:20, strength:[10,20] },
    'beast-lover':   { chance:30, strength:[10,20] },
    'masturbator':   { chance:30, strength:[10,30] },
  },

  virginChances: {
    complete: 20,
    kiss: 30,
    oral: 20,
    pussy: 50,
    cock: 50,
    anal: 70,
  },
});
