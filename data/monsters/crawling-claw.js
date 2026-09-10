BaseMonster.register('crawling-claw',{
  name: 'Crawling Claw',
  description: `The clawed hand skitters on the ground, its sharp nails making a disconcerning tapping sounds as it 
    rushes towards you.`,
  bodyPlan: 'claw',
  type: 'abomination',
  level: 1,

  healthFactor: 0.25,

  prioritizedAbilities: {
    claw: { code:'leap-claw', priority:50, damage:[10,20], speed:800, essence:10 },
  },

});

// TODO: We should have other hand types. Larger with grapple attacks, maybe a choke or an eye gouge. These basic
//       claws only have this leaping claw slash.
