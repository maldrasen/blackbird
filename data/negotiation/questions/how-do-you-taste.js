
NegotiationQuestion.register('how-do-you-taste', {
  text: `So what do humans taste like anyway?`,
  requires: WeaverRequirements.isSpecies('P','human'),
  answers: {
    'bad':      { text:`"Uh... really bad. You wouldn't like it at all."` },
    'chicken':  { text:`"Chicken maybe?"` },
    'pork':     { text:`"I've heard humans taste a lot like pork."` },
    'find-out': { text:`"Do you want to find out?"` },
  }
});

NegotiationQuestion.registerReaction('how-do-you-taste', {
  style: NegotiationStyle.lewd,
  reactions: {
    'bad':      NegotiationReaction.neutral(`"Ugh, let me guess. Too busy killing people. Hasn't showered in weeks. It's fine, I don't mind a little crust."`),
    'chicken':  NegotiationReaction.dislike(`"You don't know? What are you some kind of virgin? Never gone down on anyone?"`),
    'pork':     NegotiationReaction.dislike(`{T:TargetName} sticks {T:his} tongue out, "Pork… Ugh… Never did like the taste of pig dick."`),
    'find-out': NegotiationReaction.lust(`{T:TargetName} grins, "Well… I wouldn't mind giving it a lick I suppose."`),
  }
});
