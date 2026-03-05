SexAction.register('fondle-pussy',{
  name: 'Fondle Pussy',
  mainCategory: SexAction.MainCategory.foreplay,
  playerCategory: SexAction.PartCategory.hands,
  partnerCategory: SexAction.PartCategory.pussy,
  direction: ActionDirection.playerToPartner,
  description: `Fondle and rub {T:name's} clit and pussy.`,

  time: 1,
  playerStamina: 30,
  partnerStamina: 40,

  requires:['T:has-pussy'],

  consentTarget: 25,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.touching },
    { type:'arousal' },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive', scale:1.5 },
    { type:'preference', code:'pussy-slut' },
  ],

  partnerSensations: {
    clit:       50,
    pussy:      25,
    comfort:    30,
    desire:     50,
    shame:      20,
    submission: 10,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 10,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Pussy Fondling story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Pussy Fondling story.` }
function tellWillingStory(result) { return `TODO: Willing Pussy Fondling story.` }
function tellEagerStory(result) { return `TODO: Eager Pussy Fondling story.` }
