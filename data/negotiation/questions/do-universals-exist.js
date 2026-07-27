
const questionNo = `"No. Ideas like square, or red, are all human inventions. If you're referring to some nonsensical 
  World of Forms, what kind of physical laws would such a world need for something like Justice to have a physical 
  existence there?"`

const questionYes = `"Metaphysical theory would suggest that universals are more real than the physical world and
  therefor must have an existence that transcends the minds that hold them. Universals such as numbers would exist 
  without anyone having thought of them."`

const questionNothing = `"Nothing is neither distinct nor real. Everything you know; everything you've experienced, is
  nothing more than a fabrication."`

const questionUma = `"Uma umauma umaaaaaa uma uma um."`;

NegotiationQuestion.register('do-universals-exist', {
  text: `Do you think universals exist as real and distinct entities, or only as mental constructs?`,
  requires: [
    WeaverRequirements.minimumIntelligence('A',20),
    WeaverRequirements.minimumIntelligence('T',20),
  ],
  answers: {
    'no':      { text:questionNo },
    'yes':     { text:questionYes },
    'nothing': { text:questionNothing },
    'uma':     { text:questionUma }
  }
});

//   Oh, of course the humans would take credit for fucking red.
