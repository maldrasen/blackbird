SexAction.register('masturbate-anus',{
  name: 'Masturbate (Anus)',
  mainCategory: SexAction.MainCategory.performance,
  playerCategory: SexAction.PartCategory.none,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.partnerToSelf,
  description: `{T:name} will finger {T:his} asshole for you while you watch.`,

  time: 1,
  playerStamina: -10,
  partnerStamina: 70,

  consentTarget: 45,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.performance },
    { type:'arousal', strength:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'anal-slut' },
    { type:'preference', code:'humiliation-slut', scale:2.5 },
    { type:'preference', code:'exhibitionist', scale:3 },
    { type:'preference', code:'masturbator', scale:3 },
  ],

  partnerSensations: {
    anus:       70,
    prostate:   20,
    anger:      10,
    desire:     30,
    shame:      120,
    submission: 120,
  },
  playerSensations: {
    desire: 25
  },

  techniqueTarget: 13,
  skills: {
    partner:['performance'],
  },
  alignment: {
    submission: 2,
    masochism: 0,
    shame: 2,
  },

  storyTeller: result => { return tellStory(result); },
});

function tellStory(result) {
  const consent = result.getConsent().getConsent();
  if (consent === Consent.unwilling) { throw `Unwilling Anal Masturbation shouldn't be possible.` }
  if (consent === Consent.reluctant) { tellReluctantStory(result); }
  if (consent === Consent.willing) { tellWillingStory(result); }
  if (consent === Consent.eager) { tellEagerStory(result); }
}

function tellReluctantStory(result) { return `TODO: Reluctant Anal Masturbation story.` }
function tellWillingStory(result) { return `TODO: Willing Anal Masturbation story.` }
function tellEagerStory(result) { return `TODO: Eager Anal Masturbation story.` }
