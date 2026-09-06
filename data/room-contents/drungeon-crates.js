
function describe() {
  const descriptions = WeaverPackage('dungeon-crates');
  descriptions.add(`The room might have been used for storage at some point. A half dozen wooden crates are pushed up
    against one of the walls. Most look like they've been broken into at some point, but there might be one or two
    left unexamined.`, DungeonRequirements.roomSizeAtLeast(16));
  descriptions.add(`The small room is crammed with a number of wooden crates, stacked haphazardly to the ceiling. They 
    don't look like they'd hold anything particularly valuable, but you might be able to find some supplies at least.`,
    DungeonRequirements.roomSizeAtMost(16));
  return descriptions.pick();
}

function open() {
  DungeonSystem.getDungeonFloor().getCurrentRoom().updateDescription(`The room is cluttered with empty, discarded
    crates, now thoroughly rifled through.`);

  return {
    text: `You carefully pry one of the crates open.`,
    loot: LootGenerator().generateChestLoot({ quality:0.6, quantity:1.2 }),
  };
}

RoomContents.register('dungeon-crates',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
