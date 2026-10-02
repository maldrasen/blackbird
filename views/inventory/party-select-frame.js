global.PartySelectFrame = function() {
  let frameElement;

  function build() {
    frameElement = X.createElement(`<div class='party-select-frame'></div>`);
    update();
    return frameElement;
  }

  function update() {
    X.empty(frameElement);
  }

  return {
    build,
    update,
  }

}
