
// TODO: I'm just giving the nightgaunt a creature type and a bite attack for now. The real nightgaunt will need a
//       wide variety of status effect causing spells. A grapple attack, followed by a massively damaging physical
//       attack. Intended to be one of the most difficult monsters in the game. Amusing to fight one at level 1.

BaseMonster.register('nightgaunt',{
  name: 'Nightgaunt',
  description: `A faceless creature.`,
  type: 'creature',
  level: 200,

  prioritizedAbilities: [
    { code:'beast-bite', priority:50, damage:[125,150], speed:1000, essence:50 },
  ],

});
