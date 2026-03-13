Archetype.register(ArchetypeCode.slut, {
  name: 'Slut',

  outfitStyles: [OutfitStyle.slutty],
  denialStyle: DenialStyle.horny,
  sexStyle: SexStyle.shameless,
  sexualityRatio: { bi:100 },
  sexualPreferences: {
    'bottom':        { chance:60, strength:[10,20] },
    'self-rough':    { chance:10, strength:[5,10]  },
    'humiliating':   { chance:10, strength:[5,10]  },
    'slut':          { chance:30, strength:[10,20] },
    'other-parts':   { chance:20, strength:[10,20] },
    'exhibitionist': { chance:30, strength:[10,20] },
    'voyeur':        { chance:30, strength:[10,20] },
    'incest-lover':  { chance:10, strength:[10,20] },
    'orgy-lover':    { chance:20, strength:[10,20] },
    'masturbator':   { chance:40, strength:[10,30] },
    'sex-toy-lover': { chance:30, strength:[10,30] },
  },

  virginChances: {
    complete: 0,
    kiss: 10,
    oral: 0,
    pussy: 5,
    cock: 0,
    anal: 10,
  },
});
