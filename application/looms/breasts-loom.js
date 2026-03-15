global.BreastsLoom = (function() {

  // {A:breasts.bigSoftBreasts} A phrase like "big firm tits" or "large soft breasts"
  // {A:breasts.bigBreasts} A phrase like "big tits" or "large breasts"
  // {A:breasts.softBreasts} A phrase like "soft tits" or "firm breasts"
  // {A:breasts.bigRoundBreasts} A phrase describing breast size and shape.
  // {A:breasts.big} An adjective that can be used to describe the breast size.
  // {A:breasts.soft} An adjective that can be used to describe the breast firmness
  // {A:breasts.bigSoft} A longer adjective phrase without a word for breasts.
  // {A:breasts.bigRound} A longer adjective phrase describing the shape without a word for breasts.
  // {A:breasts} Any word for breasts.
  // {A:breasts:thickNipples} A phrase like 'long nipples' or 'dark teats'
  function weave(id, token) {
    return `<span class='weaver-warning'>Breasts:[${token}]</span>`
  }

  return Object.freeze({ weave });

})();
