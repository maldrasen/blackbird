global.TrainingRequirements = (function() {

  // The playerWas() predicate is used when we're shifting between sex positions. The function checks the player's key
  // in the previousPosition context rather than the current one. Move packages need this when the destination
  // position is symmetric (like standing) and the current keys can't distinguish the roles the actors just left.
  function playerWas(context, key) {
    return context.previousPosition != null && GameSystem.getState().getPlayer() === context.previousPosition[key];
  }

  return Object.freeze({
    playerWas: key =>     { return (context) => { return playerWas(context, key); }},
    withAttitude: code => { return (context) => { return context.attitude === code; }},
    withAction: code =>   { return (context) => { return context.action === code; }},
  });

})();
