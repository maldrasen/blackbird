
NegotiationQuestion.register('no-interest-in-men', {
  text: `The {T:species.elf} crosses his arms over his chest and frowns, "Just so you know, I've got no interest in men like you."`,
  staticRequirements: [
    CharacterRequirements.isMale('P'),
    CharacterRequirements.isMale('T'),
    CharacterRequirements.isStraight('T'),
  ],
  answers: {
    noNeed: { text:`You shake your head, "I don't need you for that."` },
    entertain: { text:`You give him a shrug, "I'm sure some of my girls can keep you entertained."`, requires:NegotiationRequirements.contextSet('F') },
    dontCare: { text:`You give him a lewd grin, "I don't really care if you're interested or not."` },
    noUse: { text:`You raise {yourWeaponName(P)}, pointing it at him, "I guess I have no use for you then."` },
  }
});

NegotiationQuestion.registerReaction('no-interest-in-men', {
  style: NegotiationStyle.fierce,
  reactions: {
    noNeed: NegotiationReaction.respect(`{T:TargetName} nods, "So long as we understand each other. I don't mind killing whoever needs killing, but I'm not one of your fuck holes."`),
    entertain: NegotiationReaction.love(`{T:TargetName} grins at {F:name}, "I see... Well, let's just say I'm starting to get interested."`, { rememberThis:{ key:'F', event:'offered-to-monster' }}),
    dontCare: NegotiationReaction.contest({
      skill: 'conversation',
      win: NegotiationReaction.respect(`{T:TargetName} gives you a knowing smile, "The strong take what they want. Alright, I can respect that."`),
      loss: NegotiationReaction.attack(`{T:TargetName} snarls, "I'll kill you first."`),
    }),
    noUse: NegotiationReaction.attack(`"Agreed."`),
  }
});
