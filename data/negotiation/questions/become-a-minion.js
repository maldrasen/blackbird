
NegotiationQuestion.register('become-a-minion', {
  text: `I see. So you want to become one of my minions.`,
  answers: [
    { key:'liar', text:`"Liar. You don't have fucking minions."` },
    { key:'backwards', text:`"I think you might have that backwards."` },
    { key:'take-charge', text:`"Hmm, I might consider letting you take charge. Every once and a while."` },
  ],
});
