SummonAction.build('give-blowjob', {
  category: 'Oral',
  name: 'Give Blowjob',
  description: `I'd like to suck on {{C::character.firstName's}} cock.`,

  requirements:[
    'minion(C).has-cock',
    'canSuckCock(P,C).mouthFit!=impossible'],

  difficulty:    0,
  effects:       'head',
  complementing: ['oral-lover','dominant'],
  conflicting:   [],

  supportClass: () => SummonAction.GiveBlowjob,
});

SummonAction.GiveBlowjob = (function() {

  function writeEnthusiasticStory(summoner) {
    return "TODO: Enthusiastic Give Blowjob Story."
  }

  function writeConsentStory(summoner) {
    return "TODO: Consenting Give Blowjob Story."
  }

  function writeReluctantStory(summoner) {
    return "TODO: Reluctant Give Blowjob Story."
  }

  function writeRapeStory(summoner) {
    return "TODO: Rape Give Blowjob Story."
  }

  return {
    writeEnthusiasticStory,
    writeConsentStory,
    writeReluctantStory,
    writeRapeStory,
  };

})();

// event: 'give-blowjob',
// variants:[
//   { when:['location.has-chair'], event:'give-blowjob-chair' },
// ],
