global.WeaverRequirements = (function() {

  function visibleBreasts(context, key) {
    const character = Character(context[key]);
    return character.hasBreasts() && character.areBreastsExposed();
  }

  function minimumBreastSize(context, key, size) {
    const character = Character(context[key]);
    return character.hasBreasts() && character.breastsAreAtLeast(size);
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
    return character.hasNormalCock() && character.cockIsAtLeast('big');
  }

  function visiblePussy(context, key) {
    const character = Character(context[key]);
    return character.hasNormalPussy() && character.isCrotchExposed();
  }

  function legsAreCovered(context, key) {
    return Character(context[key]).isEquipped(EquipmentSlot.legs);
  }

  function minimumStrength(context, key, min) {
    return Character(context[key]).isStrongerThan(min);
  }

  function wouldConsentTo(context, key, code) {
    return Character(context[key]).wouldConsentTo(code);
  }

  function isTallerThan(context, first, second) {
    return Character(context[first]).isTallerThan(second);
  }

  // Most of these functions are pass throughs to the Character wrapper, but these are all closures that can be added
  // to a WeaverPackage, whereas other systems will use the Character wrappers directly.
  return Object.freeze({
    playerIs: key => { return (context) => { return GameState.getPlayer() === context[key] }},
    withAttitude: code => { return (context) => { return context.attitude === code }},
    withAction: code => { return (context) => { return context.action === code }},
    visibleBreasts: key => { return (context) => { return visibleBreasts(context,key); }},
    minimumBreastSize: (key,size) => { return (context) => { return minimumBreastSize(context,key,size); }},
    visibleCock: key => { return (context) => { return visibleCock(context,key); }},
    visibleHardCock: key => { return (context) => { return visibleHardCock(context,key) }},
    minimumCockSize: (key,size) => { return (context) => { return minimumCockSize(context,key,size); }},
    visiblePussy: key => { return (context) => { return visiblePussy(context,key); }},
    legsAreCovered: key => { return (context) => { return legsAreCovered(context,key); }},
    minimumStrength: (key, min) => { return (context) => { return minimumStrength(context, key, min); }},
    wouldConsentTo: (key, code) => { return (context) => { return wouldConsentTo(context, key, code); }},
    isTallerThan: (first, second) => { return (context) => { return isTallerThan(context, first, second) }},
  });

})();
