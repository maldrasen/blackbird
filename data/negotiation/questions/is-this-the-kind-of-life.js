
NegotiationQuestion.register('is-this-the-kind-of-life', {
  text: `Is this really the kind of life you want?`,
  answers: {
    'only-way': { text:`"In this world, it's the only way to survive."` },
    'retire':   { text:`"I could see myself retiring someday, settling down and raising a family."` },
    'love-it':  { text:`"You mean capturing monsters and turning them into my loyal sex slaves? What's not to love?"` },
  }
});

NegotiationQuestion.registerReaction('is-this-the-kind-of-life', {
  style: NegotiationStyle.timid,
  reactions: {
    'only-way': NegotiationReaction.neutral(`{T:TargetName} shakes his head, "Or, you could just… stay out of the dungeon where you don't belong."`),
    'retire': NegotiationReaction.like(`"Hmm, that does sound nice."`),
    'love-it': NegotiationReaction.run(`{T:TargetName's} eyes grow even wider, "Sex slave? That's what you want me for?"`),
  }
});
