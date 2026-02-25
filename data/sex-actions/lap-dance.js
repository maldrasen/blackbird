SexAction.register('lap-dance',{
  name: 'Lap Dance',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.ass,
  description: `{T:name} will straddle your legs and grind {T:his} ass on your cock.`,

  // TODO: Dancing requirements. Lap dance is probably a dance. Lap dance might
  //       have a few lap dance specific follow on actions, like a lap dance
  //       frottage. We might need to include grinding controls like we've done
  //       for thrusting. This sex action assumes a cock. Should make a no-cock
  //       version as well, though that would not have the same grinding logic.

  consentTarget: 18,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'gender', scale:1.25 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'submissive' },
  ],

  partnerSensations: {
    anus:       5,
    clit:       5,
    nipple:     5,
    cock:       10,
    pussy:      5,
    comfort:    10,
    desire:     15,
    shame:      20,
    submission: 30,
  },
  playerSensations: {
    cock:   30,
    desire: 60,
  },

  skills: {
    partner:['dance','performance']
  },

});
