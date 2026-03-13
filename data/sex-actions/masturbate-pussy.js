SexAction.register('masturbate-pussy',{
  name: 'Masturbate (Pussy)',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.pussy,
  direction: ActionDirection.partnerToSelf,
  description: `{T:name} will masturbate for you while you watch.`,

  time: 1,
  playerStamina: -10,
  partnerStamina: 60,

  requires:['T:has-pussy'],

  consentTarget: 35,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'pussy-slut' },
    { type:'preference', code:'humiliation-slut' },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

  partnerSensations: {
    clit:       60,
    pussy:      50,
    desire:     40,
    shame:      60,
    submission: 80,
  },
  playerSensations: {
    desire: 20
  },

  techniqueTarget: 9,
  skills: {
    partner:['performance'],
  },
  alignment: {
    submission: 2,
    masochism: 0,
    shame: 1,
  },

  storyTeller: result => { return tellStory(result); },
});

function tellStory(result) {
  const consent = result.getConsent().getConsent();
  if (consent === Consent.unwilling) { throw `Unwilling Pussy Masturbation shouldn't be possible.`; }
  if (consent === Consent.reluctant) { tellReluctantStory(result); }
  if (consent === Consent.willing) { tellWillingStory(result); }
  if (consent === Consent.eager) { tellEagerStory(result); }
}

function tellReluctantStory(result) { return `TODO: Reluctant Pussy Masturbation story.` }
function tellWillingStory(result) { return `TODO: Willing Pussy Masturbation story.` }
function tellEagerStory(result) { return `TODO: Eager Pussy Masturbation story.` }
