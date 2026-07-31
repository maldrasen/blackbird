
NegotiationQuestion.register('how-do-you-taste', {
  text: `So what do humans taste like anyway?`,
  staticRequirements: [
    WeaverRequirements.isSpecies('P','human'),
  ],
  answers: {
    bad:     { text:`"Uh... really bad. You wouldn't like it at all."` },
    chicken: { text:`"Chicken maybe?"` },
    pork:    { text:`"I've heard humans taste a lot like pork."` },
    findOut: { text:`"Do you want to find out?"` },
  }
});

NegotiationQuestion.registerReaction('how-do-you-taste', {
  style: NegotiationStyle.lewd,
  reactions: {
    bad:     NegotiationReaction.neutral(`"Ugh, let me guess. Too busy killing people. Hasn't showered in weeks. It's fine, I don't mind a little crust."`),
    chicken: NegotiationReaction.dislike(`"You don't know? What are you some kind of virgin? Never gone down on anyone?"`),
    pork:    NegotiationReaction.dislike(`{T:TargetName} sticks {T:his} tongue out, "Pork… Ugh… Never did like the taste of pig dick."`),
    findOut: NegotiationReaction.lust(`{T:TargetName} grins, "Well… I wouldn't mind giving it a lick I suppose."`),
  }
});

// TODO: Kobold bite attack.

const koboldBite = `{T:TargetName} laughs and shakes his head, "I'm fucking with you. I already know humans are fucking 
  delicious. In fact…" The kobold suddenly lunges forward, his tooth filled maw wide open.`

NegotiationQuestion.registerReaction('how-do-you-taste', {
  style: NegotiationStyle.fierce,
  species: 'kobold',
  reactions: {
    bad:     NegotiationReaction.attack(koboldBite),
    chicken: NegotiationReaction.like(`The kobold laughs and shakes his head, "The fuck is a chicken?"`),
    pork:    NegotiationReaction.respect(`The kobold nods enthusiastically, "They really do. Fuck, I'm hungry now."`),
    findOut: NegotiationReaction.attack(`The kobold gives you a sly grin, "Well… if you insist…"`),
  }
});
