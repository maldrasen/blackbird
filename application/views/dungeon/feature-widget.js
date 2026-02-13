// noinspection CssInvalidPropertyValue

global.FeatureWidget = (function() {

  function build(feature) {
    const featureContainer = X.createElement(`<div class="feature-widget">`);

    function buildElement() {
      feature.getRooms().forEach(room => {
        const roomContainer = buildRoomContainer(room);
        roomContainer.appendChild(buildBoxElement(room.getMainBox()));
        if (room.getSubBox()) { roomContainer.appendChild(buildBoxElement(room.getSubBox())); }
        featureContainer.appendChild(roomContainer);
      });

      return featureContainer;
    }

    function buildRoomContainer(room) {
      const bounds = room.getBounds();
      const position = room.getPosition();
      const bottom = position[0] * _tileSize;
      const left = position[1] * _tileSize;
      const height = bounds.yMax * _tileSize;
      const width = bounds.xMax * _tileSize;

      return X.createElement(`<div class="room-container hidden-room" 
        style="bottom:${bottom}px; left:${left}px; width:${width}px; height:${height}px;">`);
    }

    function buildBoxElement(props) {
      const bottom = props.y * _tileSize;
      const left = props.x * _tileSize;
      const width = props.width * _tileSize;
      const height = props.height * _tileSize;

      return X.createElement(`<div class="room-box" 
        style="bottom:${bottom}px; left:${left}px; width:${width}px; height:${height}px">`);
    }

    return Object.freeze({
      buildElement,
    });
  }

  return Object.freeze({
    build,
  });

})();