
NegotiationQuestion.register('do-universals-exist', {
  text: `Do you think universals exist as real and distinct entities, or only as mental constructs?`,
  requires: [
    WeaverRequirements.minimumIntelligence('A',20),
    WeaverRequirements.minimumIntelligence('T',20),
  ],
  answers: [
    { key:'no', text:`"No. Ideas like square, or red, are all human inventions. If you're referring to some nonsensical 
        World of Forms, what kind of physical laws would such a world need for something like Justice to have a 
        physical existence there?"` },
    { key:'yes', text:`"Metaphysical theory would suggest that universals are more real than the physical world and
        therefor must have an existence that transcends the minds that hold them. Numbers are universal for instance, 
        and would exist without anyone having thought of them."` },
    { key:'nothing', text:`"Nothing is neither distinct nor real. Everything you know; everything you've experienced, 
        is nothing more than a fabrication."` },
    { key:'uma', text:`"Uma umauma umaaaaaa uma uma um."` }
  ],
});


//   Oh, of course the humans would take credit for fucking red.
