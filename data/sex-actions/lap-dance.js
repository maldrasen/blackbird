SexAction.register('lap-dance',{
  name: 'Lap Dance',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.partnerToBoth,
  description: `{T:name} will straddle your legs and grind {T:his} ass on your cock.`,

  time: 5,
  playerStamina: 20,
  partnerStamina: 70,

  requires:['P:has-cock'],

  // TODO: Dancing requirements. Lap dance is probably a dance. Lap dance might
  //       have a few lap dance specific follow on actions, like a lap dance
  //       frottage. We might need to include grinding controls like we've done
  //       for thrusting. This sex action requires a cock. Should make a no-cock
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
    shame:      60,
    submission: 80,
  },
  playerSensations: {
    cock:   40,
    desire: 30,
  },

  techniqueTarget: 18,
  skills: {
    partner:['dance','performance']
  },
  alignment: {
    submission: 1,
    masochism: 0,
    shame: 2,
  },

  storyTeller: result => { return tellStory(result); },
});

function tellStory(result) {
  const consent = result.getConsent().getConsent();
  if (consent === Consent.unwilling) { tellUnwillingStory(result); }
  if (consent === Consent.reluctant) { tellReluctantStory(result); }
  if (consent === Consent.willing) { tellWillingStory(result); }
  if (consent === Consent.eager) { tellEagerStory(result); }
}

function tellUnwillingStory(result) { return `TODO: Unwilling Lap Dancing story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Lap Dancing story.` }
function tellWillingStory(result) { return `TODO: Willing Lap Dancing story.` }
function tellEagerStory(result) { return `TODO: Eager Lap Dancing story.` }
