// The party's light, drawn as darkness laid over the fully lit floor. A shadow covers everything the light can't
// reach from the marker, and a radial falloff fades the floor out toward the edge of the light. The outlines of the
// walls and doors are drawn back over the shadow as trim, clipped to the light, so that the shadow's edge never
// cuts through a stroke, and every glyph whose body is in the light is drawn whole in front of its own shadow. Over
// all of that sits the memory: the same outlines and glyphs, dimmed, wherever the light has ever reached, kept on
// the floor as seen tiles. Everything else is redrawn on every frame the marker moves, from the visibility polygon
// cast against the floor's occluders.
global.DungeonVisionView = (function() {

  const lightRadius = 4.5;
  const falloffStart = 0.55;
  const overshoot = 3;
  const glyphMargin = 2;

  // Where a tile is looked at from to decide whether the light has reached it: its center and four points well
  // inside its corners, clear of the wall lines and of any glyph body standing on it.
  const tileSamples = [
    { x:0.5, y:0.5 }, { x:0.15, y:0.15 }, { x:0.85, y:0.15 }, { x:0.15, y:0.85 }, { x:0.85, y:0.85 },
  ];

  let floor = null;
  let svg = null;
  let shadow = null;
  let clip = null;
  let seenClip = null;
  let falloff = null;
  let floorRect = '';
  let glyphs = [];

  function build(dungeonFloor) {
    const gridSize = DungeonFloorView.getGridSize();
    const width = dungeonFloor.getFloorWidth() * gridSize;
    const height = dungeonFloor.getFloorHeight() * gridSize;
    const radius = lightRadius * gridSize;

    floor = dungeonFloor;
    DungeonVisionOccluders.build(floor);
    floorRect = `M0 0 H${width} V${height} H0 Z`;

    const outlineMarkup = outlines();
    const glyphMarkup = buildGlyphs();

    svg = X.createElement([
      `<svg id='dungeonVision' viewBox='0 0 ${width} ${height}'>`,
      `<defs>`,
      `<radialGradient id='visionFalloff' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='${radius}'>`,
      `<stop offset='0' stop-opacity='0'/>`,
      `<stop offset='${falloffStart}' stop-opacity='0'/>`,
      `<stop offset='1' stop-opacity='1'/>`,
      `</radialGradient>`,
      `<clipPath id='visionClip'><path/></clipPath>`,
      `<clipPath id='seenClip'><path/></clipPath>`,
      `</defs>`,
      `<path class='shadow' fill-rule='evenodd'/>`,
      `<g class='trim outlines' clip-path='url(#visionClip)'>${outlineMarkup}</g>`,
      `<g class='trim glyphs'>${glyphMarkup}</g>`,
      `<rect class='falloff' width='${width}' height='${height}' fill='url(#visionFalloff)'/>`,
      `<g class='memory outlines' clip-path='url(#seenClip)'>${outlineMarkup}</g>`,
      `<g class='memory glyphs'>${glyphMarkup}</g>`,
      `</svg>`,
    ].join(''));
    svg.style['width'] = `${width}px`;
    svg.style['height'] = `${height}px`;

    shadow = svg.querySelector('.shadow');
    clip = svg.querySelector('#visionClip path');
    seenClip = svg.querySelector('#seenClip path');
    falloff = svg.querySelector('#visionFalloff');
    pairGlyphElements(svg.querySelectorAll('.trim.glyphs .glyph'), svg.querySelectorAll('.memory.glyphs .glyph'));
    rebuildMemory();

    return svg;
  }

  // The outlines are the occluders themselves, one path per room so that the current room can be picked out, with
  // each door's slab drawn just as the floor draws it. They go in as plain elements rather than being shared
  // through a <use>, because the stylesheet's descendant selectors don't reach into a use element's shadow tree and
  // the trim lost its styling that way.
  function outlines() {
    return [
      ...DungeonVisionOccluders.getRooms().map(room => wallsMarkup(room)),
      ...floor.getDoors().map(door => doorMarkup(door)),
    ].join('');
  }

  function wallsMarkup(room) {
    const classname = (room.index === floor.getLocation()) ? 'walls current' : 'walls';
    const d = room.segments.map(segment => `M${point(segment.a)} L${point(segment.b)}`).join(' ');
    return `<path class='${classname}' data-index='${room.index}' d='${d}'/>`;
  }

  function doorMarkup(door) {
    const center = DungeonDoorView.getDoorCenter(door);
    const classname = door.open ? `door ${door.direction} open` : `door ${door.direction}`;
    return `<g class='${classname}' data-x='${door.position.x}' data-y='${door.position.y}' transform='translate(${center.x} ${center.y})'>`
      + DungeonDoorView.slabMarkup(door.direction)
      + `</g>`;
  }

  // Every glyph on the floor, drawn just as its room draws it but switched on and off rather than clipped. Each is
  // remembered with its body (the center and radius of its occluder, zero for a glyph that casts no shadow) and the
  // tile under its center, in the order the markup lists them: the rooms in order and each room's glyphs in order.
  function buildGlyphs() {
    const gridSize = DungeonFloorView.getGridSize();
    glyphs = [];

    return floor.getRooms().map(room => {
      const markup = DungeonRoomView.roomGlyphs(room);
      if (markup.length === 0) { return ''; }

      const position = room.getFloorPosition();
      room.getGlyphs().forEach(glyph => {
        const center = { x: (position.x + glyph.x) * gridSize, y: (position.y + glyph.y) * gridSize };
        glyphs.push({
          center,
          tile: { x:Math.floor(center.x / gridSize), y:Math.floor(center.y / gridSize) },
          radius: DungeonVisionOccluders.glyphRadius(glyph),
          visible: false,
          seen: false,
          element: null,
          memoryElement: null,
        });
      });

      return `<g transform='translate(${position.x * gridSize} ${position.y * gridSize})'>${markup.join('')}</g>`;
    }).join('');
  }

  function pairGlyphElements(trimElements, memoryElements) {
    if (trimElements.length !== glyphs.length || memoryElements.length !== glyphs.length) {
      throw new Error(`The vision has ${glyphs.length} glyph bodies but ${trimElements.length} lit and ${memoryElements.length} remembered glyph elements.`);
    }
    glyphs.forEach((glyph, i) => {
      glyph.element = trimElements[i];
      glyph.memoryElement = memoryElements[i];
    });
  }

  // Cast the light from a position in tile units, usually the marker's drawn position part way through a step. The
  // shadow is the whole floor with the visibility polygon cut out of it, and the same polygon clips the trim.
  function render(position) {
    if (svg == null) { return; }

    const gridSize = DungeonFloorView.getGridSize();
    const radius = lightRadius * gridSize;
    const origin = { x: (position.x + 0.5) * gridSize, y: (position.y + 0.5) * gridSize };
    const box = { xMin:origin.x - radius, xMax:origin.x + radius, yMin:origin.y - radius, yMax:origin.y + radius };
    const segments = DungeonVisionOccluders.nearby(box);
    const polygon = VisibilityHelper.computePolygon(origin, segments, box, overshoot);
    const outline = pathFor(polygon);

    shadow.setAttribute('d', `${floorRect} ${outline}`);
    clip.setAttribute('d', outline);
    falloff.setAttribute('cx', origin.x);
    falloff.setAttribute('cy', origin.y);
    updateGlyphs(origin, radius, segments);

    if (markSeenTiles(origin, radius, segments)) { rebuildMemory(); }
  }

  // A glyph is lit while the point just in front of its body, on the line from the light, is in the light. Only
  // the glyphs whose state changes touch the page.
  function updateGlyphs(origin, radius, segments) {
    glyphs.forEach(glyph => {
      const visible = isLit(origin, radius, segments, nearPoint(origin, glyph));
      if (visible === glyph.visible) { return; }

      glyph.visible = visible;
      glyph.element.classList.toggle('visible', visible);
    });
  }

  function nearPoint(origin, glyph) {
    if (glyph.radius === 0) { return glyph.center; }

    const distance = Math.hypot(glyph.center.x - origin.x, glyph.center.y - origin.y);
    const reach = glyph.radius + glyphMargin;
    if (distance <= reach) { return origin; }

    const t = (distance - reach) / distance;
    return {
      x: origin.x + ((glyph.center.x - origin.x) * t),
      y: origin.y + ((glyph.center.y - origin.y) * t),
    };
  }

  function isLit(origin, radius, segments, target) {
    return Math.hypot(target.x - origin.x, target.y - origin.y) <= radius
        && VisibilityHelper.isVisible(origin, target, segments);
  }

  // Mark every tile in the light box that the light has reached for the first time, which is when any of its
  // sample points is within the radius with nothing in the way. Says whether there were any.
  function markSeenTiles(origin, radius, segments) {
    const gridSize = DungeonFloorView.getGridSize();
    const xMin = Math.max(0, Math.floor((origin.x - radius) / gridSize));
    const xMax = Math.min(floor.getFloorWidth() - 1, Math.floor((origin.x + radius) / gridSize));
    const yMin = Math.max(0, Math.floor((origin.y - radius) / gridSize));
    const yMax = Math.min(floor.getFloorHeight() - 1, Math.floor((origin.y + radius) / gridSize));
    let changed = false;

    for (let y = yMin; y <= yMax; y++) {
      for (let x = xMin; x <= xMax; x++) {
        if (floor.isTileSeen(x, y) || floor.getRoomIndexAt(x, y) == null) { continue; }
        if (tileIsLit(x, y, origin, radius, segments) === false) { continue; }

        floor.markTileSeen(x, y);
        changed = true;
      }
    }

    return changed;
  }

  function tileIsLit(x, y, origin, radius, segments) {
    const gridSize = DungeonFloorView.getGridSize();
    return tileSamples.some(sample =>
      isLit(origin, radius, segments, { x: (x + sample.x) * gridSize, y: (y + sample.y) * gridSize }));
  }

  // The memory clip is a square for every seen tile, which covers the wall lines inset into it, plus the opening of
  // any door with a seen tile on either side, so that a slab is never shown by halves. A glyph is remembered once
  // the tile under it has been seen.
  function rebuildMemory() {
    const gridSize = DungeonFloorView.getGridSize();
    const squares = floor.getSeenTiles().map(tile =>
      `M${tile.x * gridSize} ${tile.y * gridSize} h${gridSize} v${gridSize} h${-gridSize} Z`);
    const openings = floor.getDoors()
      .filter(door => doorTiles(door).some(tile => floor.isTileSeen(tile.x, tile.y)))
      .map(door => rectPath(DungeonDoorView.getOpening(door)));

    seenClip.setAttribute('d', [...squares, ...openings].join(' '));

    glyphs.forEach(glyph => {
      if (glyph.seen || floor.isTileSeen(glyph.tile.x, glyph.tile.y) === false) { return; }

      glyph.seen = true;
      glyph.memoryElement.classList.add('seen');
    });
  }

  // The tiles on either side of a door's wall: its own tile and the north or west neighbor.
  function doorTiles(door) {
    const { x, y } = door.position;
    return (door.direction === 'N') ? [{ x, y }, { x, y:y - 1 }] : [{ x, y }, { x:x - 1, y }];
  }

  function refresh() {
    render(DungeonPartyMarker.getDrawnPosition());
  }

  function updateLocation(index) {
    X.removeClass('#dungeonVision .walls.current','current');
    X.addClass(`#dungeonVision .walls[data-index='${index}']`,'current');
  }

  // An open door no longer blocks the light, so it's recast straight away.
  function openDoor(door) {
    X.addClass(`#dungeonVision .door.${door.direction}[data-x='${door.position.x}'][data-y='${door.position.y}']`,'open');
    refresh();
  }

  function point(vertex) {
    return `${vertex.x.toFixed(1)} ${vertex.y.toFixed(1)}`;
  }

  function pathFor(polygon) {
    if (polygon.length === 0) { return ''; }
    return `M${polygon.map(point).join(' L')} Z`;
  }

  function rectPath(rect) {
    return `M${rect.xMin} ${rect.yMin} H${rect.xMax} V${rect.yMax} H${rect.xMin} Z`;
  }

  return {
    build,
    render,
    refresh,
    updateLocation,
    openDoor,
  };

})();
