// Currently the only give action? The sex action naming convention is
// "verb-part", but there's not really an associated verb that means to rub
// something with your tits. puff puff maybe?

SexAction.register('give-titfuck',{
  name: 'Give Titfuck',
  persistedName: `Titfucking {T:name's} Cock`,
  mainCategory: SexAction.MainCategory.giving,
  playerCategory: SexAction.PartCategory.breasts,
  partnerCategory: SexAction.PartCategory.cock,
  direction: ActionDirection.playerToPartner,
  description: `You'll rub and squeeze {T:name's} cock between your tits.`,

  time: 1,
  playerStamina: 60,
  partnerStamina: 30,

  requires:['P:breasts-at-least-big'],

  alignment: {
    player: { breasts:[BreastAlignment.cock], hands:[HandAlignment.cock] },
    partner: { cock:[CockAlignment.rubbed] },
  },
  persist: { action:'give-titfuck' },

  consentTarget: 10,
  consentFactors: [
    { type:'base', baseClass: SexAction.BaseClass.reverseService },
    { type:'arousal' },
    { type:'gender' },
    { type:'preference', code:'breast-lover', scale:3 },
    { type:'preference', code:'dominant' },
  ],

  partnerSensations: {
    cock:    50,
    comfort: 40,
    desire:  80,
    shame:   20,
  },
  playerSensations: {
    nipple: 20,
    desire: 40,
  },

  techniqueTarget: 14,
  skills: {
    player:['servicing']
  },
  orientation: {
    submission: -1,
    masochism: 0,
    shame: 0,
  },
});
