
// Really just needed something to go into the 'any floor, 4 rarity' space.
// Caves is obviously too generic though. Should be some kind of weird cave,
// or something else entirely. Who knows, placeholder for now I guess.
DungeonTheme.register('caves',{
  name: "Caves",
  rarity: 4,

  features:[
    { code:'emptyRoom', rarity:1, type:'generic', width:[2,5], height:[2,5]},
  ]

});
