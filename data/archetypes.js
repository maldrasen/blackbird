
Archetype.register(ArchetypeCode.bastard, {
  name: 'Bastard',
  requires: 'gender.male',
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:60, strength:[10,30] },
    'other-rough': { chance:30, strength:[10,20] },
  },
});

Archetype.register(ArchetypeCode.bimbo, {
  name: 'Bimbo',
  requires: 'gender.not-male',
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
  }
});

Archetype.register(ArchetypeCode.bitch, {
  name: 'Bitch',
  requires: 'gender.not-male',
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:25, strength:[10,20] },
    'other-rough': { chance:10, strength:[5, 10] },
  }
});

Archetype.register(ArchetypeCode.brat, {
  name: 'Brat',
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:30, gay:20, bi:60 },
  sexualPreferences: {
    'humiliation-slut': { chance:60, strength:[15,30] },
    'humiliating':      { chance:30, strength:[10,20] },
  }
});

Archetype.register(ArchetypeCode.flowerChild, {
  name: 'Flower Child',
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:10, gay:10, bi:80 },
  sexualPreferences: {
    'exhibitionist': { chance:30, strength:[10,20] },
    'voyeur':        { chance:30, strength:[10,20] },
    'incest-lover':  { chance:10, strength:[10,20] },
    'orgy-lover':    { chance:20, strength:[10,20] },
    'beast-lover':   { chance:30, strength:[10,20] },
    'masturbator':   { chance:30, strength:[10,30] },
  }
});

Archetype.register(ArchetypeCode.innocent, {
  name: 'Innocent',
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:60, gay:10, bi:10, ace:20 },
});

Archetype.register(ArchetypeCode.koboldDom, {
  name: 'Dominant Kobold',
  requires: 'species.kobold',
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:50, strength:[10,30], atLeast:1 },
    'other-rough': { chance:40, strength:[10,20] },
    'orgy-lover':  { chance:50, strength:[20,30] },
  },
});

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
  }
});

// Should we also add sexual preferences to archetypes? What kind of preferences would a maniac have? Top is a
// possibility, but so is something like the humiliating preferences, given that they have the frisky style.
Archetype.register(ArchetypeCode.maniac, {
  name: 'Maniac',
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:30, gay:30, bi:60, ace:10 },
});

Archetype.register(ArchetypeCode.nice, {
  name: 'Nice Guy',
  requires: 'gender.male',
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:40, ace:5 },
  sexualPreferences:{
    'other-parts':    { chance:20, strength:[10,20] },
    'affection-slut': { chance:30, strength:[10,20] },
  }
});

Archetype.register(ArchetypeCode.pervert, {
  name: 'Pervert',
  sexStyle: SexStyle.shameless,
  sexualityRatio: { straight:10, gay:10, bi:100 },
});

Archetype.register(ArchetypeCode.playful, {
  name: 'Playful',
  sexStyle: SexStyle.frisky,
  sexualityRatio: { straight:20, gay:20, bi:80 },
  sexualPreferences: {
    'humiliation-slut': { chance:30, strength:[15,30] },
    'self-rough':       { chance:10, strength:[10,20] },
    'humiliating':      { chance:10, strength:[10,20] },
    'masturbator':      { chance:30, strength:[10,30] },
    'sex-toy-lover':    { chance:30, strength:[10,30] },
  }
});

Archetype.register(ArchetypeCode.prude, {
  name: 'Prude',
  parent: 'serious',
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:75, ace:25 },
});

Archetype.register(ArchetypeCode.reserved, {
  name: 'Reserved',
  sexStyle: SexStyle.submissive,
  sexualityRatio: { straight:40, gay:20, bi:20, ace:30 },
});

Archetype.register(ArchetypeCode.savage, {
  name: 'Savage',
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
  }
});

Archetype.register(ArchetypeCode.serious, {
  name: 'Serious',
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:60, gay:20, bi:20, ace:5 },
});

Archetype.register(ArchetypeCode.slut, {
  name: 'Slut',
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
});

Archetype.register(ArchetypeCode.sweet, {
  name: 'Sweet',
  requires: 'gender.not-male',
  sexStyle: SexStyle.gentle,
  sexualityRatio: { straight:40, gay:20, bi:30, ace:5 },
  sexualPreferences:{
    'affection-slut': { chance:50, strength:[10,30] },
    'slut':           { chance:20, strength:[10,20] },
    'other-parts':    { chance:10, strength:[10,20] },
  }
});

Archetype.register(ArchetypeCode.timid, {
  name: 'Timid',
  sexStyle: SexStyle.bashful,
  sexualityRatio: { straight:40, gay:30, bi:30, ace:20 },
  sexualPreferences:{
    'bottom': { chance:50, strength:[10,30] },
  }
});

Archetype.register(ArchetypeCode.vermenDom, {
  name: 'Dominant Vermen',
  requires: 'species.vermen',
  sexStyle: SexStyle.rough,
  sexualityRatio: { straight:80, gay:10, bi:10 },
  sexualPreferences: {
    'top':         { chance:60, strength:[20,40], atLeast:1 },
    'other-rough': { chance:30, strength:[10,20] },
    'perverted':   { chance:60, strength:[20,40] },
    'beast-lover': { chance:60, strength:[20,30] },
    'orgy-lover':  { chance:50, strength:[20,30] },
  },
});

Archetype.register(ArchetypeCode.vermenSub, {
  name: 'Submissive Vermen',
  requires: 'species.vermen',
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
  require: { from:'bottom' }
});
