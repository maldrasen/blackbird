global.Personality = function(id) {

  const fetishPreferences = ['choker','pisser','pugilist','rigger','stretcher','stud',
    'breath-player','breeder','cum-dump','enemas','gape-queen','piss-slut','prolapse-queen',
    'punching-bag','rope-bunny','sex-toy-lover','size-queen'];

  function getArchetype() {
    return PersonalityComponent.lookup(id).archetype;
  }

  // Attitude is more situational than the personality archetype and can best be summered as the way the character
  // feels about the current situation. Until this is implemented proper, I can just randomly return a possible
  // attitude, as it's mostly used to select different dialog trees.
  function attitudeTowardsAction(sexAction) {
    return Random.from(Object.keys(Attitude));
  }

  // When we start a training scene we first start an event where we describe the partner's reaction to having a
  // training scene start. The partner should have the opportunity at this time to reject the player. The player could
  // then force the partner somehow. This would normally start the training with a high anger value, though a true
  // submissive partner would enjoy having the training session forced on them.
  function attitudeTowardsTraining() {
    const player = Character(GameState.getPlayer());
    const character = Character(id);
    const results = {};

    results.emotional = consentForAction('kiss');
    results.performance = consentForAction('striptease');
    if (character.hasNormalCock()) { results.touching = consentForAction('fondle-cock')}
    if (character.hasBreasts())    { results.touching = consentForAction('fondle-breasts')}
    if (player.hasNormalCock())    { results.service = consentForAction('get-handjob')}
    if (player.hasNormalPussy())   { results.service = consentForAction('get-cunnilingus')}

    const highest = highestBaseClass(results);

    // TODO: There should be more nuance to these attitudes, and the story
    //   should reflect if the character will let you grope them or is willing
    //   to give you a handy. I think we should plan to fall back on the
    //   consent values though if there's nothing particularly interesting to
    //   say.
    if (highest.value === 3) { return TrainingAttitude.eager; }
    if (highest.value === 2) { return TrainingAttitude.willing; }
    if (highest.value === 1) { return TrainingAttitude.reluctant; }

    // If they are unwilling to do any of the above actions, then the character
    // would refuse to be trained. (They could still be tied up or something
    // though so it should still be possible to start a training scene, even if
    // they refuse.)
    return TrainingAttitude.unwilling;
  }

  function consentForAction(action) {
    const consent = ConsentResult(id);
    consent.setSexAction(action);
    consent.applyFactors();
    return consent.getConsent();
  }

  function highestBaseClass(results) {
    let highestCode = 'none';
    let highestValue = 0;
    Object.entries(results).forEach(([code,value]) => {
      if (value > highestValue) {
        highestCode = code;
        highestValue = value;
      }
    });
    return { code:highestCode, value:highestValue };
  }

  function getStrongestFetishes(threshold) {
    const preferences = SexualPreferencesComponent.lookup(id);
    const fetishes = []

    fetishPreferences.forEach(code => {
      if (preferences[code] >= threshold) {
        fetishes.push({ code:code, value:preferences[code] })
      }
    });

    return fetishes.sort((a,b) => { return b.value - a.value });
  }

  return Object.freeze({
    getArchetype,
    attitudeTowardsAction,
    attitudeTowardsTraining,
    getStrongestFetishes,
  });

}