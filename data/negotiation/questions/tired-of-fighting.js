
NegotiationQuestion.register('tired-of-fighting', {
  text: `"What's the matter? You tired of fighting?"`,
  answers: {
    allDay:    { text:`"Tired? I could do this all day."` },
    tiresome:  { text:`"It is awfully tiresome though isn't it?"` },
    otherWay:  { text:`"Perhaps we could settle this some other way?"` },
  }
});

NegotiationQuestion.registerReaction('tired-of-fighting', {
  style: NegotiationStyle.fierce,
  reactions: {
    allDay:   NegotiationReaction.attack(`The {T:species.elf} grins, "Good. Don't pussy out on me just when things are getting good."`),
    tiresome: NegotiationReaction.disrespect(`"Tiresome? Oh so sorry to interrupt your godsdamned tea time."`),
    otherWay: NegotiationReaction.followUp(`{T:TargetName} looks intrigued, "Some other way huh?"`, { question: 'tired-of-fighting-other-way' }),
  }
});

NegotiationQuestion.registerReaction('tired-of-fighting', {
  style: NegotiationStyle.lewd,
  reactions: {
    allDay:   NegotiationReaction.lust(`"All day? I do love a {A:man} with stamina."`),
    tiresome: NegotiationReaction.like(`"Exactly. Wouldn't you rather be doing something else?"`),
    otherWay: NegotiationReaction.followUp(`{T:TargetName} smiles and licks {T:his} lips, "Some other way?"`, { question: 'tired-of-fighting-other-way' }),
  }
});

// TODO: A follow up question isn't added to the pool. They're referenced by a followUp response type, and always
//       picked as the next question. These will need to bypassing the interaction limit so that a conversation isn't
//       stopped halfway though. They should still count as an interaction though. We still need to show the response
//       text from the previous reaction before this question is shown.

NegotiationQuestion.register('tired-of-fighting-other-way', {
  text: `"So what exactly did you have in mind?"`,
  followUpOnly: true,
  answers: {
    strength: { text:`"I'll show you how much stronger than you I am."` },
    luck: { text:`You pull a coin from your pocket, "Feeling lucky? Lets settle this with a coin toss."` },
    speed: { text:`"Start running, and if I catch you, then you belong to me."` },
    cumFirst: { text:`"If I can make you cum before you make me cum, then I win."` },
  },
});

// =====================
//    Fierce Reaction
// =====================

const fierceStrength = `{T:TargetName} suddenly grabs your arm, bending it backwards with all the force {T:he} can muster.`;
const fierceStrengthWin = `${fierceStrength} You grit your teeth and push back hard, forcing {T:his} arm back until 
  you're able to twist it around behind {T:his} back. {T:He} lets out a painful grunt, "Ghaa, fine. You win. You win."`;
const fierceStrengthLoss = `${fierceStrength} You grit your teeth, but slowly {T:he} twists your arm. Suddenly, {T:he} 
  lunges forward, pushing you off balance, and with a vicious snarl {T:he} leaps at you as you stumble backwards.`;

NegotiationQuestion.registerReaction('tired-of-fighting-other-way', {
  style: NegotiationStyle.fierce,
  reactions: {
    strength: NegotiationReaction.contest({
      attribute: Attrib.strength,
      win: NegotiationReaction.greatRespect(fierceStrengthWin),
      loss: NegotiationReaction.attack(fierceStrengthLoss, { giveStatusEffect:{ target:'player', effect:'off-balance', duration:1 }}),
    }),
    luck: NegotiationReaction.attack(`{T:TargetName} snarls and knocks the coin from your hand, "Fuck that. We settle this for real."`),
    speed: NegotiationReaction.attack(`{T:TargetName} shakes {T:his} head and takes a step closer to you, "The hell I will."`),
    cumFirst: NegotiationReaction.disrespect(`{T:TargetName} laughs and shakes {T:his} head. "Ha! Well, that's one way to get a free handjob. I'll have to pass on that one."`),
  }
});

// ===================
//    Lewd Reaction
// ===================
// This is complicated because we need M/M, M/F, F/M and F/F versions of this.
// TODO: We'll need to write the female player versions of this when we have female players.

const lewdStrengthWin = `You grab {T:targetName}, wrapping an arm around {T:his} neck while pinning {T:his} arms
 behind {T:him}. {T:He} smiles, pushing {T:his} ass back against you. "Oh no… You caught me…"`
