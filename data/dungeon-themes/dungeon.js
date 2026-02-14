
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
    // { rarity:1, type:'rect-room', size:[2,5],
    //   contents:['empty']},

    // { rarity:1, type:'leg-room',
    //   size:[4,6], legRatio:[30,60], legLength:[2,6],
    //   contents:['empty'] },

    { rarity:1, type:'tea-room', size:[3,6],
      contents:['empty'] },

    // { rarity:1, type:'cross-room', size:[3,12],
    //   contents:['empty'] },
  ]

});
