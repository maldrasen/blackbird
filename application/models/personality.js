global.Personality = function(id) {

  const domPreferences = ['dominant','sadistic','debaser'];
  const subPreferences = ['submissive','masochistic','affection-slut','humiliation-slut'];
  const bdsmPreferences = [...domPreferences, ...subPreferences];

  // The character's personality archetype is used to choose an initial dialog tree, which is easier than branching
  // within a huge tree that needs to take a character's personality, feelings, and aspects all into consideration.
  // Certain personality aspects are 'stronger' than others, so a character with a 'bimbo' aspect will act like a bimbo
  // even if they're also a violent sadist.
  function getArchetype() {
    const character = Character(id);
    const aspects = AspectsComponent.lookup(id);
    const personality = PersonalityComponent.lookup(id);
    const sexualPreferences = SexualPreferencesComponent.lookup(id);
    const strongestPreference = strongestPreferenceFactor(sexualPreferences);
    const strongestFactor = strongestPersonalityFactor(personality);
    const personalityStrength = Math.abs(strongestFactor.value);

    if (personality.broken) { throw `Implement broken as archetype.` }

    // Some species have their own dialog trees.
    if (character.getSpeciesName() === 'Kobold') {
      if (domPreferences.includes(strongestPreference.code)) { return Architype.koboldDom; }
      if (subPreferences.includes(strongestPreference.code)) { return Architype.koboldSub; }
      throw `Kobolds must be dominant or submissive.`
    }

    // TODO: The 'innocent' archetype needs to look at sexual history, but I
    //   haven't written that component yet.

    // Aspects have the next highest priority when determining archetype.
    if (aspects[AspectType.prude]) { return Architype.prude; }
    if (aspects[AspectType.bimbo]) { return Architype.bimbo; }
    if (aspects[AspectType.slut]) { return Architype.slut; }

    // TODO: The other sexual preferences will probably also have associated
    //   personality types, at least among the BDSM preferences. A strong
    //   dominant or masochist will need their own personality trees eventually,
    //   though we can probably do without them for now.

    const perv = sexualPreferences.perverted;
    if (perv > 10 && perv > personalityStrength) { return Architype.pervert; }
    if (perv < -10 && Math.abs(-1 * perv) > personalityStrength) { return Architype.prude; }

    // A violent person will be more serious, unless they're unkind enough to
    // be heartless.
    if (personality.violent > 20) {
      return (personality.kind < -10) ? Architype.heartless : Architype.serious;
    }

    // A very passive person will usually use a different factor to determine
    // their personality archetype, unless they're also excitable, in which
    // case they have the timid archetype.
    if (personality.violent < -20 && personality.calm < -10) { return Architype.timid; }

    // If they're overly excitable, they'll either be playful or a brat.
    if (personality.calm < -20) {
      return (personality.kind > 0) ? Architype.playful : Architype.brat;
    }

    // If we don't have an archetype for them yet, we can use the kindness
    // factor to choose between sweet and bitch.
    if (personality.kind > 20) { return Architype.sweet; }
    if (personality.kind < -20) { return Architype.bitch; }

    // Finally, a character with no strong personality factors in any direction
    // indicates that this person is rather unemotional and stoic.
    return Architype.reserved;
  }

  // Attitude is more situational than the personality archetype and can best be summered as the way the character
  // feels about the current situation.
  function getAttitude() {

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

  function strongestPreferenceFactor(sexualPreferences) {
    let strongestCode = 'none';
    let strongestValue = 0;

    bdsmPreferences.forEach(code => {
      if (sexualPreferences[code] > strongestValue) {
        strongestCode = code;
        strongestValue = sexualPreferences[code];
      }
    });

    return { code:strongestCode, value:strongestValue }
  }

  // This function really only needs to find the strongest BDSM preference.
  function strongestPersonalityFactor(personality) {
    let strongestCode = 'none';
    let strongestValue = 0;
    ['calm','kind','violent'].forEach(code => {
      if (Math.abs(personality[code]) > strongestValue) {
        strongestCode = code;
        strongestValue = Math.abs(personality[code]);
      }
    });
    return { code:strongestCode, value:personality[strongestCode] };
  }

  return Object.freeze({
    getArchetype,
    getAttitude,
    attitudeTowardsTraining,

    strongestPreferenceFactor,
    strongestPersonalityFactor,
  });

}