// Easily frightened, but opens up to anyone who is gentle with her.

NegotiationReaction.register('why-follow--archetype-timid', {
  question: 'why-follow',
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.boastful]: { affection:-10, fear:30 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10,
      text: `{T:TargetName's} eyes go wide, hardly daring to believe it. "You... you mean that?"` },
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10,
      text: `{T:TargetName} flinches hard, {T:his} weapon trembling.` },
    [NegotiationTone.honest]:   { affection:40, fear:-10, respect:20 },
  },
});

NegotiationReaction.register('what-want--archetype-timid', {
  question: 'what-want',
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10 },
    [NegotiationTone.honest]:   { affection:40, fear:-10, respect:20 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10 },
    [NegotiationTone.lewd]:     { affection:-20, fear:40,
      text: `{T:TargetName} shrinks back, {T:his} cheeks coloring.` },
  },
});

NegotiationReaction.register('if-refuse--archetype-timid', {
  question: 'if-refuse',
  archetype: ArchetypeCode.timid,
  responses: {
    [NegotiationTone.dominant]: { affection:-20, fear:80, respect:10 },
    [NegotiationTone.kind]:     { affection:70, fear:-40, respect:10,
      text: `Some of the tension bleeds out of {T:TargetName's} shoulders. "You'd really just... let me go?"` },
    [NegotiationTone.boastful]: { affection:-10, fear:30 },
    [NegotiationTone.lewd]:     { affection:-20, fear:40 },
  },
});
