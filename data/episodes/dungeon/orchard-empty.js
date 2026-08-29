
function getAppleCount() {
  return  Math.ceil(DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size / 5);
}

// TODO: We need a standardized loot element that we can add as part of the description here.

function harvestApples() {
  const count = getAppleCount();
  const lootBlock = WeaverElements.lootBlock([{ articleCode:'rhysh-apple', quantity:count }]);

  InventoryManager().addArticle('rhysh-apple',count);

  return `<p>You pick some apples...</p>${lootBlock}`;
}

const harvestButtons = [
  { label:'Pick some apples.', jump:'harvested' },
  { label:'Leave them alone.', end:true },
]

Episode.register('orchard-empty',{
  layout: 'centered',
  repeat: true,
  pages: [
    { content:`You find an orchard.`, buttons:harvestButtons, buttonsStyle:'column' },
    { contentFunction:harvestApples, label:'harvested' },
  ],
});
