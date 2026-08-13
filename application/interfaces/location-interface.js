global.LocationInterface = (function() {

  function update() {
    if (Environment.viewPresent() === false) { return; }
    LocationView.update();
  }

  return Object.freeze({
    update,
  });

})();
