SexAction.register('suck-anus',{
  name: 'Eat Ass',
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.ass,
  direction: ActionDirection.playerToPartner,
  description: `You'll eat {T:name's} asshole, focusing on licking {T:his} anal ring and probing it with your tongue.`,

  time: 1,
  playerStamina: 70,
  partnerStamina: 50,

  consentTarget: 20,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'sensitive' },
    { type:'preference', code:'anal-slut', scale:2.5 },
    { type:'preference', code:'dominant' },
    { type:'preference', code:'debaser' },
  ],

  partnerSensations: {
    anus:       80,
    comfort:    10,
    desire:     60,
    shame:      40,
    submission: 20,
  },
  playerSensations: {
    desire: 40
  },

  techniqueTarget: 12,
  skills: {
    player:['servicing']
  },
  alignment: {
    submission: -1,
    masochism: 0,
    shame: -1,
  },

});
