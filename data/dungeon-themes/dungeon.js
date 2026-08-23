
const plainDescriptions = WeaverPackage('dungeon.plain');
const upStairDescriptions = WeaverPackage('dungeon.upStairs');
const downStairDescriptions = WeaverPackage('dungeon.downStairs');

// Generic regular dungeon, the most common theme. Because this is the most often picked theme though it will need
// the largest and most varied collection of contents and features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: Rarity.common,

  extraStairChance: 66,
  roomContentChance: 20,
  roomContents:[
    { code:'tripe-patch', rarity:Rarity.common },
  ],

  features:[
    { code:'small-square', rarity:Rarity.common, type:'rect-room',  size:[2,5]},
    { code:'large-square', rarity:Rarity.common, type:'rect-room',  size:[5,8]},
    { code:'leg-room',     rarity:Rarity.common, type:'leg-room',   size:[3,8]},
    { code:'tea-room',     rarity:Rarity.common, type:'tea-room',   size:[3,8]},
    { code:'cross-room',   rarity:Rarity.common, type:'cross-room', size:[3,9]},
    { code:'nested-room',  rarity:Rarity.common, type:'nested-room', size:[3,7], padding:[1,3]},
  ],

  getFloorTexture: () => { return DungeonFloorGrid; },
  getWallTexture: () => { return DungeonWallGrid; },

  cohorts: [
    'skitterfangs',
    'daggermaws',
    'roaches',
    'yeeks',
    'deepdark-kobolds',
    'flamescale-kobolds',
  ],

  descriptions: {
    plain: plainDescriptions,
    upStairs: upStairDescriptions,
    downStairs: downStairDescriptions,
  },
});

// TODO: Add a lot more dungeon room descriptions. We'll eventually need more that 100 I think, most of which will be
//       variations of "An empty stone room with nothing interesting in it."

plainDescriptions.add(`An extremely plain room`);
upStairDescriptions.add(`A room with stairs going up.`);
downStairDescriptions.add(`A room with stairs going down.`);
