// A brat wants someone worth defying: dominance thrills her, earnestness bores her.

NegotiationReaction.register('why-follow--archetype-brat', {
  question: 'why-follow',
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.kind]:     { affection:10, respect:-20 },
    [NegotiationTone.dominant]: { affection:40, fear:30, respect:20 },
    [NegotiationTone.honest]:   { affection:-20, respect:-10 },
  },
});

NegotiationReaction.register('what-want--archetype-brat', {
  question: 'what-want',
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.dominant]: { affection:40, fear:30, respect:20 },
    [NegotiationTone.honest]:   { affection:-20, respect:-10 },
    [NegotiationTone.kind]:     { affection:10, respect:-20 },
    [NegotiationTone.lewd]:     { affection:30, fear:10, respect:-10 },
  },
});

NegotiationReaction.register('if-refuse--archetype-brat', {
  question: 'if-refuse',
  archetype: ArchetypeCode.brat,
  responses: {
    [NegotiationTone.dominant]: { affection:30, fear:40, respect:20 },
    [NegotiationTone.kind]:     { affection:-20, respect:-20 },
    [NegotiationTone.boastful]: { affection:20, respect:10 },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});
