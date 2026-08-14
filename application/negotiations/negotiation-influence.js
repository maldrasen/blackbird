global.NegotiationInfluence = (function() {

  // A skilled communicator gets more out of every exchange. When a reaction adjusts the monster's feelings, the player
  // rolls an opposed conversation check against the monster, and the moderation scales with the margin of victory.
  // Winning by 100 or more points doubles the feelings that help the negotiation and zeroes the ones that hurt it,
  // and losing does the opposite. Close contests sit in a linear zone, then the winning side tapers off almost
  // logarithmically while the losing side falls off a cliff. The PiecewiseCurve helper mirrors its zones around zero,
  // so the asymmetric shape comes from picking a curve by the margin's sign.

  const winCurve = PiecewiseCurve([
    { xMin:0,  xMax:10,  yMin:0,   yMax:0.1, exp:1    },
    { xMin:10, xMax:100, yMin:0.1, yMax:1,   exp:0.85 },
  ]);

  const lossCurve = PiecewiseCurve([
    { xMin:0,  xMax:10,  yMin:0,   yMax:0.1, exp:1   },
    { xMin:10, xMax:100, yMin:0.1, yMax:1,   exp:1.5 },
  ]);

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
    const margin = Math.max(-100, Math.min(100, difference));

    return (margin < 0) ? lossCurve(margin) : winCurve(margin);
  }

  // The || 0 keeps a zeroed out negative feeling from becoming -0.
  function moderate(value, strength) {
    const factor = (value > 0) ? (1 + strength) : (1 - strength);
    return Math.round(value * factor) || 0;
  }

  return {
    moderateFeelings,
  };

})();
