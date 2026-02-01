SummonAction.build('face-sitting', {
  category: 'Oral',
  name: 'Face Sitting',
  description: `I'd like to sit on {{C::character.firstName's}} face for a while.`,

  requirements:[],

  difficulty:    3,
  effects:       'head',
  complementing: ['ass-obsessed','oral-slut','perverted','submissive'],
  conflicting:   ['dominant'],
  skill:         'oral',

  supportClass: () => SummonAction.FaceSitting,
});

SummonAction.FaceSitting = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Face Sitting Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Face Sitting Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Face Sitting Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Face Sitting Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();

// event: 'face-sitting',
// variants:[
//   { when:['location.has-chair'], event:'face-sitting-chair' },
// ],
