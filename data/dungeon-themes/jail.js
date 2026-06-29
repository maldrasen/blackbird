
// Jail cells
DungeonTheme.register('jail',{
  name: "Jail",
  rarity: 2,

  features:[
    { code:'small-square', rarity:1, type:'rect-room',  size:[2,5]},
    { code:'large-square', rarity:1, type:'rect-room',  size:[5,8]},
    { code:'leg-room',     rarity:1, type:'leg-room',   size:[3,8]},
    { code:'tea-room',     rarity:1, type:'tea-room',   size:[3,8]},
    { code:'cross-room',   rarity:1, type:'cross-room', size:[3,9]},
  ]

});
