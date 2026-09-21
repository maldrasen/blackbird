// A door sits on the north or west wall of its position tile, with the from room owning that tile and the to room
// owning the tile on the other side of the wall. Doors to the south or east are expressed by shifting the position
// onto the neighboring tile. Doors are plain data rather than a closure model, as they're dumped raw when a floor is
// packed and read field-wise throughout the floor factories and views.
global.Door = function({ position, direction, from, to }) {
  Validate.isIn('direction', direction, ['N','W']);

  return { position, direction, from, to, open:false };
}
