
NegotiationQuestion.register('become-a-minion', {
  text: `So… you want to become one of my minions huh?`,
  answers: {
    liar:       { text:`"Liar. You don't have fucking minions."` },
    backwards:  { text:`"I think you might have that backwards."` },
    takeCharge: { text:`"Hmm, I might consider letting you take charge. Every once and a while."` },
  }
});

NegotiationQuestion.registerReaction('become-a-minion', {
  style: NegotiationStyle.fierce,
  reactions: {
    liar: NegotiationReaction.respect(`{T:He} chuckles and shakes {T:his} head, "Heh, fine. Not yet anyway."`),
    // TODO: Placeholder win prose, rewrite as needed.
    backwards: NegotiationReaction.contest({
      skill: 'conversation',
      win: NegotiationReaction.respect(`{T:He} squints at you for a long moment, then barks out a laugh, "Heh. Ballsy. Fine, maybe you're not a complete pussy."`),
      loss: NegotiationReaction.dislike(`"Me mer me mi ma ma mackmards," {T:he} says mockingly, "Gods you sound like a douche."`),
    }),
    takeCharge: NegotiationReaction.disrespect(`{T:He} gives you a mocking grin, "You {P:species.elves} are such pussies."`),
  }
});
