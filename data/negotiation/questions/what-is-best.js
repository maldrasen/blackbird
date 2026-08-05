
NegotiationQuestion.register('what-is-best', {
  text: `What is best in life?`,
  answers: {
    bullshit: { text:`"The warm sun on your face, the laughter of children."` },
    conan:    { text:`"To crush your enemies, see them driven before you, and to hear the lamentations of their women."` },
    comfort:  { text:`"A farm fire, cup of hot tea, a book, an obedient slave{T:ling} at your feet sucking on your toes."` },
    cock:     { text:`"Horsecock."` },
  }
});

const horsePreferences = { 'androphilic':30, 'beast-lover':30, 'cock-lover':20 };

NegotiationQuestion.registerReaction('what-is-best', {
  style: NegotiationStyle.fierce,
  reactions: {
    bullshit: NegotiationReaction.disrespect(`"The fuck are you talking about?"`),
    conan:    NegotiationReaction.attack(`{T:TargetName} grins, {T:his} hand tightening around {T:his} weapon, "This guys gets it! Let's dance motherfucker!"`),
    comfort:  NegotiationReaction.like(`Mmm, can't say that I'm really into toe sucking… doesn't sound too bad though. As long as I'm the one getting sucked.`),
    cock:     NegotiationReaction.contest({
      random: { win:1, loss:5 },
      win:  NegotiationReaction.love(`{T:TargetName's} eyes widen at your response, "Oh? So… you're into that too huh?"`, { givePreferences:horsePreferences }),
      loss: NegotiationReaction.disrespect(`{T:TargetName} spits on the ground, "Great… another fucking pervert."`),
    }),
  }
});

// TODO: Do reactions have requirements yet?

NegotiationQuestion.registerReaction('what-is-best', {
  style: NegotiationStyle.lewd,
  staticRequirements: [CharacterRequirements.hasCock('P')],
  reactions: {
    bullshit: NegotiationReaction.hate(`"Laaaaaame."`),
    conan: NegotiationReaction.dislike(`"Wow, real original."`),
    comfort: NegotiationReaction.contest({
      random: { win:3, loss:1 },
      win: NegotiationReaction.like(`{T:TargetName} smiles, glancing between your legs, "Mmm, not bad… There's something I'd rather be sucking on though."`),
      loss: NegotiationReaction.dislike(`"Into feet huh? Sorry not my thing hun."`),
    }),
    cock: NegotiationReaction.love(`{T:TargetName} grins and nods, "The bigger the better, am I right?"`, { givePreferences:horsePreferences }),
  }
});
