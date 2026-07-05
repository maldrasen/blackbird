global.WeaverRequirements = (function() {

  // === Body Parts ===

  function isAnusEmpty(context, key) {
    return Character(context[key]).isAnusEmpty();
  }

  function visibleAnus(context, key) {
    return Character(context[key]).isCrotchExposed();
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
    return Character(context[key]).hasNormalCock();
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

  function visiblePussy(context, key) {
    const character = Character(context[key]);
    return character.hasNormalPussy() && character.isCrotchExposed();
  }

  function isTallerThan(context, first, second) {
    return Character(context[first]).isTallerThan(context[second]);
  }

  // === Attributes ===

  function minimumStrength(context, key, min) {
    return Character(context[key]).isStrongerThan(min);
  }

  // === Equipment ===

  function chestIsCovered(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.legs);
  }

  function legsAreCovered(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.legs);
  }

  function isTopless(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.chest);
  }

  // === Sexual Preferences and Consent Calculations ===

  function wouldConsentTo(context, key, code, minimumLevel) {
    return Character(context[key]).wouldConsentTo(code, minimumLevel);
  }

  function hasSexualPreference(context, key, code, threshold) {
    return Character(context[key]).hasSexualPreference(code, threshold);
  }

  // Most of these functions are passthroughs to the Character wrapper, but these are all closures that can be added
  // to a WeaverPackage, whereas other systems will use the Character wrappers directly.
  return Object.freeze({
    playerIs: key =>                         { return (context) => { return GameState.getPlayer() === context[key] }},
    withAttitude: code =>                    { return (context) => { return context.attitude === code }},
    withAction: code =>                      { return (context) => { return context.action === code }},
    isAnusEmpty: key =>                      { return (context) => { return isAnusEmpty(context, key); }},
    visibleAnus: key =>                      { return (context) => { return visibleAnus(context, key); }},
    visibleBreasts: key =>                   { return (context) => { return visibleBreasts(context,key); }},
    minimumBreastSize: (key,size) =>         { return (context) => { return minimumBreastSize(context,key,size); }},
    hasCock: key =>                          { return (context) => { return hasCock(context, key); }},
    visibleCock: key =>                      { return (context) => { return visibleCock(context, key); }},
    visibleHardCock: key =>                  { return (context) => { return visibleHardCock(context, key) }},
    minimumCockSize: (key,size) =>           { return (context) => { return minimumCockSize(context, key, size); }},
    visiblePussy: key =>                     { return (context) => { return visiblePussy(context, key); }},
    isTallerThan: (first, second) =>         { return (context) => { return isTallerThan(context, first, second) }},
    minimumStrength: (key, min) =>           { return (context) => { return minimumStrength(context, key, min); }},
    chestIsCovered: key =>                   { return (context) => { return chestIsCovered(context, key); }},
    legsAreCovered: key =>                   { return (context) => { return legsAreCovered(context, key); }},
    isTopless: key =>                        { return (context) => { return isTopless(context, key); }},
    wouldConsentTo: (key, code, min) =>      { return (context) => { return wouldConsentTo(context, key, code, min); }},
    hasSexualPreference: (key, code, min) => { return (context) => { return hasSexualPreference(context, key, code, min); }},
  });

})();
