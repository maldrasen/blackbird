NegotiationQuestion.register('if-refuse', {
  text: `{T:TargetName} lets the weapon drop an inch. "And if I say no?"`,
  answers: {
    [NegotiationTone.dominant]: `Then this ends the way it started. Badly, for you.`,
    [NegotiationTone.kind]:     `Then you walk away, and we pretend this never happened.`,
    [NegotiationTone.boastful]: `You won't. You already know I'm the best offer you'll get.`,
    [NegotiationTone.lewd]:     `Then I'd be disappointed. I think we'd suit each other.`,
  },
});
