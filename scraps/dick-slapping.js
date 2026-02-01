SummonAction.build('dick-slapping', {
  category: 'Oral',
  name: 'Dick Slapping',
  description: `I'm going to slap my cock against {{C::character.firstName's}} face.`,
  tags: ['player sadist 1'],

  requirements: [
    'player.has-cock',
    'player.cock.bigger-than-big'],

  difficulty:    2,
  effects:       'head',
  complementing: ['cock-lover','masochist','submissive'],
  conflicting:   ['dominant'],

  supportClass: () => SummonAction.DickSlapping,
});

SummonAction.DickSlapping = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Dick Slapping Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Dick Slapping Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Dick Slapping Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Dick Slapping Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();
