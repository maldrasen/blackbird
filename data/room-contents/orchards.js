
function getAppleCount() {
  return Math.ceil(DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size / 5);
}

function getSizeCategory() {
  const size = DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size;
  if (size > 25) { return 'large'; }
  if (size < 18) { return 'small'; }
  return 'modest'
}

function describe() {
  const category = getSizeCategory();

  if (category === 'small') { return `The twisted trees in this small underground orchard are tall enough to brush
    against the chamber's stone ceiling.`; }

  if (category === 'large') { return `The long rows of trees in this large underground orchard stretch off into the 
    darkness, providing both food for the dungeon's denizens, as well as ample places to ambush from.`; }

  return `The underground orchard is strangely dark and still. No breeze stirs the leaves of these trees, and no 
    sunlight ever shines upon them.`;
}

function harvest() {
  return {
    text: `You pick some apples, stuffing them into your bag for a future snack.`,
    loot: { articleCode:'rhysh-apple', quantity:getAppleCount() }
  }
}

RoomContents.register('orchard-empty',{
  commands: [{ code:'harvest', label:'Harvest', execute:harvest }],
  description: describe,
});

RoomContents.register('orchard-kobolds',{
  episode:'orchard-kobolds',
  description: describe,
});
