// The serious weigh the offer on its merits: directness earns respect, boasting and flirtation lose it.

NegotiationReaction.register('why-follow--archetype-serious', {
  question: 'why-follow',
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.boastful]: { affection:-20, respect:-30 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:20 },
    [NegotiationTone.honest]:   { affection:40, respect:40 },
  },
});

NegotiationReaction.register('what-want--archetype-serious', {
  question: 'what-want',
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:10 },
    [NegotiationTone.honest]:   { affection:40, respect:40 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-30 },
  },
});

NegotiationReaction.register('if-refuse--archetype-serious', {
  question: 'if-refuse',
  archetype: ArchetypeCode.serious,
  responses: {
    [NegotiationTone.dominant]: { affection:-10, fear:20, respect:20 },
    [NegotiationTone.kind]:     { affection:30, respect:20 },
    [NegotiationTone.boastful]: { affection:-20, respect:-30 },
    [NegotiationTone.lewd]:     { affection:-30, respect:-30 },
  },
});
