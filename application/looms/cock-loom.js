global.CockLoom = (function() {

  // {A:cock.thickSixInchLongCock}` A long phrase that explicitly includes the length.
  // {A:cock.sixInch}` A short phrase with just the length.
  // {A:cock.bigCock}` A phrase like "huge cock" or "big dick"
  // {A:cock.big}` Just an adjective that can be used to describe the cock.
  // {A:cock.thick}` An adjective that doesn't rely on size.
  function weave(id, token) {
    return `<span class='weaver-warning'>Cock:[${token}]</span>`
  }

  return Object.freeze({ weave });

})();
