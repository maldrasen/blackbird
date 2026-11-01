
const upStairDescriptions = WeaverPackage('dungeon.upStairs');
const downStairDescriptions = WeaverPackage('dungeon.downStairs');

// Generic regular dungeon, the most common theme. Because this is the most often picked theme though it will need
// the largest and most varied collection of contents and features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: Rarity.common,

  floorHeight: 40,
  floorWidth: 60,

  extraStairChance: 66,
  newRoomEncounterRate: 20,
  stepEncounterRate: 0.5,
  roomContentChance: 20,
  roomContents:[
    { code:'dungeon-tripe-patch', rarity:Rarity.common },
    { code:'dungeon-crates', rarity:Rarity.common },
    { code:'dungeon-larder', rarity:Rarity.unusual },
    { code:'dungeon-treasure', rarity:Rarity.rare },
  ],

  tileContents: [
    { type:TileContentType.trap, count:[10,20], codes:{ 'spike-trap':6, 'pit-trap':4 }},
  ],

  features:[
    { code:'small-square', rarity:Rarity.common,  type:'rect-room',   size:[2,5]},
    { code:'leg-room',     rarity:Rarity.common,  type:'leg-room',    size:[3,8]},
    { code:'tea-room',     rarity:Rarity.common,  type:'tea-room',    size:[3,8]},
    { code:'cross-room',   rarity:Rarity.common,  type:'cross-room',  size:[3,9]},
    { code:'large-square', rarity:Rarity.unusual, type:'rect-room',   size:[5,7]},
    { code:'nested-room',  rarity:Rarity.unusual, type:'nested-room', size:[3,7], padding:[1,3]},
    { code:'orchard',      rarity:Rarity.rare,    type:'orchard',     size:[7,11]},
  ],

  getFloorTexture: () => { return DungeonFloorGrid; },

  cohorts: [
    'claws',
    'daggermaws',
    'gnawbones',
    'roaches',
    'skitterfangs',
    'yeeks',
    'kobolds-deepdarks',
    'kobolds-flamescales',
  ],

  descriptions: {
    upStairs: upStairDescriptions,
    downStairs: downStairDescriptions,
  },

  lootQuantity: [1,4],
  lootQuality: 1,
  lootGroups: {
    foods: 100,
    alcohols: 30,
    drugs: 10,
    potions: 20,
    explosives: 50,
    supplies: 100,
    valuables: 100,
  },

});

upStairDescriptions.add(`There are stairs here, leading back up to the floor above.`);
upStairDescriptions.add(`A spiral stairway takes up most of the space in this small room.`, DungeonRequirements.isTinyRoom());

downStairDescriptions.add(`There are stairs here, descending down into the darkness below..`);
downStairDescriptions.add(`A spiral stairway takes up most of the space in this small room.`, DungeonRequirements.isTinyRoom());
