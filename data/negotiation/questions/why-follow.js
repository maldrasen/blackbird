NegotiationQuestion.register('why-follow', {
  text: `{T:TargetName} tilts {T:his} head. "So. Why should something like me follow someone like you?"`,
  answers: {
    [NegotiationTone.boastful]: `Because I'm the strongest thing you'll ever stand beside.`,
    [NegotiationTone.kind]:     `Because I'll treat you better than this place ever has.`,
    [NegotiationTone.dominant]: `Because the alternative is my blade in your throat.`,
    [NegotiationTone.honest]:   `Honestly? You might do fine alone. But I'd rather have you.`,
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.boastful]: { affection:10, respect:30 },
    [NegotiationTone.kind]:     { affection:-30, respect:-40 },
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:60 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.boastful]: { affection:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-20 },
    [NegotiationTone.dominant]: { affection:20, fear:10, respect:20 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, fear:20 },
    [NegotiationTone.kind]:     { affection:60, fear:-30, respect:10 },
    [NegotiationTone.dominant]: { affection:-30, fear:70, respect:10 },
    [NegotiationTone.honest]:   { affection:30, fear:-10, respect:20 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, respect:10 },
    [NegotiationTone.kind]:     { affection:50, fear:-20, respect:10 },
    [NegotiationTone.dominant]: { affection:-40, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:40, respect:20 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.boastful]: { affection:10, respect:40 },
    [NegotiationTone.kind]:     { affection:-20, respect:-40, text: `{T:TargetName} rolls {T:his} eyes. "Gods, you're one of those."` },
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80, text: `{T:TargetName} bares {T:his} teeth in something like a grin. "There it is. At least you're not soft."` },
    [NegotiationTone.honest]:   { respect:10 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.kind]:     { affection:10, respect:-20 },
    [NegotiationTone.dominant]: { affection:40, fear:30, respect:20 },
    [NegotiationTone.honest]:   { affection:-20, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.boastful]: { affection:50, respect:20 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.boastful]: { affection:-20, respect:-20 },
    [NegotiationTone.kind]:     { affection:30, respect:10 },
    [NegotiationTone.dominant]: { affection:-10, fear:40, respect:10 },
    [NegotiationTone.honest]:   { affection:50, fear:-10, respect:30 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.boastful]: { affection:-20, respect:-30 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:20 },
    [NegotiationTone.honest]:   { affection:40, respect:40 },
  },
});

NegotiationQuestion.registerReaction('why-follow', {
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, fear:30 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10, text: `{T:TargetName's} eyes go wide, hardly daring to believe it. "You... you mean that?"` },
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10, text: `{T:TargetName} flinches hard, {T:his} weapon trembling.` },
    [NegotiationTone.honest]:   { affection:40, fear:-10, respect:20 },
  },
});
