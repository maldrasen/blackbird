
function buildNestedDoor(offset, size) {
  const wall = Random.from(['N','S','E','W']);
  const center = offset + Math.floor((size - 1) / 2);

  switch (wall) {
    case 'N': return { position:{ x:center, y:offset - 1 }, direction:'S', from:0, to:1 };
    case 'S': return { position:{ x:center, y:offset + size - 1 }, direction:'S', from:1, to:0 };
    case 'E': return { position:{ x:offset + size - 1, y:center }, direction:'E', from:1, to:0 };
    case 'W': return { position:{ x:offset - 1, y:center }, direction:'E', from:0, to:1 };
  }
}

function maxPadding(options, size) {
  const maxPossible = Math.floor((size - 1) / 2);
  const maxAllowed = options.padding[1];
  return Math.min(maxAllowed, maxPossible);
}

FeatureType.register('nested-room',{

  // Build a rectangular outer room with a second room nested in its center, joined by a single door centered on a
  // random wall of the inner room.
  //   size: [min,max] (min is at least 3)
  //   padding: [min,max]
  build: function(options) {
    if (options.size[0] < 3) { throw new Error(`Minimum outer size needs to be at least 3`); }

    const outer = Room();
    const inner = Room('nested');
    const size = Random.between(options.size[0], options.size[1]);
    const padding = Random.between(options.padding[0],maxPadding(options, size));
    const innerSize = size - (padding*2);

    outer.addBox(0, 0, size, size);
    inner.addBox(0, 0, innerSize, innerSize);
    inner.setPosition(padding, padding);
    inner.allowStairs();

    const feature = Feature('nested-room');
    feature.addRoom(outer);
    feature.addRoom(inner);
    feature.addDoor(buildNestedDoor(padding, innerSize));

    return feature;
  }
});
