
NegotiationQuestion.register('how-do-you-murder', {
  text: `Hey, if you were going to commit murder, how would you do it?`,
  answers: {
    'never':   { text:`"Murder? I would never do somthing like that."` },
    'unknown': { text:`"That's something that no one would ever find out."` },
    'cruel':   { text:`"Oh I'd take my time, and make it as painful as possible."` },
    'cock':    { text:`"Suffocation. I'd deepthroat someone, feeling them choking on my cock with their last breath."`, requires:WeaverRequirements.hasCock('A') },
    'ass':     { text:`"Suffocation. I'd like to see someone struggling under me while I'm sitting on their face.`, requires:WeaverRequirements.hasNoCock('A') }
  }
});
