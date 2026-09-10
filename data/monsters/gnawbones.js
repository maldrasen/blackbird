BaseMonster.register('gnawbones',{
  name: 'Gnawbones',
  description: `The gnawbones are squat furry scavengers. They serve an important function, keeping the dungeon free
    of corpses, but they don't like being disturbed.`,
  bodyPlan: 'beast',
  type: 'critter',
  level: 2,

  prioritizedAbilities: {
    bite: { code:'beast-bite', priority:50, damage:[10,20], speed:1000, essence:20 },
  },
});
