
function getSizeCategory() {
  const size = DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size;
  if (size > 25) { return 'large'; }
  if (size < 18) { return 'small'; }
  return 'modest'
}

function describe() {
  const category = getSizeCategory();

  if (category === 'small') {
    return `A Small Orchard`;
  }

  if (category === 'large') {
    return `A Large Orchard`;
  }

  return `A Modest Orchard`;
}

RoomContents.register('orchard-empty',{
  episode:'orchard-empty',
  description: describe,
});
