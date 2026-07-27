
NegotiationQuestion.register('bone-jewelry-rumor', {
  text: `You know, I heard this rumor that humans make jewelry from {T:species.elf} bones.`,
  requires: [
    WeaverRequirements.isSpecies('A','human'),
  ],
  answers: [
    { key:'no',    text:`"No, that's not true."` },
    { key:'maybe', text:`"Well, maybe some people do, but I wouldn't."` },
    { key:'yes',   text:`"I think you'd make a fine necklace."` },
    { key:'lewd',  text:`"We only make sex toys that way."` }
  ],
});
