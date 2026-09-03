
function describe() {
  return `TODO: A plain room with a chest.`
}

function open() {
  return `TODO: You open the treasure chest.`
}

RoomContents.register('plain-treasure-room',{
  commands: [{ code:'open', label:'Inspect', execute:open }],
  description: describe,
});
