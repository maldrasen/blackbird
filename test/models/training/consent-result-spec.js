describe.only("ConsentResult", function() {

  describe("Base Classes", function() {
    it("calculates emotional actions", function() {
      const wolf = Registry.createEntity();
      const rabbit = Registry.createEntity();

      FeelingsComponent.create(rabbit, { target:wolf, affection:20, fear:100, respect:50 });

      console.log("Calculation:")

      const result = ConsentResult.build(rabbit, wolf);
      result.setSexAction('kiss');

      console.log("Result:",result)
    });

    it("calculates touching actions");
    it("calculates service actions");
    it("calculates roughService actions");
  });

  describe("feelingBaseValue()", function() {
    it('calculates apathy range properly', function() {
      expect(ConsentResult.feelingBaseValue(0)).to.equal(0);
      expect(ConsentResult.feelingBaseValue(50)).to.equal(5);
      expect(ConsentResult.feelingBaseValue(100)).to.equal(10);
    });

    it('calculates mild range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(120))).to.equal(12);
      expect(Math.round(ConsentResult.feelingBaseValue(150))).to.equal(17);
      expect(Math.round(ConsentResult.feelingBaseValue(175))).to.equal(23);
      expect(Math.round(ConsentResult.feelingBaseValue(200))).to.equal(30);
    });

    it('calculates moderate range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(250))).to.equal(33);
      expect(Math.round(ConsentResult.feelingBaseValue(300))).to.equal(40);
      expect(Math.round(ConsentResult.feelingBaseValue(350))).to.equal(53);
      expect(Math.round(ConsentResult.feelingBaseValue(400))).to.equal(70);
    });

    it('calculates high range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(450))).to.equal(73);
      expect(Math.round(ConsentResult.feelingBaseValue(500))).to.equal(86);
      expect(Math.round(ConsentResult.feelingBaseValue(550))).to.equal(111);
      expect(Math.round(ConsentResult.feelingBaseValue(600))).to.equal(150);
    });

    it('calculates very high range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(650))).to.equal(153);
      expect(Math.round(ConsentResult.feelingBaseValue(700))).to.equal(166);
      expect(Math.round(ConsentResult.feelingBaseValue(750))).to.equal(197);
      expect(Math.round(ConsentResult.feelingBaseValue(800))).to.equal(250);
    });

    it('calculates extreme range properly', function() {
      expect(Math.round(ConsentResult.feelingBaseValue(850))).to.equal(254);
      expect(Math.round(ConsentResult.feelingBaseValue(900))).to.equal(281);
      expect(Math.round(ConsentResult.feelingBaseValue(950))).to.equal(355);
      expect(Math.round(ConsentResult.feelingBaseValue(1000))).to.equal(500);
    });
  });

});
