global.LocationInterface = (function() {

  function update() {
    if (HEADLESS || Tests.running()) { return; }
    LocationView.update();
  }

  return Object.freeze({
    update,
  });

})();
