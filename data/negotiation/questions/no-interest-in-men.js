
NegotiationQuestion.register('no-interest-men', {
  text: `The {T:species.elf} crosses his arms over his chest and frowns, "Just so you know, I've got no interest in men like you."`,
  staticRequirements: [
    CharacterRequirements.isMale('P'),
    CharacterRequirements.isMale('T'),
    CharacterRequirements.isStraight('T'),
  ],
  answers: {
    noNeed: { text:`You shake your head, "I don't need you for that."` },
    entertain: { text:`You give him a shrug, "I'm sure some of my girls can keep you entertained."` },
    dontCare: { text:`You give him a lewd grin, "I don't really care if you're interested or not."` },
    noUse: { text:`You raise {yourWeaponName(P)}, pointing it at him, "I guess I have no use for you then."` },
  }
});
