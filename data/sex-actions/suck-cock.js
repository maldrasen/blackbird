SexAction.register('suck-cock',{
  name: 'Suck Cock',
  persistedName: `Sucking {T:name's} Cock`,
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.mouth,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `You'll suck {T:name's} cock.`,

  time: 1,
  playerStamina: 80,
  partnerStamina: 60,

  persist: { action:'suck-cock' },
  uses: {
    player: [TrainingSlot.mouth],
    partner: [TrainingSlot.cock],
  },

  consentTarget: 17,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal', strength:3 },
    { type:'gender', scale:1.5 },
    { type:'preference', code:'cock-slut' },
    { type:'preference', code:'dominant' },
  ],

  partnerSensations: {
    cock:    80,
    comfort: 50,
    desire:  70,
    shame:   10,
  },
  playerSensations: {
    throat: 20,
    desire: 40,
  },

  techniqueTarget: 22,
  skills: {
    player:['servicing']
  },
  orientation: {
    submission: -1,
    masochism: 0,
    shame: 0,
  },
});
