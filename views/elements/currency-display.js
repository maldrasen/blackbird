global.CurrencyDisplay = (function() {

  // Builds a div showing a value as coins. The first span is the high coin, followed by a span for the change coin
  // when the value doesn't convert evenly.
  function build(value, rounding='down') {
    if (value === 0) { return X.createElement(`<div class='currency-display'><div class='worthless'>Worthless</div></div>`); }

    const element = X.createElement(`<div class='currency-display'></div>`);
    const currency = CurrencyHelper.valueToCurrency(value, rounding);

    Object.keys(currency).forEach(code => {
      element.appendChild(buildCoin(code, currency[code]));
    });

    return element;
  }

  function buildCoin(code, count) {
    const name = (count > 1) ? EnglishHelper.pluralize(CurrencyHelper.getName(code)) : CurrencyHelper.getName(code);

    const coin = X.createElement(`<div class='coin ${code}'>
      <span class='coin-icon'></span>
      <span class='coin-count'>${count}</span>
      <span class='coin-name'>${name}</span>
    </div>`);

    coin.querySelector('.coin-icon').style['background-image'] = X.assetURL(`icons/coin-${code}.png`);
    return coin;
  }

  return {
    build,
  };

})();
