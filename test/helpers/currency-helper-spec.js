describe('CurrencyHelper', function() {

  describe('valueToCurrency()', function() {
    it('rounding down exact change', function() {
      const coins = CurrencyHelper.valueToCurrency(3600);
      expect(Object.keys(coins).length).to.equal(1);
      expect(coins.stag).to.equal(1);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(3600);
    });

    it('rounding down', function() {
      const coins = CurrencyHelper.valueToCurrency(1000);
      expect(coins.chalice).to.equal(1);
      expect(coins.crow).to.equal(1);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(960);
    });

    it('rounding down higher values', function() {
      const coins = CurrencyHelper.valueToCurrency(1000000);
      expect(coins.dragon).to.equal(4);
      expect(coins.crown).to.equal(2);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(972000);
    });

    it(`won't use low value coins as rounding coins`, function() {
      const coins = CurrencyHelper.valueToCurrency(901);
      expect(Object.keys(coins).length).to.equal(1);
      expect(coins.chalice).to.equal(1);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(900);
    });

    it(`doesn't do that when rounding up either (the rare case where a merchant could lose money)`, function() {
      const coins = CurrencyHelper.valueToCurrency(901,'up');
      expect(Object.keys(coins).length).to.equal(1);
      expect(coins.chalice).to.equal(1);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(900);
    });

    it('rounding up exact change', function() {
      const coins = CurrencyHelper.valueToCurrency(9,'up');
      expect(coins.nit).to.equal(4);
      expect(coins.thistle).to.equal(1);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(9);
    });

    it(`rounded up other value`, function() {
      const coins = CurrencyHelper.valueToCurrency(1000,'up');
      expect(coins.chalice).to.equal(1);
      expect(coins.crow).to.equal(2);
      expect(CurrencyHelper.currencyToValue(coins)).to.equal(1020);
    });
  });

});
