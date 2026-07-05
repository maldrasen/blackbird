global.WeaverRequirements = (function() {

  function visibleBreasts(context, key) {
    const character = Character(context[key]);
    return character.hasBreasts() && character.areBreastsExposed();
  }

  function visibleCock(context, key) {
    const character = Character(context[key]);
    return character.hasNormalCock() && character.isCrotchExposed();
  }

  function visibleHardCock(context, key) {
    const character = Character(context[key]);
    return character.isFullyErect() && character.isCrotchExposed();
  }

  function visiblePussy(context, key) {
    const character = Character(context[key]);
    return character.hasNormalPussy() && character.isCrotchExposed();
  }

  return Object.freeze({
    playerIs: key => { return (context) => { return GameState.getPlayer() === context[key] }},
    withAttitude: code => { return (context) => { return context.attitude === code }},
    visibleBreasts: key => { return (context) => { return visibleBreasts(context,key); }},
    visibleCock: key => { return (context) => { return visibleCock(context,key); }},
    visibleHardCock: key => { return (context) => { return visibleHardCock(context,key) }},
    visiblePussy: key => { return (context) => { return visiblePussy(context,key); }},
  });

})();
