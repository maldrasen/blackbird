
NegotiationQuestion.register('show-it-to-me', {
  text: `Hmm, I want to know what you're working with. Why don't you whip it out for me?`,
  staticRequirements: [
    WeaverRequirements.notVisibleCock('P'),
    WeaverRequirements.hasCock('P'),
  ],
  answers: {
    threaten: `You raise your weapon, pointing it at {T:him}.`,
    no: `You shake your head, "Maybe we should get to know each other first."`,
    yes: `You whip it out.`,
  }
});

NegotiationQuestion.registerReaction('show-it-to-me', {
  style: NegotiationStyle.lewd,
  reactions: {
    threaten: NegotiationReaction.hate(`{T:TargetName} backs away, "The fuck is wrong with you? You hate having fun or something?"`),
    no: NegotiationReaction.dislike(`{T:TargetName} frowns, "That's what I'm trying to do asshole."`),
    yes: NegotiationReaction.lust(`{T:TargetName} grins and steps a little closer, staring at your exposed shaft. "Mmm, that's more like it."`,{ flags:{ playerCockOut:true }}),
  }
});
