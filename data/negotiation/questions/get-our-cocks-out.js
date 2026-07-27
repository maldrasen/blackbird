
NegotiationQuestion.register('get-out-cocks-out', {
  text: `Only one way to settle this, with our cocks out like real men.`,
  requires: [
    WeaverRequirements.isMale('A'),
    WeaverRequirements.isMale('T'),
    WeaverRequirements.hasCock('A'),
    WeaverRequirements.hasCock('T'),
  ],
  answers: {
    'no':        { text:`"What? Here?"` },
    'you-first': { text:`"You first."` },
    'yes':       { text:`Whip it out.` },
    'dick-slap': { text:`Whip it out, and slap {T:him} across the face with it.` },
  }
});

const dickSlapLose = `The kobold dodges out of the way and snarls, "Ha! Too slow asshole."`
const dickSlapWin = `The kobold's head snaps back as you slap him across the face with your {A:thickSixInchLongCock}. 
  He looks momentarily stunned, but wipes his face with his arm and gives you a smile.`

NegotiationQuestion.registerReaction('get-out-cocks-out', {
  monster: 'kobold-dick-puncher',
  reactions: {
    'no':        NegotiationReaction.attack(`"Don't you know where the fuck you even are? This is Rhysh motherfucker!"`),
    'you-first': NegotiationReaction.respect(`"Heh, you'd like that wouldn't you? Fine. Let's " `),
    'yes':       NegotiationReaction.disrespect(`"Ha, idiot!" The little bastard punches you in the dick.`, { useAbility:'dick-punch' }),
    'dick-slap': NegotiationReaction.contest({
      attribute: Attrib.dexterity,
      win: { reaction:'respect', text:dickSlapWin },
      loss: { complete:'failure', text:dickSlapLose },
    }),
  }
});

// TODO: We'll need reactions for these styles, when there are monsters other than kobolds.
//   - NegotiationStyle.fierce
//   - NegotiationStyle.lewd
//   - NegotiationStyle.playful
//   - NegotiationStyle.brat

