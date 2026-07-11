// Baseline reactions for the warm supertype: kindness and honesty land well, threats sour them fast.

NegotiationReaction.register('why-follow--supertype-warm', {
  question: 'why-follow',
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, respect:10 },
    [NegotiationTone.kind]:     { affection:50, fear:-20, respect:10 },
    [NegotiationTone.dominant]: { affection:-40, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:40, respect:20 },
  },
});

NegotiationReaction.register('what-want--supertype-warm', {
  question: 'what-want',
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:30, respect:-20 },
    [NegotiationTone.honest]:   { affection:50, respect:30 },
    [NegotiationTone.kind]:     { affection:40, fear:-20, respect:10 },
    [NegotiationTone.lewd]:     { affection:10, respect:-10 },
  },
});

NegotiationReaction.register('if-refuse--supertype-warm', {
  question: 'if-refuse',
  supertype: NegotiationSupertype.warm,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:40, respect:-20 },
    [NegotiationTone.kind]:     { affection:50, fear:-20, respect:20 },
    [NegotiationTone.boastful]: { affection:-10, respect:10 },
    [NegotiationTone.lewd]:     { affection:10 },
  },
});
