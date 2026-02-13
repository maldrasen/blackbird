
// Generic regular dungeon, the most common theme. Because this is the most
// often picked theme though it will need the largest and most varied
// collection of features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: 1,

  // TODO: Do we need codes? What would they be used for when a feature has a type, or a collection of types and a list
  //       of contents? We need to figure out how contents are selected. Should be a many to many relationship, but we
  //       shouldn't need to explicitly state that every room can have a combat encounter.
  features:[
    { code:'temp.1', rarity:1, types:['rect-room'], width:[2,5], height:[2,5],
      contents:['empty']},

    { code:'temp.2', rarity:1, types:['leg-room'],
      width:[4,6], height:[4,6], legRatio:[30,60], legLength:[2,6],
      contents:['empty'] },

    { code:'temp.3', rarity:1, types:['tea-room'],
      width:[6,10], height:[2,6], trim:[1,3], teaLength:[2,6],
      contents:['empty'] },
  ]

});
