MonsterBrain.register('fighter',{

  threatWeights:[
    { code:ThreatWeight.closest,     weight:50 },
    { code:ThreatWeight.leastArmor,  weight:75 },
    { code:ThreatWeight.leastHealth, weight:100 },
  ],

  attributeGrowth: {
    strength: 100,
    dexterity: 60,
    vitality: 80,
    intelligence: 20,
    beauty: 10,
  },

});
