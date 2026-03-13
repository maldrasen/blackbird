Archetype.register(ArchetypeCode.bimbo, {
  name: 'Bimbo',
  requires: 'gender.not-male',

  outfitStyles: [OutfitStyle.flirty, OutfitStyle.slutty],
  denialStyle: DenialStyle.frightened,
  sexStyle: SexStyle.shameless,
  sexualityRatio: { straight:25, bi:75 },
  sexualPreferences: {
    'bottom':        { chance:60, strength:[10,20] },
    'self-rough':    { chance:10, strength:[5, 10] },
    'humiliating':   { chance:10, strength:[5, 10] },
    'slut':          { chance:30, strength:[10,20] },
    'other-parts':   { chance:20, strength:[10,20] },
    'masturbator':   { chance:30, strength:[10,30] },
    'sex-toy-lover': { chance:30, strength:[10,30] },
  },

  virginChances: {
    complete: 0,
    kiss: 25,
    oral: 0,
    pussy: 25,
    anal: 33,
  },
});
