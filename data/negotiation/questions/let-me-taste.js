
NegotiationQuestion.register('let-me-taste', {
  text: `{T:TargetName} smiles, staring at your {P:thickSixInchLongCock}, "Okay… let me taste it."`,
  requires: [
    NegotiationRequirements.isTrue('playerCockOut'),
  ],
  answers: {
    no: `You frown and shake your head, "No, I don't think so."`,
    beg: `You cross you arms over your chest and shake your head, "Beg me for it."`,
    lick: `You smile down at {T:him} and nod, "Hmm, okay. But just a lick."`,
    suck: `You give {T:him} a lustful smile, grab {T:him} by the back of the head, and shove your cock into {T:his} mouth.`,
    piss: `Looking down into {T:targetName's} open mouth, you decide to piss into it.`
  }
});

const koboldLick = `{T:TargetName} extends {T:his} long forked tongue, wrapping it tightly around your shaft, rubbing 
  your cockhead against {T:his} surprisingly soft lips before releasing it with a satisfied grin.`;

const koboldSuck = `{T:TargetName's} eyes widen as your {P:thickCock} fills {T:his} mouth. {T:He} closes his eyes as 
  you thrust forward, savoring the feeling of your cock hardening in {T:his} mouth. {T:He} pulls away as soon as 
  you're fully hard though, giving you a wide toothy grin.`;

const koboldPissWin = `{T:TargetName's} eyes widen in shock as your hot piss suddenly fills {T:his} wide open mouth. 
  Rather than pulling away though he slowly closes his eyes and swallows obediently, gulping down mouthfuls of urine 
  until you've completely emptied your bladder into {T:his} waiting maw. You shake your cock off, slapping your wet
  member against the lizard's scaled face. Once you're finished marking {T:him} {T:he} gives you a simple nod, 
  acknowledging your ownership of {T:him} now.`

const koboldPissLoss = `{T:TargetName} lets out an angry screech and scurries away from you. {T:He} spits on the 
  ground, trying to get the taste out of {T:his} mouth. With a glare in your direction {T:he} draws his weapon and 
  snarls, "Oh I'm going to fuck you up for that."`

NegotiationQuestion.registerReaction('let-me-taste', {
  style: NegotiationStyle.lewd,
  species: 'kobold',
  reactions: {
    no: NegotiationReaction.attack(`{T:TargetName} snarls, "No? Maybe I'll just bite it off then."`),
    beg: NegotiationReaction.contest({
      random: true,
      win: NegotiationReaction.join(`{T:TargetName} falls to {T:his} knees, "Please master. This one needs your thick cock filling {T:his} mouth."`),
      loss: NegotiationReaction.greatRespect(`{T:TargetName} smiles and shakes {T:his} head, "Mmm, beg you? Maybe some day…"`),
    }),
    lick: NegotiationReaction.love(koboldLick),
    suck: NegotiationReaction.respect(koboldSuck, { flags: { playerHard:true }}),
    piss: NegotiationReaction.contest({
      random: { win:4, loss:6 },
      win: NegotiationReaction.join(koboldPissWin, { givePreferences: { 'humiliation-slut':30, 'piss-slut':20 }}),
      loss: NegotiationReaction.attack(koboldPissLoss),
    })
  }
});
