// Marks the tile the party is standing on. The marker slides from tile to tile over the length of a step, so a walk
// keeps a steady pace.
global.DungeonPartyMarker = (function() {

  // The position is set before the marker joins the page so that it appears in place, rather than sliding in from
  // the corner of the floor.
  function build(position) {
    const element = X.createElement(`<div id='dungeonPartyMarker'><div class='ring'></div></div>`);
    element.style['width'] = `${DungeonFloorView.getGridSize()}px`;
    element.style['height'] = `${DungeonFloorView.getGridSize()}px`;
    element.style['transition-duration'] = `${DungeonView.getStepTime()}ms`;
    place(element, position);
    return element;
  }

  function moveTo(position) {
    place(X.first('#dungeonPartyMarker'), position);
  }

  // Jump to the end of a move that's still sliding. The marker's style already holds the tile it's heading for, so
  // switching the transition off lands it there, and reading the layout makes that stick before the transition is
  // switched back on. Without this a new move would start from wherever the slide had got to and lag behind the party.
  function finishMove() {
    const element = X.first('#dungeonPartyMarker');
    element.style['transition-property'] = 'none';
    element.offsetWidth;
    element.style['transition-property'] = '';
  }

  function place(element, position) {
    element.style['left'] = `${position.x * DungeonFloorView.getGridSize()}px`;
    element.style['top'] = `${position.y * DungeonFloorView.getGridSize()}px`;
  }

  return {
    build,
    moveTo,
    finishMove,
  };

})();
