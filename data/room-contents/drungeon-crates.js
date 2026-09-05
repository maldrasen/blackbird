
function describe() {
  const descriptions = WeaverPackage('dungeon-crates');
  descriptions.add(`The room might have been used for storage at some point. A half dozen wooden crates are pushed up
    against one of the walls. Most look like they've been broken into at some point, but there might be one or two
    left unexamined.`);
  descriptions.add(`The small room is crammed with a number of wooden crates, stacked haphazardly to the ceiling. They 
    don't look like they'd hold anything particularly valuable, but you might be able to find some supplies at least.`,
    DungeonRequirements.isSmallRoom());
  return descriptions.pick();
}

function open() {
  return {
    text: `TODO: You open a crate.`,
    loot: LootGenerator().generateChestLoot({ quality:0.6, quantity:1.2 }),
  };
}

// TODO: We need an option to change the room's description after a command has been executed. Can't say that a room
//       has unopened boxes when the action here is to open these boxes.

RoomContents.register('dungeon-crates',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
