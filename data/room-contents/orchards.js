
function describe() {
  const size = DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size;
  return `TODO: An orchard with size ${size}`;
}

RoomContents.register('orchard-empty',{
  episode:'orchard-empty',
  description: describe,
});
