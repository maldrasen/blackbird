// The playful follow whoever promises the most fun; heavy-handed threats kill the game.

NegotiationReaction.register('why-follow--archetype-playful', {
  question: 'why-follow',
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.boastful]: { affection:50, respect:20 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:10, respect:10 },
  },
});

NegotiationReaction.register('what-want--archetype-playful', {
  question: 'what-want',
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.honest]:   { affection:10 },
    [NegotiationTone.kind]:     { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:50, respect:10 },
  },
});

NegotiationReaction.register('if-refuse--archetype-playful', {
  question: 'if-refuse',
  archetype: ArchetypeCode.playful,
  responses: {
    [NegotiationTone.dominant]: { affection:-30, fear:30, respect:-10 },
    [NegotiationTone.kind]:     { affection:10 },
    [NegotiationTone.boastful]: { affection:30, respect:10 },
    [NegotiationTone.lewd]:     { affection:40, respect:10 },
  },
});
