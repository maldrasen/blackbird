
NegotiationQuestion.register('if-refuse', {
  text: `{T:TargetName} lets the weapon drop an inch. "And if I say no?"`,
  answers: {
    [NegotiationTone.dominant]: `Then this ends the way it started. Badly, for you.`,
    [NegotiationTone.kind]:     `Then you walk away, and we pretend this never happened.`,
    [NegotiationTone.boastful]: `You won't. You already know I'm the best offer you'll get.`,
    [NegotiationTone.lewd]:     `Then I'd be disappointed. I think we'd suit each other.`,
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.dominant]: { fear:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-30, respect:-30 },
    [NegotiationTone.boastful]: { affection:20, respect:40 },
    [NegotiationTone.lewd]:     { affection:10, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.dominant]: { fear:20 },
    [NegotiationTone.kind]:     { affection:-20 },
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:50, respect:10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:80 },
    [NegotiationTone.kind]:     { affection:50, fear:-40, respect:10 },
    [NegotiationTone.boastful]: { affection:-10, fear:20 },
    [NegotiationTone.lewd]:     { affection:-10, fear:30 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:40, respect:-20 },
    [NegotiationTone.kind]:     { affection:50, fear:-20, respect:20 },
    [NegotiationTone.boastful]: { affection:-10, respect:10 },
    [NegotiationTone.lewd]:     { affection:10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80, text: `{T:TargetName} snorts, but {T:his} grip on the weapon eases a little. "Finally, a straight answer."` },
    [NegotiationTone.kind]:     { affection:-20, respect:-40 },
    [NegotiationTone.boastful]: { affection:10, respect:40 },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.dominant]: { affection:30, fear:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-20 },
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.kind]:     { affection:10 },
    [NegotiationTone.boastful]: { affection:30, respect:10 },
    [NegotiationTone.lewd]:     { affection:40, respect:10 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:40, respect:10 },
    [NegotiationTone.kind]:     { affection:40, respect:20 },
    [NegotiationTone.boastful]: { affection:-20, respect:-10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-20 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:20 },
    [NegotiationTone.kind]:     { affection:30, respect:20 },
    [NegotiationTone.boastful]: { affection:-20, respect:-30 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-30 },
  },
});

NegotiationQuestion.registerReaction('if-refuse', {
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10, text: `Some of the tension bleeds out of {T:TargetName's} shoulders. "You'd really just... let me go?"` },
    [NegotiationTone.boastful]: { affection:-10, fear:30 },
    [NegotiationTone.lewd]:     { affection:-20, fear:40 },
  },
});
