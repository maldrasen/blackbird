SummonAction.build('face-slapping', {
  category: 'Abuse',
  name: 'Face Slapping',
  description: `I'm going to slap {{C::character.firstName's}} face until {{C::gender.he}} can't take it any more.`,
  tags: ['player sadist 2'],

  requirements: [],

  difficulty:    4,
  effects:       'head',
  complementing: ['masochist','submissive'],
  conflicting:   ['dominant'],

  supportClass: () => SummonAction.FaceSlapping,
});

SummonAction.FaceSlapping = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Face Slapping Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Face Slapping Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Face Slapping Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Face Slapping Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();
