global.CurrencyHelper = (function() {

  // Currency Denominations
  //    Tin Nit        : (value 1)
  //    Copper Thistle : is 5 Nits (value 5)
  //    Copper Mark    : is 3 Thistles (value 15)
  //    Copper Crow    : is 4 Marks (value 60)
  //    Silver Tulip   : is 5 Crows (value 300)
  //    Silver Chalice : is 3 Tulips (value 900)
  //    Silver Stag    : is 4 Chalices (value 3,600)
  //    Golden Rose    : is 5 Stags (value 18,000)
  //    Golden Crown   : is 3 Roses (value 54,000)
  //    Golden Dragon  : is 4 Crowns (value 216,000)

  const denominations = [
    { code:'nit',     value:1 },
    { code:'thistle', value:5 },
    { code:'mark',    value:15 },
    { code:'crow',    value:60 },
    { code:'tulip',   value:300 },
    { code:'chalice', value:900 },
    { code:'stag',    value:3600 },
    { code:'rose',    value:18000 },
    { code:'crown',   value:54000 },
    { code:'dragon',  value:216000 },
  ]

  // Transactions in the game are vaguely medieval flavored. Each transaction should really only involve a few coins.
  // The currency system is purposefully confusing and no one really wants to mess around with a bunch of different
  // coins, so when a transaction is made, only a high value coin and a low 'change' coin is used. (And the change
  // coin can't be of a much lower denomination) This will usually introduce rounding errors which always tend to go
  // in the merchants favor.
  //
  // When selling items we get the actual value of the items, then round the change coin down so that the total value
  // of the coins are less or equal than the total value. When buying items we round the change coin up instead, so
  // that the value of the coins will be higher than the total value of what's being bought.
  //
  // It's also never really clear how much any coin is worth, as the value of the coins is only represented internally.
  // In the game world, a silver tulip is worth five copper crows, which makes doing the math difficult unless you're
  // very familiar with the system.

  function valueToCurrency(value, rounding='down') {
    const currency = {};
    const highCoin = findHighCoin(value);
    const highCount = Math.floor(value / highCoin.value);

    currency[highCoin.code] = highCount;

    const remaining = value - (highCoin.value * highCount);
    if (remaining > 0) {
      const changeCoin = findChangeCoin(remaining, highCoin);
      if (changeCoin) {
        currency[changeCoin.code] = (rounding === 'down') ?
          Math.floor(remaining / changeCoin.value) :
          Math.ceil(remaining / changeCoin.value);
      }
    }

    return currency;
  }

  function currencyToValue(currency) {
    return Object.keys(currency).reduce((value, code) => {
      return value + valueOf(code) * currency[code];
    }, 0);
  }

  function valueOf(code) {
    return denominations.find(coin => coin.code === code).value;
  }

  function findHighCoin(value) {
    return denominations.findLast(coin => coin.value <= value) || denominations[0];
  }

  function findChangeCoin(remainingValue, highCoin) {
    const index = denominations.indexOf(highCoin);
    const firstOption = denominations[index-1];
    const secondOption = denominations[index-2];

    if (firstOption && firstOption.value <= remainingValue) { return firstOption; }
    if (secondOption && secondOption.value <= remainingValue) { return secondOption; }
  }

  return Object.freeze({
    valueToCurrency,
    currencyToValue,
    findHighCoin,
    findChangeCoin,
    valueOf,
  });

})();
