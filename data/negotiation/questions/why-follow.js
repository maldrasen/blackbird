NegotiationQuestion.register('why-follow', {
  text: `{T:TargetName} tilts {T:his} head. "So. Why should something like me follow someone like you?"`,
  answers: {
    [NegotiationTone.boastful]: `Because I'm the strongest thing you'll ever stand beside.`,
    [NegotiationTone.kind]:     `Because I'll treat you better than this place ever has.`,
    [NegotiationTone.dominant]: `Because the alternative is my blade in your throat.`,
    [NegotiationTone.honest]:   `Honestly? You might do fine alone. But I'd rather have you.`,
  },
});
