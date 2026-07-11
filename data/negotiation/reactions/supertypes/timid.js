// Baseline reactions for the timid supertype: gentleness wins them over, aggression just frightens them.

NegotiationReaction.register('why-follow--supertype-timid', {
  question: 'why-follow',
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, fear:20 },
    [NegotiationTone.kind]:     { affection:60, fear:-30, respect:10 },
    [NegotiationTone.dominant]: { affection:-30, fear:70, respect:10 },
    [NegotiationTone.honest]:   { affection:30, fear:-10, respect:20 },
  },
});

NegotiationReaction.register('what-want--supertype-timid', {
  question: 'what-want',
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:80 },
    [NegotiationTone.honest]:   { affection:30, fear:-10, respect:10 },
    [NegotiationTone.kind]:     { affection:50, fear:-30, respect:10 },
    [NegotiationTone.lewd]:     { affection:-20, fear:30 },
  },
});

NegotiationReaction.register('if-refuse--supertype-timid', {
  question: 'if-refuse',
  supertype: NegotiationSupertype.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-40, fear:80 },
    [NegotiationTone.kind]:     { affection:50, fear:-40, respect:10 },
    [NegotiationTone.boastful]: { affection:-10, fear:20 },
    [NegotiationTone.lewd]:     { affection:-10, fear:30 },
  },
});
