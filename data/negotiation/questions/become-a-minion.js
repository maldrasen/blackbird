
NegotiationQuestion.register('become-a-minion', {
  text: `"So... you want to become one of my minions huh?"`,
  answers: {
    liar:       { text:`"Liar. You don't have fucking minions."` },
    backwards:  { text:`"I think you might have that backwards."` },
    takeCharge: { text:`"Hmm, I might consider letting you take charge. Every once and a while."` },
  }
});

NegotiationQuestion.registerReaction('become-a-minion', {
  style: NegotiationStyle.fierce,
  reactions: {
    liar: Reaction.respect(`{T:He} chuckles and shakes {T:his} head, "Heh, fine. Not yet anyway."`),
    backwards: NegotiationContest({
      skill: 'conversation',
      win: Reaction.respect(`{T:TargetName} lets out a low growl and for a moment it looks like {T:He} might attack. {T:He} suddenly barks out a laugh, "You've got balls at least."`),
      loss: Reaction.dislike(`"Me mer me mi ma ma mackmards," {T:he} says mockingly, "Gods you sound like a douche."`),
    }),
    takeCharge: Reaction.disrespect(`{T:He} gives you a mocking grin, "You {P:species.elves} are such pussies."`),
  }
});
