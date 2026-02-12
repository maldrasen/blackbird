
// Generic regular dungeon, the most common theme. Because this is the most
// often picked theme though it will need the largest and most varied
// collection of features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: 1,

  features:[
    { code:'emptyRoom', rarity:1, type:'generic', width:[2,5], height:[2,5],
      contents:['empty']},
  ]

});
