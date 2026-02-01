SummonAction.build('get-pussy-eaten', {
  category: 'Oral',
  name: 'Get Pussy Eaten',
  description: `I'm going to have {{C::character.firstName}} eat my pussy.`,

  requirements: ['player.has-pussy'],

  difficulty:    2,
  effects:       'head',
  complementing: ['pussy-lover','oral-slut','submissive'],
  conflicting:   ['dominant'],
  skill:         'oral',

  supportClass: () => SummonAction.GetPussyEaten,
});

SummonAction.GetPussyEaten = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Get Pussy Eaten Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Get Pussy Eaten Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Get Pussy Eaten Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Get Pussy Eaten Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();

// event: 'get-pussy-eaten',
// variants:[
//   { event:'get-pussy-eaten-face-sit' },
//   { when:['location.has-table'], event:'get-pussy-eaten-table' },
//   { when:['location.has-chair'], event:'get-pussy-eaten-chair' },
// ],
