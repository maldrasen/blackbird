global.FeatureWidget = (function() {

  const _tileSize = 30;

  function build(feature) {
    const featureContainer = X.createElement(`<div class="feature-widget">`);

    function buildElement() {
      feature.getRooms().forEach(room => {
        const mainProps = room.getMainBox();
        const mainBox = X.createElement(`<div class="room-box">`);

        let bottom = mainProps.y * _tileSize;
        let left = mainProps.x * _tileSize;
        let width = mainProps.width * _tileSize;
        let height = mainProps.height * _tileSize;

        mainBox.setAttribute('style',`bottom:${bottom}px; left:${left}px; width:${width}px; height:${height}px`)

        let bounds = room.calculateBounds();
        let position = room.getPosition();
        bottom = position[0] * _tileSize;
        left = position[1] * _tileSize;
        height = bounds.yMax * _tileSize;
        width = bounds.xMax * _tileSize;

        const roomContainer = X.createElement('<div class="room-container hidden-room">');
        roomContainer.setAttribute('style',`bottom:${bottom}px; left:${left}px; width:${width}px; height:${height}px;`);
        roomContainer.appendChild(mainBox);

        featureContainer.appendChild(roomContainer);
      });

      return featureContainer;
    }

    return Object.freeze({
      buildElement,
    });
  }

  return Object.freeze({
    build,
  });

})();