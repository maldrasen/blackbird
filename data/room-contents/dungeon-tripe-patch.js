
function harvest() {
  const count = Random.between(3,6);
  InventoryManager().addArticle('dungeon-tripe',count);
  return {
    text: `You harvest ${count} uncomfortably moist furls of pungent dungeon tripe. Lucky you.`,
    loot: [{ articleCode:'dungeon-tripe', quantity:count }],
  };
}

RoomContents.register('dungeon-tripe-patch',{
  commands:[{ code:'harvest', label:'Harvest', execute:harvest }],
  description:`The room you enter is hot and humid. You spot a small patch of bright orange lichen growing on one of
    the stone walls.`,
});
