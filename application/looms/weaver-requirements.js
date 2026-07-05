global.WeaverRequirements = (function() {

  function visiblePussy(context, key) {
    const character = Character(context[key]);
    return character.hasNormalPussy() && character.isCrotchExposed();
  }

  function visibleCock(context, key) {
    const character = Character(context[key]);
    return character.hasNormalCock() && character.isCrotchExposed();

  }

  function visibleHardCock(context, key) {
    const character = Character(context[key]);
    return character.isFullyErect() && character.isCrotchExposed();
  }

  return Object.freeze({
    playerIs: key => { return (context) => { return GameState.getPlayer() === context[key] }},
    withAttitude: code => { return (context) => { return context.attitude === code }},
    visiblePussy: key => { return (context) => { return visiblePussy(context,key); }},
    visibleCock: key => { return (context) => { return visibleCock(context,key); }},
    visibleHardCock: key => { return (context) => { return visibleHardCock(context,key) }},
  });

})();
