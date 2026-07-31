global.CharacterRequirements = (function() {

  // Every builder here returns a closure with the shape (context) => boolean, so records can carry requirement
  // predicates that any system evaluates the same way. The key names which character in a weaver style context the
  // predicate applies to. When the key is null the predicate is about "the subject": the character currently being
  // built when a factory build is live, otherwise the context itself is a character id.
  function subject(context, key) {
    if (key != null) { return Character(context[key]); }
    const state = CharacterFactory.getState();
    return state != null ? state : Character(context);
  }

  function isSpecies(context, key, code) {
    return Character(context[key]).getSpecies() === code;
  }

  // Be careful not to confuse isMale() with hasCock(). Some men don't have dicks, and some women do.
  function isMale(context, key) {
    return subject(context, key).isMale();
  }

  // === Body Parts ===

  function isAnusEmpty(context, key) {
    return Character(context[key]).isAnusEmpty();
  }

  function visibleAnus(context, key) {
    return Character(context[key]).isCrotchExposed();
  }

  function hasBreasts(context, key) {
    return subject(context, key).hasBreasts();
  }

  function visibleBreasts(context, key) {
    const character = Character(context[key]);
    return character.hasBreasts() && character.areBreastsExposed();
  }

  function minimumBreastSize(context, key, size) {
    const character = Character(context[key]);
    return character.hasBreasts() && character.breastsAreAtLeast(size);
  }

  function hasCock(context, key) {
    return subject(context, key).hasNormalCock();
  }

  function visibleCock(context, key) {
    const character = Character(context[key]);
    return character.hasNormalCock() && character.isCrotchExposed();
  }

  function visibleHardCock(context, key) {
    const character = Character(context[key]);
    return character.isFullyErect() && character.isCrotchExposed();
  }

  function minimumCockSize(context, key, size) {
    const character = Character(context[key]);
    return character.hasNormalCock() && character.cockIsAtLeast(size);
  }

  function hasPussy(context, key) {
    return subject(context, key).hasNormalPussy();
  }

  function visiblePussy(context, key) {
    const character = Character(context[key]);
    return character.hasNormalPussy() && character.isCrotchExposed();
  }

  function erogenousZone(context, key, zone) {
    return subject(context, key).hasSensitivity(zone);
  }

  function isTallerThan(context, first, second) {
    return Character(context[first]).isTallerThan(context[second]);
  }

  // === Attributes ===

  function minimumStrength(context, key, min) {
    return Character(context[key]).isStrongerThan(min);
  }

  function minimumIntelligence(context, key, min) {
    return Character(context[key]).isSmarterThan(min);
  }

  // === Equipment ===

  function chestIsCovered(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.chest);
  }

  function legsAreCovered(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.legs);
  }

  function isTopless(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.chest) === false;
  }

  // === Sexual Preferences and Consent Calculations ===

  function wouldConsentTo(context, key, code, minimumLevel) {
    return Character(context[key]).wouldConsentTo(code, minimumLevel);
  }

  function hasSexualPreference(context, key, code, threshold) {
    return Character(context[key]).hasSexualPreference(code, threshold);
  }

  function isStraight(context, key) {
    return Character(context[key]).isStraight();
  }

  return Object.freeze({
    playerIs: key =>                         { return (context) => { return GameSystem.getState().getPlayer() === context[key]; }},
    isSpecies: (key, code) =>                { return (context) => { return isSpecies(context, key, code); }},
    isMale: key =>                           { return (context) => { return isMale(context, key); }},
    isNotMale: key =>                        { return (context) => { return isMale(context, key) === false; }},
    isAnusEmpty: key =>                      { return (context) => { return isAnusEmpty(context, key); }},
    visibleAnus: key =>                      { return (context) => { return visibleAnus(context, key); }},
    hasBreasts: key =>                       { return (context) => { return hasBreasts(context, key); }},
    visibleBreasts: key =>                   { return (context) => { return visibleBreasts(context, key); }},
    minimumBreastSize: (key, size) =>        { return (context) => { return minimumBreastSize(context, key, size); }},
    hasCock: key =>                          { return (context) => { return hasCock(context, key); }},
    hasNoCock: key =>                        { return (context) => { return hasCock(context, key) === false; }},
    visibleCock: key =>                      { return (context) => { return visibleCock(context, key); }},
    notVisibleCock: key =>                   { return (context) => { return visibleCock(context, key) === false; }},
    visibleHardCock: key =>                  { return (context) => { return visibleHardCock(context, key) }},
    minimumCockSize: (key, size) =>          { return (context) => { return minimumCockSize(context, key, size); }},
    hasPussy: key =>                         { return (context) => { return hasPussy(context, key); }},
    visiblePussy: key =>                     { return (context) => { return visiblePussy(context, key); }},
    erogenousCervix: key =>                  { return (context) => { return erogenousZone(context, key, 'cervix'); }},
    erogenousUrethra: key =>                 { return (context) => { return erogenousZone(context, key, 'urethra'); }},
    isTallerThan: (first, second) =>         { return (context) => { return isTallerThan(context, first, second) }},
    minimumStrength: (key, min) =>           { return (context) => { return minimumStrength(context, key, min); }},
    minimumIntelligence: (key, min) =>       { return (context) => { return minimumIntelligence(context, key, min); }},
    chestIsCovered: key =>                   { return (context) => { return chestIsCovered(context, key); }},
    legsAreCovered: key =>                   { return (context) => { return legsAreCovered(context, key); }},
    isTopless: key =>                        { return (context) => { return isTopless(context, key); }},
    wouldConsentTo: (key, code, min) =>      { return (context) => { return wouldConsentTo(context, key, code, min); }},
    hasSexualPreference: (key, code, min) => { return (context) => { return hasSexualPreference(context, key, code, min); }},
    isStraight: key =>                       { return (context) => { return isStraight(context, key); }},
  });

})();
