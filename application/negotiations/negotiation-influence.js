global.NegotiationInfluence = (function() {

  // A skilled communicator gets more out of every exchange. When a reaction adjusts the monster's feelings, the player
  // rolls an opposed conversation check against the monster. Winning amplifies the feelings that help the negotiation
  // and softens the ones that hurt it; losing does the opposite. Ties go to the player.

  const AMPLIFY_FACTOR = 1.25;
  const SOFTEN_FACTOR = 0.75;

  function moderateFeelings(feelings, context) {
    const playerWins = SkillCheck(context.P, 'conversation').value >= SkillCheck(context.T, 'conversation').value;
    const moderated = {};

    Object.keys(feelings).forEach(key => {
      moderated[key] = moderate(feelings[key], playerWins);
    });

    return moderated;
  }

  function moderate(value, playerWins) {
    const amplify = (value > 0) === playerWins;
    return Math.round(value * (amplify ? AMPLIFY_FACTOR : SOFTEN_FACTOR));
  }

  return Object.freeze({
    moderateFeelings,
  });

})();
