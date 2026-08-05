
NegotiationQuestion.register('how-do-you-murder', {
  text: `Hey, if you were going to commit murder, how would you do it?`,
  answers: {
    never:   { text:`"Murder? I would never do something like that."` },
    unknown: { text:`"That's something that no one would ever find out."` },
    cruel:   { text:`"Oh I'd take my time, and make it as painful as possible."` },
    cock:    { text:`"Suffocation. I'd deepthroat someone, feeling them choking on my cock with their last breath."`, requires:CharacterRequirements.hasCock('P') },
    ass:     { text:`"Suffocation. I'd like to see someone struggling under me while I'm sitting on their face."`, requires:CharacterRequirements.hasNoCock('P') }
  }
});

// TODO: Cruel is a follow up question here.
NegotiationQuestion.registerReaction('how-do-you-murder', {
  style: NegotiationStyle.fierce,
  reactions: {
    never: NegotiationReaction.attack(`"You're a fucking liar. Delvers like you come down here, rape and murder anything that gets in their way. Well I'm fucking sick of it."`),
    unknown: NegotiationReaction.respect(`The {T:species.elf} chuckles and shakes his head, "Heh, one of those sneaky bastards huh? I prefer loud and covered in blood myself, but I can respect that."`),
    cruel: NegotiationReaction.respect(`The {T:species.elf} grins, "Now we're talking. You let the others watch right?"`),
    cock: NegotiationReaction.contest({
      random: { win:3, loss:7 },
      win: NegotiationReaction.lust(`{T:TargetName} actually blushes a little, "That's… Okay, so maybe I'm into that shit."`,{ givePreferences:{ 'androphilic':30, 'breath-player':20 }}),
      loss: NegotiationReaction.dislike(`The {T:species.elf} frowns and shakes his head, "Nah, sounds like a good way to get your cock bitten off to me."`),
    }),
    ass: NegotiationReaction.contest({
      random: { win:3, loss:7 },
      win: NegotiationReaction.lust(`{T:TargetName} actually blushes a little, "That's… Okay, so maybe I'm into that shit."`,{ givePreferences:{ 'gynophilic':30, 'breath-player':20 }}),
      loss: NegotiationReaction.dislike(`The {T:species.elf} frowns and shakes his head, "Nah, sounds like a good way to get your cunt bitten to me."`),
    }),
  }
});
