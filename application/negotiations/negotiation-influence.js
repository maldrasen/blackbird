global.NegotiationInfluence = (function() {

  // A skilled communicator gets more out of every exchange. When a reaction adjusts the monster's feelings, the player
  // rolls an opposed conversation check against the monster, and the moderation scales with the margin of victory.
  // Winning by a hair barely registers, while winning by 100 or more points doubles the feelings that help the
  // negotiation and zeroes the ones that hurt it. Losing does the opposite.

  const strengthCurve = PiecewiseCurve([{ xMin:0, xMax:100, yMin:0, yMax:1, exp:2 }]);

  function moderateFeelings(feelings, context) {
    const strength = contestStrength(context);
    const moderated = {};

    Object.keys(feelings).forEach(key => {
      moderated[key] = moderate(feelings[key], strength);
    });

    return moderated;
  }

  function contestStrength(context) {
    const difference = SkillCheck(context.P,'conversation').value - SkillCheck(context.T,'conversation').value;
    return strengthCurve(Math.max(-100, Math.min(100, difference)));
  }

  // The || 0 keeps a zeroed out negative feeling from becoming -0.
  function moderate(value, strength) {
    const factor = (value > 0) ? (1 + strength) : (1 - strength);
    return Math.round(value * factor) || 0;
  }

  return Object.freeze({
    moderateFeelings,
  });

})();
