SummonAction.build('face-fuck', {
  category: 'Oral',
  name: 'Face Fuck',
  description: `I'm in the mood to violently fuck {{C::character.firstName's}} face.`,
  tags: ['player sadist 1'],

  requirements: [
    'player.has-cock',
    'canSuckCock(C,P).mouthFit!=impossible'],

  difficulty:    4,
  effects:       'head',
  complementing: ['cock-lover','cum-lover','oral-slut','masochist','submissive'],
  conflicting:   ['dominant'],
  skill:         'oral',

  supportClass: () => SummonAction.FaceFuck,
});

SummonAction.FaceFuck = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Face Fucking Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Face Fucking Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Face Fucking Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Face Fucking Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();

// event: 'face-fuck',
// variants:[
//   { when:['location.has-table'], event:'face-fuck-table' },
// ],
