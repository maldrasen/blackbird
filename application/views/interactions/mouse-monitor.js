global.MouseMonitor = (function() {

  const position = { x:0, y:0 };

  function init() {
    window.addEventListener('mousemove',event => {
      position.x = event.clientX;
      position.y = event.clientY;
    });
  }

  function getPosition() {
    return position;
  }

  return {
    init,
    getPosition,
  }

})();