const lewdStrengthLoss = `You grab onto {T:targetName}, but {T:he}'s able to pull out of your grasp. {T:He} looks back 
  at you and sneers, "Oh wow… that was fucking pathetic."`
const lewdDexterityWin = `{T:TargetName} nods and darts off into the shadows. You give chase, and after a short sprint 
  around the room you quickly catch {T:him}, pinning {T:his} back against your chest. {T:He} grins up at you, pushing
  {T:his} ass against your crotch, "Oh no… You caught me…"`;
const lewdDexterityLoss = `{T:TargetName} nods and darts off. {T:He} quickly outpaces you, and soon all you can see
  is {T:him} flipping you off before {T:he} laughs and disappears into the shadows.`;

const lewdStrengthContest = NegotiationReaction.contest({
  attribute: Attrib.strength,
  win: NegotiationReaction.join(lewdStrengthWin, { givePreferences:{ submissive:10 }}),
  loss: NegotiationReaction.contempt(lewdStrengthLoss),
});

const lewdSpeedContest = NegotiationReaction.contest({
  attribute: Attrib.dexterity,
  win: NegotiationReaction.join(lewdDexterityWin, { givePreferences:{ submissive:10 }}),
  loss: NegotiationReaction.run(lewdDexterityLoss),
})

const lewdLuck = NegotiationReaction.dislike(`"Really? That's the best you could come up with? Pass."`)

const frottage = `The two of you stand just slightly apart, first stroking each others cocks, then rubbing them slowly 
  together.`;
const frotWin = `${frottage} {T:TargetName} suddenly squeezes {T:his} eyes shut. {T:He} groans as {T:his} cock throbs 
  in your hand, suddenly releasing {T:his} seed across your own cock still held in {T:his} hand. {T:TargetName} is out 
  of breath when {T:he} turns to you and says, "I guess you win."`;
const frotLoss = `${frottage} {T:TargetName's} expert hand glides over your flesh. Soon, you find that you can't hold
  back and are suddenly cumming over {T:his} hand. {T:He} grins, bringing {T:his} fingers to {T:his} lips, licking 
  your cum off of them. "Looks like I win." After a moment {T:he} looks confused. "Wait… what do I get if I win?`;

const finger = `You push your hand between {T:his} legs as {T:his} fingers tighten around your shaft. {T:He}'s already 
  wet as you push a pair of fingers into {T:him}.`;
const fingerWin = `${finger} It only takes a few minutes, but soon {T:he}'s moaning loudly, thrusting {T:his} hips 
  into your hand. Suddenly {T:his} pussy gushes, covering your hands in {T:his} hot, sweet smelling juices as {T:he} 
  continues to stroke your cock. {T:TargetName} is out of breath when {T:he} turns to you and says, "I guess you win."`
const fingerLoss = `${finger} {T:TargetName's} expert hand glides over your flesh. Soon, you find that you can't hold
  back and are suddenly cumming over {T:his} hand. {T:He} grins, bringing {T:his} fingers to {T:his} lips, licking 
  your cum off of them. "Looks like I win." After a moment {T:he} looks confused. "Wait… what do I get if I win?`;

const cockLover = { 'androphilic':30, 'cock-lover':20, 'cum-dump':10 };

NegotiationQuestion.registerReaction('tired-of-fighting-other-way-mm', {
  style: NegotiationStyle.lewd,
  staticRequirements: [
    CharacterRequirements.hasCock('P'),
    CharacterRequirements.hasCock('T'),
  ],
  reactions: {
    strength: lewdStrengthContest,
    luck: lewdLuck,
    speed: lewdSpeedContest,
    cumFirst: NegotiationReaction.contest({
      skill: 'servicing',
      win: NegotiationReaction.join(frotWin, { givePreference:cockLover }),
      loss: NegotiationReaction.lust(frotLoss, { givePreference:cockLover }),
    }),
  }
});

NegotiationQuestion.registerReaction('tired-of-fighting-other-way-mf', {
  style: NegotiationStyle.lewd,
  staticRequirements: [
    CharacterRequirements.hasCock('P'),
    CharacterRequirements.hasPussy('T'),
  ],
  reactions: {
    strength: lewdStrengthContest,
    luck: lewdLuck,
    speed: lewdSpeedContest,
    cumFirst: NegotiationReaction.contest({
      skill: 'servicing',
      win: NegotiationReaction.join(fingerWin, { givePreference:cockLover }),
      loss: NegotiationReaction.lust(fingerLoss, { givePreference:cockLover }),
    }),
  }
});
