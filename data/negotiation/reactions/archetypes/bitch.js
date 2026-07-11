// She respects strength and confidence and reads kindness as weakness.

NegotiationReaction.register('why-follow--archetype-bitch', {
  question: 'why-follow',
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.boastful]: { affection:10, respect:40 },
    [NegotiationTone.kind]:     { affection:-20, respect:-40,
      text: `{T:TargetName} rolls {T:his} eyes. "Gods, you're one of those."` },
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80,
      text: `{T:TargetName} bares {T:his} teeth in something like a grin. "There it is. At least you're not soft."` },
    [NegotiationTone.honest]:   { respect:10 },
  },
});

NegotiationReaction.register('what-want--archetype-bitch', {
  question: 'what-want',
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80 },
    [NegotiationTone.honest]:   { respect:10 },
    [NegotiationTone.kind]:     { affection:-20, respect:-40,
      text: `"How generous." {T:TargetName's} lip curls. "I don't follow doormats."` },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});

NegotiationReaction.register('if-refuse--archetype-bitch', {
  question: 'if-refuse',
  archetype: ArchetypeCode.bitch,
  responses: {
    [NegotiationTone.dominant]: { affection:20, fear:20, respect:80,
      text: `{T:TargetName} snorts, but {T:his} grip on the weapon eases a little. "Finally, a straight answer."` },
    [NegotiationTone.kind]:     { affection:-20, respect:-40 },
    [NegotiationTone.boastful]: { affection:10, respect:40 },
    [NegotiationTone.lewd]:     { affection:30, respect:-10 },
  },
});
