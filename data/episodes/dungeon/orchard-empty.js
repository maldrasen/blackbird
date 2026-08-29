
function getAppleCount() {
  return  Math.ceil(DungeonSystem.getDungeonFloor().getCurrentRoom().getContentsOptions().size / 5);
}

function harvestApples() {
  const count = getAppleCount();
  const lootBlock = WeaverElements.lootBlock([{ articleCode:'rhysh-apple', quantity:count }]);
  InventoryManager().addArticle('rhysh-apple',count);
  return `<p>You pick some apples, stuffing them into your bag for a future snack.</p>${lootBlock}`;
}

const page1 = `You step into the room, your feet sinking slightly into the bare dirt floor. Several rows of dark, 
  twisted looking trees disappear into the darkness. Even here, deep underground without any source of light, the trees
  have grown tall and full, their dark green leaves brushing against the stone ceiling above. You spot a number of 
  bright red apples within the branches. Yours for the taking if you want them.`

const harvestButtons = [
  { label:'Pick some apples.', jump:'harvested' },
  { label:'Leave them alone.', end:true },
]

Episode.register('orchard-empty',{
  layout: 'centered',
  repeat: true,
  pages: [
    { content:page1, buttons:harvestButtons, buttonsStyle:'column' },
    { contentFunction:harvestApples, label:'harvested' },
  ],
});
