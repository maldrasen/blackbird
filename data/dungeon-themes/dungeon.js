
const plainDescriptions = WeaverPackage('dungeon.plain');
const corridorDescriptions = WeaverPackage('dungeon.corridor');
const upStairDescriptions = WeaverPackage('dungeon.upStairs');
const downStairDescriptions = WeaverPackage('dungeon.downStairs');

// Generic regular dungeon, the most common theme. Because this is the most often picked theme though it will need
// the largest and most varied collection of contents and features.
DungeonTheme.register('dungeon',{
  name: "The Dungeon",
  rarity: Rarity.common,

  floorHeight: 15,
  floorWidth: 15,

  extraStairChance: 66,
  roomContentChance: 20,
  roomContents:[
    { code:'tripe-patch', rarity:Rarity.common },
  ],

  features:[
    { code:'small-square', rarity:Rarity.common, type:'rect-room',  size:[2,5]},
    { code:'leg-room',     rarity:Rarity.common, type:'leg-room',   size:[3,8]},
    { code:'tea-room',     rarity:Rarity.common, type:'tea-room',   size:[3,8]},
    { code:'cross-room',   rarity:Rarity.common, type:'cross-room', size:[3,9]},
    { code:'large-square', rarity:Rarity.unusual, type:'rect-room',  size:[5,8]},
    { code:'nested-room',  rarity:Rarity.unusual, type:'nested-room', size:[3,7], padding:[1,3]},
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
    corridor: corridorDescriptions,
    upStairs: upStairDescriptions,
    downStairs: downStairDescriptions,
  },
});

// TODO: Add a lot more dungeon room descriptions. We'll eventually need more that 100 I think, most of which will be
//       variations of "An empty stone room with nothing interesting in it."

plainDescriptions.add(`You spot a rat, scurrying off into the darkness as you enter the room.`);
plainDescriptions.add(`You spot a meandering trail of slimy footprints, crossing the ground in front of you and
  continuing up the wall. A yeek probably.`);
plainDescriptions.add(`A large gaping hole in the floor has been almost entirely filled with kobold bones. You're not
  sure what could have collected them here; either some beast or perhaps even the kobolds themselves.`);
plainDescriptions.add(`The floor if this tiny room is littered with discarded bottles.`,
  DungeonRequirements.isTinyRoom());
plainDescriptions.add(`The stone ceiling of the room is uncomfortable low, making the already small room feel
  claustrophobic.`,DungeonRequirements.isSmallRoom());
plainDescriptions.add(`Apart from a thick layer of dust on the floor, This modest chamber is completely empty`,
  DungeonRequirements.isMediumRoom());
plainDescriptions.add(`A giant slab of stone lies sitting in the center of the large room. The depression in the
  ceiling shows where it fell from, and the skeletal arm reaching out from underneath tells the rest of the story.`,
  DungeonRequirements.isLargeRoom());
plainDescriptions.add(`This large room's ceiling is intricately coffered, forming a grid of sunken panels. Each coffer
  contains a grinning skull motif, looking down on you ominously.`, DungeonRequirements.isHugeRoom());

corridorDescriptions.add(`The stone corridor is unusually narrow, forcing you and your {party} to walk single file
  through it.`, PartyRequirements.sizeAtLeast(3));

upStairDescriptions.add(`A room with stairs going up.`);
downStairDescriptions.add(`A room with stairs going down.`);
