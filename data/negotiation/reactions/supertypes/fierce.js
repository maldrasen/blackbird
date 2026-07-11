// Baseline reactions for the fierce supertype: strength earns respect, kindness reads as weakness.

NegotiationReaction.register('why-follow--supertype-fierce', {
  question: 'why-follow',
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.boastful]: { affection:10, respect:30 },
    [NegotiationTone.kind]:     { affection:-30, respect:-40 },
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:60 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationReaction.register('what-want--supertype-fierce', {
  question: 'what-want',
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.dominant]: { affection:10, fear:30, respect:50 },
    [NegotiationTone.honest]:   { affection:20, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-30 },
    [NegotiationTone.lewd]:     { affection:20, respect:-10 },
  },
});

NegotiationReaction.register('if-refuse--supertype-fierce', {
  question: 'if-refuse',
  supertype: NegotiationSupertype.fierce,
  responses: {
    [NegotiationTone.dominant]: { fear:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-30, respect:-30 },
    [NegotiationTone.boastful]: { affection:20, respect:40 },
    [NegotiationTone.lewd]:     { affection:10, respect:-10 },
  },
});
