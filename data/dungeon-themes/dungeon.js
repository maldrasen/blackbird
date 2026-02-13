
// Generic regular dungeon, the most common theme. Because this is the most
// often picked theme though it will need the largest and most varied
// collection of features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: 1,

  features:[
    { code:'temp.1', rarity:1, types:['rect-room'], width:[2,5], height:[2,5],
      contents:['empty']},

    { code:'temp.2', rarity:1, types:['leg-room'],
      width:[4,6], height:[4,6], legRatio:[30,60], legLength:[2,6],
      contents:['empty'] }
  ]

});
