NegotiationQuestion.register('what-want', {
  text: `"And what is it you'd want from me?" {T:targetName} asks, wary.`,
  answers: {
    [NegotiationTone.dominant]: `Obedience. You'd be mine, completely.`,
    [NegotiationTone.honest]:   `Your strength at my side. Nothing you'd resent giving.`,
    [NegotiationTone.kind]:     `Only what you'd offer freely. I won't take more.`,
    [NegotiationTone.lewd]:     `Company, mostly. The nights down here get lonely.`,
  },
});
