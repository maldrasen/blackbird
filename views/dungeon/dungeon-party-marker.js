// Marks the tile the party is standing on. The marker slides from tile to tile over the length of a step, so a walk
// keeps a steady pace. The slide runs on the marker's own animation frames rather than a CSS transition so that the
// position it's drawn at is known on every frame: the party's light has to be cast from wherever the marker is, not
// from the tile it's heading for.
global.DungeonPartyMarker = (function() {

  let drawnPosition = null;
  let move = null;
  let frameId = null;

  // The position is set before the marker joins the page so that it appears in place, rather than sliding in from
  // the corner of the floor.
  function build(position) {
    stop();
    drawnPosition = { ...position };

    const element = X.createElement(`<div id='dungeonPartyMarker'><div class='ring'></div></div>`);
    element.style['width'] = `${DungeonFloorView.getGridSize()}px`;
    element.style['height'] = `${DungeonFloorView.getGridSize()}px`;
    place(element, drawnPosition);
    return element;
  }

  // Slide from wherever the marker is drawn right now to the new tile.
  function moveTo(position, stepTime) {
    move = { from:getDrawnPosition(), to:{ ...position }, startedAt:performance.now(), duration:stepTime };
    start();
  }

  // Jump to the end of a move that's still sliding. Without this a new move would start from wherever the slide
  // had got to and lag behind the party.
  function finishMove() {
    stop();

    const element = X.first('#dungeonPartyMarker');
    if (element) { place(element, drawnPosition); }
  }

  // Where the marker is drawn, in tile units, part way between tiles while a move is in progress.
  function getDrawnPosition(timestamp = performance.now()) {
    if (move == null) { return { ...drawnPosition }; }

    const progress = Math.max(0, Math.min((timestamp - move.startedAt) / move.duration, 1));
    return {
      x: move.from.x + ((move.to.x - move.from.x) * progress),
      y: move.from.y + ((move.to.y - move.from.y) * progress),
    };
  }

  function isMoving() {
    return move != null;
  }

  // End the move where it was heading and stop animating, whether or not the marker is still on the page.
  function stop() {
    if (move != null) { drawnPosition = { ...move.to }; }
    move = null;

    if (frameId != null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  }

  function start() {
    if (frameId == null) { frameId = requestAnimationFrame(step); }
  }

  function step(timestamp) {
    frameId = null;

    const element = X.first('#dungeonPartyMarker');
    if (element == null || move == null) { return stop(); }

    drawnPosition = getDrawnPosition(timestamp);
    place(element, drawnPosition);
    DungeonVisionView.render(drawnPosition);

    if (timestamp - move.startedAt >= move.duration) { return stop(); }
    frameId = requestAnimationFrame(step);
  }

  function place(element, position) {
    element.style['left'] = `${position.x * DungeonFloorView.getGridSize()}px`;
    element.style['top'] = `${position.y * DungeonFloorView.getGridSize()}px`;
  }

  return {
    build,
    moveTo,
    finishMove,
    getDrawnPosition,
    isMoving,
    stop,
  };

})();
