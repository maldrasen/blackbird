
NegotiationQuestion.register('how-do-you-taste', {
  text: `So what do humans taste like anyway?`,
  requires: WeaverRequirements.isSpecies('A','human'),
  answers: [
    { key:'bad',      text:`"Uh... really bad. You wouldn't like it at all."` },
    { key:'chicken',  text:`"Chicken maybe?"` },
    { key:'pork',     text:`"I've heard humans taste a lot like pork."` },
    { key:'find-out', text:`"Do you want to find out?"` },
  ],
});
