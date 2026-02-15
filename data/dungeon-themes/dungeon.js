
// Generic regular dungeon, the most common theme. Because this is the most
// often picked theme though it will need the largest and most varied
// collection of features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: 1,

  // TODO: The room contents need to be a many to many relationship with the features. Rather than having arrays on
  //       both I think the dungeon themes need to each have a join table. They would only reference features and
  //       contents by code, as defined in that theme. Like the features, the contents will be simple, reference a
  //       content type, and pass along a few arguments.
  //
  // TODO: Actually handle the rarity and update these values.
  //
  features:[
    { code:'small-square', rarity:1, type:'rect-room',  size:[2,5]},
    { code:'large-square', rarity:1, type:'rect-room',  size:[5,8]},
    { code:'leg-room',     rarity:1, type:'leg-room',   size:[3,8]},
    { code:'tea-room',     rarity:1, type:'tea-room',   size:[3,8]},
    { code:'cross-room',   rarity:1, type:'cross-room', size:[3,9]},
  ]

});
