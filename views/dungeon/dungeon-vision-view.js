// The party's light, drawn as darkness laid over the fully lit floor. A shadow covers everything the light can't
// reach from the marker, and a radial falloff fades the floor out toward the edge of the light. Both are redrawn on
// every frame the marker moves, from the visibility polygon cast against the floor's occluders.
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

  // Cast the light from a position in tile units, usually the marker's drawn position part way through a step. The
  // shadow is the whole floor with the visibility polygon cut out of it, and the same polygon clips whatever is
  // drawn in the light.
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

  function pathFor(polygon) {
    if (polygon.length === 0) { return ''; }
    return `M${polygon.map(vertex => `${vertex.x.toFixed(1)} ${vertex.y.toFixed(1)}`).join(' L')} Z`;
  }

  return {
    build,
    render,
    refresh,
  };

})();
