
// TODO: Dick slap really only makes sense when the target is much snorter than the player. Rather limiting this to
//   only kobolds there should be a requirement that to see if a character is much shorter than another, so that this
//   will work with vermen and havlins.

NegotiationQuestion.register('get-out-cocks-out', {
  text: `"Only one way to settle this, with our cocks out like real men."`,
  staticRequirements: [
    CharacterRequirements.notVisibleCock('P'),
    CharacterRequirements.notVisibleCock('T'),
    CharacterRequirements.isMale('P'),
    CharacterRequirements.isMale('T'),
    CharacterRequirements.hasCock('P'),
    CharacterRequirements.hasCock('T'),
  ],
  answers: {
    no:       { text:`"What? Here?"` },
    youFirst: { text:`"You first."` },
    yes:      { text:`You whip it out.` },
    dickSlap: { text:`You whip it out and slap {T:him} across the face with it.` },
  }
});

const dickSlapLose = `The kobold dodges out of the way and snarls, "Ha! Too slow asshole."`
const dickSlapWin = `The kobold's head snaps back as you slap him across the face with your {P:thickSixInchLongCock}. 
  He looks momentarily stunned, but wipes his face with his arm and gives you a smile.`

NegotiationQuestion.registerReaction('get-out-cocks-out', {
  monster: 'kobold-dick-puncher',
  reactions: {
    no:       NegotiationReaction.attack(`"Don't you know where the fuck you even are? This is Rhysh motherfucker!"`),
    youFirst: NegotiationReaction.respect(`"Heh, you'd like that wouldn't you? Fine. We can pretend to be civilized." `),
    yes:      NegotiationReaction.ability('dick-punch',`"Ha, idiot!" The little bastard punches you in the dick.`),
    dickSlap: NegotiationReaction.contest({
      attribute: Attrib.dexterity,
      win: NegotiationReaction.greatRespect(dickSlapWin, { flags:{ playerCockOut:true }}),
      loss: NegotiationReaction.attack(dickSlapLose),
    }),
  }
});

// ==========================================
//    Lewd Reaction and Follow Up Question
// ==========================================

const cocksOut = { monsterCockOut:true, playerCockOut:true };
const hardCocksOut = { monsterCockOut:true, playerCockOut:true, monsterCockHard:true, playerCockHard:true };
const lewdStripYou = `{T:TargetName} grins viciously, "Where else? Now, show me your dick asshole." The {T:species.elf}
  rushes forward aggressively, ready to strip you by force.`;
const lewdShowYou = `{T:TargetName} smiles and reaches down, pulling {T:his} {P:thickSixInchLongCock} free and starts
  lewdly stroking {T:him}self. "Your turn."`;
const lewdCocksOut = `{T:TargetName} grins, looking you over lewdly as you both free your cocks from their confinement.
  He strokes {T:him}self shameless as {T:he} stares at your {P:thickSixInchLongCock}.`;
const lewdDickSlap = `{T:TargetName} reaches down to free {T:his} cock from it's confinement. When your
  {P:thickSixInchLongCock} slaps {T:him} across {T:his} face {T:he} looks up, momentarily stunned. {T:He} opens {T:his}
  mouth wide, letting you slap your cock against {T:his} tongue while {T:he} strokes {T:his} own cock. Finely {T:he} 
  gives the tip a wet kiss and smiles up at you, "I like the way you think."`;

NegotiationQuestion.registerReaction('get-out-cocks-out', {
  style: NegotiationStyle.lewd,
  reactions: {
    no:       NegotiationReaction.attack(lewdStripYou),
    youFirst: NegotiationReaction.followUp(lewdShowYou, { question:'get-out-cocks-out-your-turn', feelings:NegotiationReaction.getFeelings('lust'), flags:{ monsterCockOut:true }}),
    yes:      NegotiationReaction.lust(lewdCocksOut,{ flags:cocksOut }),
    dickSlap: NegotiationReaction.love(lewdDickSlap,{ flags:hardCocksOut }),
  }
});

NegotiationQuestion.register('get-out-cocks-out-your-turn', {
  text: `{T:TargetName} is waiting, Pull your cock out?`,
  followUp: true,
  answers: {
    yes: { text:`You whip it out.` },
    no: { text:`"No, I don't think so."` },
  }
});

NegotiationQuestion.registerReaction('get-out-cocks-out-your-turn', {
  style: NegotiationStyle.lewd,
  reactions: {
    yes: NegotiationReaction.lust(`{T:TargetName} grins, looking you over appreciatively, still stroking {T:his} hardening shaft, "Nice..."`,{ flags:{ playerCockOut:true, monsterCockHard:true }}),
    no: NegotiationReaction.attack(`"Well fuck you then!" {T:TargetName} grabs onto {hisWeaponName(T)} and attacks, his dick swinging wildly as {T:he} charges you.`),
  }
});
