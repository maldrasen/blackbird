
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
    otherWay: () => { throw new Error(`This needs to be a follow up question.`) },
  }
});
