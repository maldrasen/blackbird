SummonAction.build('eat-pussy', {
  category: 'Oral',
  name: 'Eat Pussy',
  description: `I'd like to eat {{C::character.firstName's}} pussy.`,

  requirements: ['minion(C).has-pussy'],

  difficulty:    0,
  effects:       'pussy',
  complementing: ['oral-lover','pussy-slut'],
  conflicting:   [],

  supportClass: () => SummonAction.EatPussy,
});

SummonAction.EatPussy = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Pussy Eating Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Pussy Eating Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Pussy Eating Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Pussy Eating Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();

// event: 'eat-pussy',
// variants:[
//   { when:[], event:'eat-pussy-face-sit' },
//   { when:['minion(C).very-small-body'], event:'eat-pussy-wall' },
//   { when:['location.has-table'], event:'eat-pussy-table' },
//   { when:['location.has-chair'], event:'eat-pussy-chair' },
// ],
