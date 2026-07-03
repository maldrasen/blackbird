global.CockLoom = (function() {

  // {A:cock.thickSixInchLongCock}` A long phrase that explicitly includes the length.
  // {A:cock.sixInch}` A short phrase with just the length.
  // {A:cock.bigCock}` A phrase like "huge cock" or "big dick"
  // {A:cock.big}` Just an adjective that can be used to describe the cock.
  // {A:cock.thick}` An adjective that doesn't rely on size.
  // {A:cock.thickCock}` An adjective that doesn't rely on size with cock word.
  function weave(id, token) {
    return Weaver.formatWarning(`[Cock:${token}]`);
  }

  return Object.freeze({ weave });

})();
