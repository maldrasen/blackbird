MonsterBrain.register('rogue',{

  threatWeights:[
    { code:ThreatWeight.closest,     weight:25 },
    { code:ThreatWeight.leastArmor,  weight:100 },
    { code:ThreatWeight.leastHealth, weight:75 },
  ],

  attributeGrowth: {
    strength: 50,
    dexterity: 100,
    vitality: 30,
    intelligence: 10,
    beauty: 10,
  },

});
