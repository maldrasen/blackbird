
NegotiationQuestion.register('what-are-you-doing-here', {
  text: `"So, what's a {P:man} like you doing in a place like this?"`,
  staticRequirements: [
    CharacterRequirements.isSpecies('P','human'),
  ],
  answers: {
    destroy: { text:`"I'm here to destroy the dungeon."` },
    answers: { text:`"This world is filled with mysteries, and this dungeon holds the answers."` },
    kill:    { text:`"To kill monsters and take their stuff of course."` },
    sex:     { text:`"I'm just looking for some new sex toys."` },
  }
});

NegotiationQuestion.registerReaction('what-are-you-doing-here', {
  style: NegotiationStyle.fierce,
  reactions: {
    destroy: NegotiationReaction.disrespect(`"Destroy the dungeon? You?" {T:targetName} laughs, "Yeah... right."`),
    answers: NegotiationReaction.dislike(`{T:TargetName} spits on the ground, "You humans overthink everything."`),
    kill: NegotiationReaction.respect(`{T:TargetName} smiles and nods, "Hmm, maybe we're not so different after all."`),
    sex: NegotiationReaction.attack(`{T:TargetName} snarls, "Is that what you think I am? A fucking toy?"`),
  },
});

NegotiationQuestion.registerReaction('what-are-you-doing-here', {
  style: NegotiationStyle.lewd,
  reactions: {
    destroy: NegotiationReaction.attack(`"Fucking humans, all you fucking care about it killing and ruining things for everyone else. Well fuck you!"`),
    answers: NegotiationReaction.dislike(`"There are much better things to hold than answers you know..."`),
    kill: NegotiationReaction.attack(`{T:TargetName} growls, "Oh, so that's how you want it is it?"`),
    sex: NegotiationReaction.like(`{T:TargetName} grins, "Mmm... at least you're honest about what you want."`)
  },
});

const timidSexToys = `{T:TargetName} looks thoughtful, seemingly unaware that you're talking about {T:him}. "Sex toys? 
  Hmm, you know, every once and a while we find a big box full of them. Um... it's probably going to be hard to find any 
  that haven't been used already."`

NegotiationQuestion.registerReaction('what-are-you-doing-here', {
  style: NegotiationStyle.timid,
  reactions: {
    destroy: NegotiationReaction.dislike(`"Destroy the dungeon... wouldn't that just kill everyone? You'd be killing yourself too you know."`),
    answers: NegotiationReaction.respect(`"Mysteries? I don't really know anything like that. But just looking around is fine I guess."`),
    kill:    NegotiationReaction.run(`"Oh? Well... You can't kill what you can't catch asshole!"`),
    sex:     NegotiationReaction.like(timidSexToys),
  },
});
