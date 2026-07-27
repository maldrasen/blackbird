
NegotiationQuestion.register('get-out-cocks-out', {
  text: `Only one way to settle this, with our cocks out like real men.`,
  requires: [
    WeaverRequirements.isMale('A'),
    WeaverRequirements.isMale('T'),
    WeaverRequirements.hasCock('A'),
    WeaverRequirements.hasCock('T'),
  ],
  answers: [
    { key:'no',        text:`"What? Here?"` },
    { key:'you-first', text:`"You first."` },
    { key:'yes',       text:`Whip it out.` },
    { key:'dick-slap', text:`Whip it out, and slap {T:him} across the face with it.` },
  ],
});

NegotiationQuestion.registerReaction('get-out-cocks-out', {
  monster: 'kobold-dick-puncher',
  reactions: {
    [NegotiationTone.modest]: NegotiationReaction.attack(`"Don't you know where the fuck you even are? This is Rhysh motherfucker!"`),
    [NegotiationTone.sly]: NegotiationReaction.respect(`"Heh, you'd like that wouldn't you? Fine. Let's " `),
    [NegotiationTone.lewd]: NegotiationReaction.disrespect(`"Ha, idiot!" The little bastard punches you in the dick.`, { useAbility:'dick-punch' }),
    [NegotiationTone.dominant]: NegotiationReaction.contest({
      attribute: Attrib.dexterity,
      win: { reaction:'respect', text:`The kobold's head snaps back as you slap him across the face with your {A:thickSixInchLongCock}. 
          He looks momentarily stunned, but wipes his face with his arm and gives you a smile.` },
      loss: { complete:'failure', text:`The kobold dodges out of the way and snarls, "Ha! Too slow asshole."` },
    }),
  }
});

// TODO: We'll need reactions for these styles, when there are monsters other than kobolds.
//   - NegotiationStyle.fierce
//   - NegotiationStyle.lewd
//   - NegotiationStyle.playful
//   - NegotiationStyle.brat

