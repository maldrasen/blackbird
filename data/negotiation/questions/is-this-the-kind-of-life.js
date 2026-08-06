
NegotiationQuestion.register('is-this-the-kind-of-life', {
  text: `"Is this really the kind of life you want?"`,
  answers: {
    onlyWay: { text:`"In this world, it's the only way to survive."` },
    retire:  { text:`"I could see myself retiring someday, settling down and raising a family."` },
    loveIt:  { text:`"You mean capturing monsters and turning them into my loyal sex slaves? What's not to love?"` },
  }
});

NegotiationQuestion.registerReaction('is-this-the-kind-of-life', {
  style: NegotiationStyle.timid,
  reactions: {
    onlyWay: NegotiationReaction.neutral(`{T:TargetName} shakes {T:his} head, "Or, you could just... stay out of the dungeon where you don't belong."`),
    retire: NegotiationReaction.contest({
      skill: 'conversation',
      win: NegotiationReaction.like(`"Hmm, that does sound nice."`),
      loss: NegotiationReaction.neutral(`{T:TargetName} eyes you doubtfully and shakes {T:his} head, "No one retires from what you do."`),
    }),
    loveIt: NegotiationReaction.run(`{T:TargetName's} eyes grow even wider, "Sex slave? That's what you want me for?"`),
  }
});

NegotiationQuestion.registerReaction('is-this-the-kind-of-life', {
  style: NegotiationStyle.lewd,
  reactions: {
    onlyWay: NegotiationReaction.hate(`"Is it? And whose fault do you think that is?"`),
    retire:  NegotiationReaction.pity(`"Really? That sounds boring as fuck to me."`),
    loveIt:  NegotiationReaction.respect(`{T:TargetName} grins and nods, "Fuck yeah. Grab whoever you want and turn them into piles of quivering fuck meat. That's the life right there."`),
  }
});
