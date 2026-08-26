
// Large cathedral areas, chapels, libraries and such.
DungeonTheme.register('cathedral',{
  name: "Cathedral",
  rarity: Rarity.rare,
  range: [4,7],

  features:[
    { code:'small-square', rarity:Rarity.common, type:'rect-room',  size:[2,5]},
    { code:'large-square', rarity:Rarity.common, type:'rect-room',  size:[5,8]},
    { code:'leg-room',     rarity:Rarity.common, type:'leg-room',   size:[3,8]},
    { code:'tea-room',     rarity:Rarity.common, type:'tea-room',   size:[3,8]},
    { code:'cross-room',   rarity:Rarity.common, type:'cross-room', size:[3,9]},
  ],

  getFloorTexture: () => { return DungeonFloorGrid; },
});
