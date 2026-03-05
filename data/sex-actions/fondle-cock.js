SexAction.register('fondle-cock',{
  name: 'Fondle Cock',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and stroke {T:name's} cock.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 40,

  requires:['T:has-cock'],

  consentTarget: 15,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'cock-slut' },
  ],

  partnerSensations: {
    cock:       60,
    comfort:    30,
    desire:     50,
    shame:      20,
    submission: 10,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 8,
  alignment: {
    submission: 0,
    masochism: 0,
    shame: 1,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Cock Fondling story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Cock Fondling story.` }
function tellWillingStory(result) { return `TODO: Willing Cock Fondling story.` }
function tellEagerStory(result) { return `TODO: Eager Cock Fondling story.` }
