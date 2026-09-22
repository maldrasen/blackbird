// The wall segments the party's light is cast against, in floor pixels. They're built from the same geometry the
// rooms and doors are drawn with, so whatever blocks the light is exactly what's on the map: a room's wall line with
// its door openings cut out, the outer face of any room nested inside it, a jamb at each end of every doorway joining
// the wall lines on either side, the slab of a door while it's still closed, and an octagon standing in for the body
// of a glyph that's been set to cast a shadow.
global.DungeonVisionOccluders = (function() {

  // The octagon's circumradius as a fraction of the glyph's font size, small enough that the shadow starts inside
  // the glyph's ink and the glyph can be drawn whole over it.
  const glyphShadowFactor = 0.3;
  const glyphShadowSides = 8;

  let rooms = [];
  let jambs = [];
  let slabs = [];
  let glyphs = [];
  let statics = [];

  function build(floor) {
    const doors = floor.getDoors();

    rooms = floor.getRooms().map(room => ({ index:room.getIndex(), segments:roomSegments(floor, room, doors) }));
    jambs = doors.flatMap(door => doorJambs(door));
    slabs = doors.map(door => ({ door, segment:doorSlab(door) }));
    glyphs = floor.getRooms().flatMap(room => glyphOccluders(room));
    statics = [...rooms.flatMap(room => room.segments), ...jambs, ...glyphs];
  }

  // Everything the light could reach from inside a box. A door's slab only counts while the door is closed, which
  // is read from the door itself so that opening one needs no bookkeeping here.
  function nearby(box) {
    const closed = slabs.filter(slab => slab.door.open === false).map(slab => slab.segment);
    return VisibilityHelper.segmentsInBox([...statics, ...closed], box);
  }

  // A room's own wall line and the outer faces of the rooms nested in it, with the openings of its doors cut out.
  function roomSegments(floor, room, doors) {
    const gridSize = DungeonFloorView.getGridSize();
    const position = room.getFloorPosition();
    const index = room.getIndex();
    const outlines = [
      DungeonRoomView.getRoomGeometry(room).wallLine,
      ...DungeonRoomView.getNestedGeometry(floor, room).map(nested => nested.wallLine),
    ];

    const segments = outlines.flatMap(outline => VisibilityHelper.loopSegments(outline.map(vertex => ({
      x: (position.x * gridSize) + vertex.x,
      y: (position.y * gridSize) + vertex.y,
    }))));

    return doors
      .filter(door => door.from === index || door.to === index)
      .reduce((cut, door) => VisibilityHelper.subtractRect(cut, DungeonDoorView.getOpening(door)), segments);
  }

  // A doorway is a gap in the wall lines on both sides of the wall, so a jamb at each end joins them across the
  // wall's thickness. The wall lines sit one inset in from the shared edge on either side.
  function doorJambs(door) {
    const center = DungeonDoorView.getDoorCenter(door);
    const along = DungeonDoorView.getDoorLength() / 2;
    const reach = DungeonRoomView.getWallInset();

    return [-along, along].map(offset => (door.direction === 'N')
      ? { a:{ x:center.x + offset, y:center.y - reach }, b:{ x:center.x + offset, y:center.y + reach } }
      : { a:{ x:center.x - reach, y:center.y + offset }, b:{ x:center.x + reach, y:center.y + offset } });
  }

  function doorSlab(door) {
    const center = DungeonDoorView.getDoorCenter(door);
    const along = DungeonDoorView.getDoorLength() / 2;

    return (door.direction === 'N')
      ? { a:{ x:center.x - along, y:center.y }, b:{ x:center.x + along, y:center.y } }
      : { a:{ x:center.x, y:center.y - along }, b:{ x:center.x, y:center.y + along } };
  }

  function glyphOccluders(room) {
    const gridSize = DungeonFloorView.getGridSize();
    const position = room.getFloorPosition();

    return room.getGlyphs().filter(glyph => glyph.shadow).flatMap(glyph => {
      const center = { x: (position.x + glyph.x) * gridSize, y: (position.y + glyph.y) * gridSize };
      const radius = (glyph.size || DungeonRoomView.getDefaultGlyphSize()) * glyphShadowFactor;
      return VisibilityHelper.regularPolygon(center, radius, glyphShadowSides);
    });
  }

  return {
    build,
    nearby,
    getRooms: () => { return rooms; },
    getJambs: () => { return jambs; },
  };

})();
