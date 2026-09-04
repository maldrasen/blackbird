
function describe() {
  const descriptions = WeaverPackage('dungeon-larder');
  descriptions.add(`A room with shelves stocked with food and bottles.`);
  return descriptions.pick();
}

function open() {
  return {
    text: `TODO: You rifle through the goods.`,
    loot: LootGenerator.generateChestLoot({ quantity:1.5, groups:{ foods:100, alcohols:30 }}),
  };
}

RoomContents.register('dungeon-larder',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
