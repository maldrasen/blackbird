// The party's light, drawn as darkness laid over the fully lit floor. A shadow covers everything the light can't
// reach from the marker, and a radial falloff fades the floor out toward the edge of the light. The outlines of the
// walls, doors, and glyphs are drawn back over the shadow as trim, clipped to the light, so that the shadow's edge
// never cuts through a stroke. Everything is redrawn on every frame the marker moves, from the visibility polygon
// cast against the floor's occluders.
global.DungeonVisionView = (function() {

  const lightRadius = 4.5;
  const falloffStart = 0.55;
  const overshoot = 3;

  let svg = null;
  let shadow = null;
  let clip = null;
  let falloff = null;
  let floorRect = '';

  function build(floor) {
    const gridSize = DungeonFloorView.getGridSize();
    const width = floor.getFloorWidth() * gridSize;
    const height = floor.getFloorHeight() * gridSize;
    const radius = lightRadius * gridSize;

    DungeonVisionOccluders.build(floor);
    floorRect = `M0 0 H${width} V${height} H0 Z`;

    svg = X.createElement([
      `<svg id='dungeonVision' viewBox='0 0 ${width} ${height}'>`,
      `<defs>`,
      `<radialGradient id='visionFalloff' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='${radius}'>`,
      `<stop offset='0' stop-opacity='0'/>`,
      `<stop offset='${falloffStart}' stop-opacity='0'/>`,
      `<stop offset='1' stop-opacity='1'/>`,
      `</radialGradient>`,
      `<clipPath id='visionClip'><path/></clipPath>`,
      `</defs>`,
      `<path class='shadow' fill-rule='evenodd'/>`,
      `<g class='trim outlines' clip-path='url(#visionClip)'>${outlines(floor)}</g>`,
      `<rect class='falloff' width='${width}' height='${height}' fill='url(#visionFalloff)'/>`,
      `</svg>`,
    ].join(''));
    svg.style['width'] = `${width}px`;
    svg.style['height'] = `${height}px`;

    shadow = svg.querySelector('.shadow');
    clip = svg.querySelector('#visionClip path');
    falloff = svg.querySelector('#visionFalloff');

    return svg;
  }

  // The outlines are the occluders themselves, one path per room so that the current room can be picked out, with
  // each door's slab and each room's glyphs drawn just as the floor draws them. They go in as plain elements rather
  // than being shared through a <use>, because the stylesheet's descendant selectors don't reach into a use
  // element's shadow tree and the trim lost its styling that way.
  function outlines(floor) {
    return [
      ...DungeonVisionOccluders.getRooms().map(room => wallsMarkup(room, floor)),
      ...floor.getDoors().map(door => doorMarkup(door)),
      ...floor.getRooms().map(room => glyphsMarkup(room)),
    ].join('');
  }

  function wallsMarkup(room, floor) {
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

  function glyphsMarkup(room) {
    const glyphs = DungeonRoomView.roomGlyphs(room);
    if (glyphs.length === 0) { return ''; }

    const gridSize = DungeonFloorView.getGridSize();
    const position = room.getFloorPosition();
    return `<g transform='translate(${position.x * gridSize} ${position.y * gridSize})'>${glyphs.join('')}</g>`;
  }

  // Cast the light from a position in tile units, usually the marker's drawn position part way through a step. The
  // shadow is the whole floor with the visibility polygon cut out of it, and the same polygon clips the trim.
  function render(position) {
    if (svg == null) { return; }

    const gridSize = DungeonFloorView.getGridSize();
    const radius = lightRadius * gridSize;
    const origin = { x: (position.x + 0.5) * gridSize, y: (position.y + 0.5) * gridSize };
    const box = { xMin:origin.x - radius, xMax:origin.x + radius, yMin:origin.y - radius, yMax:origin.y + radius };
    const polygon = VisibilityHelper.computePolygon(origin, DungeonVisionOccluders.nearby(box), box, overshoot);
    const outline = pathFor(polygon);

    shadow.setAttribute('d', `${floorRect} ${outline}`);
    clip.setAttribute('d', outline);
    falloff.setAttribute('cx', origin.x);
    falloff.setAttribute('cy', origin.y);
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

  return {
    build,
    render,
    refresh,
    updateLocation,
    openDoor,
  };

})();
