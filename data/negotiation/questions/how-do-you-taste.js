
NegotiationQuestion.register('how-do-you-taste', {
  text: `So what do humans taste like anyway?`,
  requires: WeaverRequirements.isSpecies('P','human'),
  answers: {
    'bad':      { text:`"Uh... really bad. You wouldn't like it at all."` },
    'chicken':  { text:`"Chicken maybe?"` },
    'pork':     { text:`"I've heard humans taste a lot like pork."` },
    'find-out': { text:`"Do you want to find out?"` },
  }
});
