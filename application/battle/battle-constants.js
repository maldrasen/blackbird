global.BattleConstants = {
  ambushReactionTime: 1000,
  autoAdvanceTime: 250,
  damageEffectTime: 500,
  killEffectTime: 1000,
  moveEffectTime: 500,
  challengeSpreadRatio: 3,
  challengeTargetBase: 185,
  challengeTargetGrowth: 1.25,
  maxEncounterTypes: 3,
  maxReduction: 80,
  threatBase: 100,

  // Both sides of a resist contest roll the floor before adding their own resistance or power. Because the floor is
  // a constant, and not derived from the values being compared, resistance and power keep an absolute meaning: a
  // power of 100 is hard to shrug off no matter who it lands on, and a target with no resistance is unlucky rather
  // than doomed. Raising the floor makes every contest more random, lowering it makes resistance and power count for
  // more. Neither value needs an upper bound.
  resistRollFloor: 20,

  positionPattern: /([PM])\.(\d)\.(\d)/,
  spellReleaseTime: 500,
};
