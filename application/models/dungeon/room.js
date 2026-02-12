global.Room = (function() {

  // The room model will also manage the contents of the room.
  function build() {
    let $mainBox;
    let $subBox;
    let $footprint;

    // Main box is always placed at (0,0);
    function setMainBox(height, width) {
      $mainBox = { x:0, y:0, height, width };
    }

    // When the sub box is set we can then adjust the bounds and footprint.
    function setSubBox(x,y,height,width) {
      $subBox = { x, y, height, width };
    }

    return Object.freeze({
      getSubBox: () => { return { ...$subBox }; },
      getMainBox: () => { return { ...$mainBox }; },
      setMainBox,
      setSubBox,
    });
  }

  return Object.freeze({
    build
  });

})();
