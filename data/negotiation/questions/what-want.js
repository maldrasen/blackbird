NegotiationQuestion.register('what-want', {
  text: `"And what is it you'd want from me?" {T:targetName} asks, wary.`,
  answers: {
    [NegotiationTone.dominant]: `Obedience. You'd be mine, completely.`,
    [NegotiationTone.honest]:   `Your strength at my side. Nothing you'd resent giving.`,
    [NegotiationTone.kind]:     `Only what you'd offer freely. I won't take more.`,
    [NegotiationTone.lewd]:     `Company, mostly. The nights down here get lonely.`,
  },
});

NegotiationQuestion.registerReaction('what-want', {
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.dominant]: { affection:10, fear:30, respect:50 },
    [NegotiationTone.honest]:   { affection:20, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-30 },
    [NegotiationTone.lewd]:     { affection:20, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:10, respect:10 },
    [NegotiationTone.honest]:   { affection:10 },
    [NegotiationTone.kind]:     { affection:-20, respect:-10 },
    [NegotiationTone.lewd]:     { affection:60, respect:10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:80 },
    [NegotiationTone.honest]:   { affection:30, fear:-10, respect:10 },
    [NegotiationTone.kind]:     { affection:50, fear:-30, respect:10 },
    [NegotiationTone.lewd]:     { affection:-20, fear:30 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:30, respect:-20 },
    [NegotiationTone.honest]:   { affection:50, respect:30 },
    [NegotiationTone.kind]:     { affection:40, fear:-20, respect:10 },
    [NegotiationTone.lewd]:     { affection:10, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80 },
    [NegotiationTone.honest]:   { respect:10 },
    [NegotiationTone.kind]:     { affection:-20, respect:-40, text: `"How generous." {T:TargetName's} lip curls. "I don't follow doormats."` },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.dominant]: { affection:40, fear:30, respect:20 },
    [NegotiationTone.honest]:   { affection:-20, respect:-10 },
    [NegotiationTone.kind]:     { affection:10, respect:-20 },
    [NegotiationTone.lewd]:     { affection:30, fear:10, respect:-10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:10 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:50, respect:10 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:40 },
    [NegotiationTone.honest]:   { affection:50, respect:30 },
    [NegotiationTone.kind]:     { affection:30, respect:10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-20 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:10 },
    [NegotiationTone.honest]:   { affection:40, respect:40 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-30 },
  },
});

NegotiationQuestion.registerReaction('what-want', {
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10 },
    [NegotiationTone.honest]:   { affection:40, fear:-10, respect:20 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10 },
    [NegotiationTone.lewd]:     { affection:-20, fear:40,
      text: `{T:TargetName} shrinks back, {T:his} cheeks coloring.` },
  },
});
