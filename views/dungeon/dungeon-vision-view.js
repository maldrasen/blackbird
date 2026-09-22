// The party's light, drawn as darkness laid over the fully lit floor. A shadow covers everything the light can't
// reach from the marker, and a radial falloff fades the floor out toward the edge of the light. The outlines of the
// walls and doors are drawn back over the shadow as trim, clipped to the light, so that the shadow's edge never
// cuts through a stroke, and every glyph whose body is in the light is drawn whole in front of its own shadow.
// Everything is redrawn on every frame the marker moves, from the visibility polygon cast against the floor's
// occluders.
global.DungeonVisionView = (function() {

  const lightRadius = 4.5;
  const falloffStart = 0.55;
  const overshoot = 3;
  const glyphMargin = 2;

  let svg = null;
  let shadow = null;
  let clip = null;
  let falloff = null;
  let floorRect = '';
  let glyphs = [];

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
      `<g class='trim glyphs'>${buildGlyphs(floor)}</g>`,
      `<rect class='falloff' width='${width}' height='${height}' fill='url(#visionFalloff)'/>`,
      `</svg>`,
    ].join(''));
    svg.style['width'] = `${width}px`;
    svg.style['height'] = `${height}px`;

    shadow = svg.querySelector('.shadow');
    clip = svg.querySelector('#visionClip path');
    falloff = svg.querySelector('#visionFalloff');
    pairGlyphElements(svg.querySelectorAll('.glyphs .glyph'));

    return svg;
  }

  // The outlines are the occluders themselves, one path per room so that the current room can be picked out, with
  // each door's slab drawn just as the floor draws it. They go in as plain elements rather than being shared
  // through a <use>, because the stylesheet's descendant selectors don't reach into a use element's shadow tree and
  // the trim lost its styling that way.
  function outlines(floor) {
    return [
      ...DungeonVisionOccluders.getRooms().map(room => wallsMarkup(room, floor)),
      ...floor.getDoors().map(door => doorMarkup(door)),
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

  // Every glyph on the floor, drawn just as its room draws it but switched on and off per frame rather than
  // clipped. Each is remembered with its body (the center and radius of its occluder, zero for a glyph that casts
  // no shadow) in the order the markup lists them, which is the rooms in order and each room's glyphs in order.
  function buildGlyphs(floor) {
    const gridSize = DungeonFloorView.getGridSize();
    glyphs = [];

    return floor.getRooms().map(room => {
      const markup = DungeonRoomView.roomGlyphs(room);
      if (markup.length === 0) { return ''; }

      const position = room.getFloorPosition();
      room.getGlyphs().forEach(glyph => glyphs.push({
        center: { x: (position.x + glyph.x) * gridSize, y: (position.y + glyph.y) * gridSize },
        radius: DungeonVisionOccluders.glyphRadius(glyph),
        visible: false,
        element: null,
      }));

      return `<g transform='translate(${position.x * gridSize} ${position.y * gridSize})'>${markup.join('')}</g>`;
    }).join('');
  }

  function pairGlyphElements(elements) {
    if (elements.length !== glyphs.length) {
      throw new Error(`The vision has ${glyphs.length} glyph bodies but ${elements.length} glyph elements.`);
    }
    elements.forEach((element, i) => { glyphs[i].element = element; });
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
