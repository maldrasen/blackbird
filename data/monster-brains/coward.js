MonsterBrain.register('coward',{

  // Cowards pick their targets based on whoever is close to them and who looks like an easy kill.
  threatWeights:[
    { code:ThreatWeight.closest,     weight:50 },
    { code:ThreatWeight.leastArmor,  weight:75 },
    { code:ThreatWeight.leastHealth, weight:75 },
  ],

  attributeGrowth: {
    strength: 30,
    dexterity: 80,
    vitality: 100,
    intelligence: 10,
    beauty: 10,
  }

});
