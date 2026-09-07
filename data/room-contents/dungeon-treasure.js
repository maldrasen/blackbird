
function describe() {
  const descriptions = WeaverPackage('dungeon-treasure');
  descriptions.add(`TODO: A treasure room with high quality treasure.`);
  return descriptions.pick();
}

function open() {
  DungeonSystem.getDungeonFloor().getCurrentRoom().updateDescription(`TODO: Room with an opened treasure chest.`);

  return {
    text: `TODO: You open the treasure chest.`,
    loot: LootGenerator().generateChestLoot({ quality:1.5, quantity:0.5 }),
  };
}

RoomContents.register('dungeon-treasure',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
