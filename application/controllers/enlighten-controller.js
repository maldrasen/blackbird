global.EnlightenController = (function() {

  let $anima, $animus, $anger;

  function startEnlightenment(data) {
    $anima = data.anima;
    $animus = data.animus;
    $anger = data.anger;
    EnlightenView.show();
  }

  return Object.freeze({
    startEnlightenment
  });

})();