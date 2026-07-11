// Baseline reactions for the lewd supertype: flirtation and swagger charm them, earnest kindness bores them.

NegotiationReaction.register('why-follow--supertype-lewd', {
  question: 'why-follow',
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.boastful]: { affection:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-20 },
    [NegotiationTone.dominant]: { affection:20, fear:10, respect:20 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationReaction.register('what-want--supertype-lewd', {
  question: 'what-want',
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:10, respect:10 },
    [NegotiationTone.honest]:   { affection:10 },
    [NegotiationTone.kind]:     { affection:-20, respect:-10 },
    [NegotiationTone.lewd]:     { affection:60, respect:10 },
  },
});

NegotiationReaction.register('if-refuse--supertype-lewd', {
  question: 'if-refuse',
  supertype: NegotiationSupertype.lewd,
  responses: {
    [NegotiationTone.dominant]: { fear:20 },
    [NegotiationTone.kind]:     { affection:-20 },
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:50, respect:10 },
  },
});
