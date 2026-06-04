MonsterBrain.register('hunter',{

  threatWeights:[
    { code:ThreatWeight.leastArmor,  weight:75 },
    { code:ThreatWeight.leastHealth, weight:100 },
  ],

  attributeGrowth: {
    strength: 20,
    dexterity: 100,
    vitality: 30,
    intelligence: 50,
    beauty: 10,
  },

});
