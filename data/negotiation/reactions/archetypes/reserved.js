// The reserved want plain honesty and a little distance; bombast and flirtation both push them away.

NegotiationReaction.register('why-follow--archetype-reserved', {
  question: 'why-follow',
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.boastful]: { affection:-20, respect:-20 },
    [NegotiationTone.kind]:     { affection:30, respect:10 },
    [NegotiationTone.dominant]: { affection:-10, fear:40, respect:10 },
    [NegotiationTone.honest]:   { affection:50, fear:-10, respect:30 },
  },
});

NegotiationReaction.register('what-want--archetype-reserved', {
  question: 'what-want',
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:40 },
    [NegotiationTone.honest]:   { affection:50, respect:30 },
    [NegotiationTone.kind]:     { affection:30, respect:10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-20 },
  },
});

NegotiationReaction.register('if-refuse--archetype-reserved', {
  question: 'if-refuse',
  archetype: ArchetypeCode.reserved,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:40, respect:10 },
    [NegotiationTone.kind]:     { affection:40, respect:20 },
    [NegotiationTone.boastful]: { affection:-20, respect:-10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-20 },
  },
});
