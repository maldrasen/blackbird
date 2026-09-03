
function describe() {
  return `TODO: A plain room with a chest.`
}

function open() {
  return {
    text: `TODO: You open the treasure chest.`,
    loot: LootGenerator.forCurrentLocation(),
  };
}

RoomContents.register('plain-treasure-room',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
