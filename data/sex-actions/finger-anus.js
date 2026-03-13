SexAction.register('finger-anus',{
  name: 'Finger Anus',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.playerToPartner,
  description: `Fuck {T:name's} asshole with your fingers.`,

  time: 1,
  playerStamina: 40,
  partnerStamina: 70,

  consentTarget: 30,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'anal-slut' },
  ],

  partnerSensations: {
    anus:       60,
    prostate:   40,
    anger:      20,
    comfort:    20,
    desire:     80,
    shame:      100,
    submission: 100,
    suffering:  20,
  },
  playerSensations: {
    desire: 60
  },

  techniqueTarget: 16,
  alignment: {
    submission: 2,
    masochism: 1,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Anal Fingering story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Anal Fingering story.` }
function tellWillingStory(result) { return `TODO: Willing Anal Fingering story.` }
function tellEagerStory(result) { return `TODO: Eager Anal Fingering story.` }
