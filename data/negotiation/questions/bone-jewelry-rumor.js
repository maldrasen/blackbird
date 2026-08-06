
NegotiationQuestion.register('bone-jewelry-rumor', {
  text: `"You know, I heard this rumor that humans make jewelry from {T:species.elf} bones."`,
  staticRequirements: [
    CharacterRequirements.isSpecies('P','human'),
  ],
  answers: {
    no:    { text: `"No, that's not true."`},
    maybe: { text: `"Well, maybe some people do, but I wouldn't."`},
    yes:   { text: `"I think you'd make a fine necklace."`},
    soup:  { text: `"Of course not. We make soup out of them."`},
    lewd:  { text: `"We only make sex toys that way."`}
  }
});

NegotiationQuestion.registerReaction('bone-jewelry-rumor', {
  style: NegotiationStyle.timid,
  reactions: {
    no:    NegotiationReaction.neutral(`"Oh... so the others are trying to trick me again."`),
    maybe: NegotiationReaction.like(`{T:targetName} nods and looks you over, "Hmm... well, maybe if you promise to keep people like that away from me."`),
    yes:   NegotiationReaction.run(`"Oh, um... hey look over there! Someone left some bones in the corner there."`),
    soup:  NegotiationReaction.run(`"Soup! Oh fuck that."`),
    lewd:  NegotiationReaction.dislike(`Sex toys? I guess you're into some freaky shit huh?`),
  }
});

NegotiationQuestion.registerReaction('bone-jewelry-rumor', {
  style: NegotiationStyle.fierce,
  species: 'kobold',
  reactions: {
    no: NegotiationReaction.dislike(`{T:TargetName} nods, "Yeah, I didn't think so. You humans are boring as fuck."`),
    maybe: NegotiationReaction.disrespect(`{T:He} frowns, "What? You too good for bones?"`),
    yes: NegotiationReaction.respect(`{T:He} smiles and nods, "Hell yeah I would. 'Specially the claws, nice and sharp."`),
    soup: NegotiationReaction.respect(`{T:He} nods thoughtfully, "Hmm, makes sense. You gotta eat."`),
    lewd: NegotiationReaction.dislike(`{T:TargetName} frowns, "That's fucking stupid. Are you mocking me?"`),
  }
});
