Archetype.register(ArchetypeCode.playful, {
  name: 'Playful',

  equipmentPreferences: {
    [ItemStyle.barbaric]: 20,
    [ItemStyle.cute]: 100,
    [ItemStyle.formidable]: -30,
    [ItemStyle.lavish]: 60,
    [ItemStyle.morbid]: -10,
    [ItemStyle.natural]: 20,
    [ItemStyle.slutty]: -20,
  },

  denialStyle: DenialStyle.frightened,
  negotiationStyle: NegotiationStyle.playful,
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
