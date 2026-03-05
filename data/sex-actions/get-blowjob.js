SexAction.register('get-blowjob',{
  name: 'Get Blowjob',
  mainCategory: SexAction.MainCategory.receiving,
  playerCategory: SexAction.PartCategory.cock,
  partnerCategory: SexAction.PartCategory.mouth,
  direction: ActionDirection.partnerToPlayer,
  description: `{T:name} will suck your cock.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 80,

  requires:['P:has-cock'],

  // persistPlayer: 'cock',
  // persistPartner: 'mouth',
  //
  // requirements:["check to see if partner can fit player's cock in mouth"],
  //
  // skill:         'oral-sex',

  consentTarget: 35,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.service },
    { type:'arousal', strength:0.4 },
    { type:'gender' },
    { type:'preference', code:'oral-slut', scale:3 },
    { type:'preference', code:'cock-lover', scale:3 },
    { type:'preference', code:'cum-dump', scale:3 },
    { type:'preference', code:'submissive' },
    { type:'preference', code:'dominant', conflicting:true },
  ],

  partnerSensations: {
    throat:     20,
    comfort:    10,
    desire:     40,
    shame:      60,
    submission: 80,
    suffering:  40,
  },
  playerSensations: {
    cock:   80,
    desire: 70
  },

  techniqueTarget: 22,
  skills: {
    partner:['servicing']
  },
  alignment: {
    submission: 2,
    masochism: 1,
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

function tellUnwillingStory(result) { return `TODO: Unwilling Blowjob story.` }
function tellReluctantStory(result) { return `TODO: Reluctant Blowjob story.` }
function tellWillingStory(result) { return `TODO: Willing Blowjob story.` }
function tellEagerStory(result) { return `TODO: Eager Blowjob story.` }
